module.exports = function makeFoodPostUpdater({Food,subscribeFood,rsmq,cache,promisify,kafka}){
    return async function foodPostUpdater(){
     
       const consumer = await subscribeFood("FOOD_UPDATER");
       const producer = kafka.producer();

       console.log('Consumer running ......');
     
       await consumer.run({
           
           "eachMessage":async ({message})=>{
                 
                try {
                   
                    const body = JSON.parse(message.value.toString());
                
                    if(body.event == "create"){
                        
                        const post = new Food({
                            username:body.username,
                            food_name:body.food_name,
                            category:body.category,
                            ingredients:body.ingredients,
                            img_name:body.img_name,
                            img_url:body.img_url,
                            hashtags:body.hashtags,
                        });
    
                        const saved = await post.save();
    
                        const key = String(saved._id);
                        cache.set(key,JSON.stringify(saved));//save post to redis
            
                        await rsmq.sendMessageAsync({qname:process.env.QUEUE_NAME,message:JSON.stringify({       // send event to userfeed service
                            id:saved._id,
                            username:body.username       // username to find follower of this user
                        })});
                       
                        await producer.connect();
                       
                        const msg = {
                            activityId:key,
                            createdAt:body.createdAt,
                            event:"create",
                            metadata:"post"
                        }
                       
                        const result = await producer.send({
                            "topic":"Storm",
                            "messages":[{
                                "value":JSON.stringify(msg),
                                "partition":0        
                            }]
                        });
                    
                        await producer.disconnect();

                        console.log(saved,result);
                    
                    }else if(body.event == "delete"){
    
                        const post = await Food.deleteOne({_id:body.id});
                        
                        const delAsync = promisify(cache.del).bind(cache);
                        await delAsync(body.id);
                        
                        console.log(post.deletedCount);
    
                    }else if(body.event == "update"){
    
                        const existing = await Food.findOne({_id:food.getId(),username:food.getUsername()});
        
                        existing.food_name = body.food_name || existing.food_name;
                        existing.category = body.category|| existing.category;
                        existing.ingredients = body.ingredients || existing.ingredients;
                        existing.img_name = body.img_name || existing.img_name
                        existing.img_url = body.img_url || existing.img_url
                        existing.hastags = body.hashtags || existing.hastags
    
                        const key = String(existing._id);
    
                        cache.set(key, JSON.stringify(existing));        // update post in redis
    
                        await existing.save();
    
                        console.log(existing);
                    }

                } catch (e) {
                    console.log(e.message);
                }
               
              
           }
       })
   }
}