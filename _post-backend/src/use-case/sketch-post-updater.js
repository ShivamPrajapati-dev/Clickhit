module.exports = function makeSketchPostUpdater({Sketch,subscribeSketch,rsmq,cache,promisify}){
    return async function sketchPostUpdater(){
     
       const consumer = await subscribeSketch("SKETCH_UPDATER");
     
       console.log('Consumer running ......');
     
       await consumer.run({
           
           "eachMessage":async ({message})=>{
                 
                try {
                   
                    const body = JSON.parse(message.value.toString());
                
                    if(body.event == "create"){
                        
                        const post = new Sketch({
                            description:body.description,
                            time_taken:body.time_taken,
                            username:body.username,
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
    
                        console.log(saved);
                    
                    }else if(body.event == "delete"){
    
                        const post = await Sketch.deleteOne({_id:body.id});
                        
                        const delAsync = promisify(cache.del).bind(cache);
                        await delAsync(body.id);
                        
                        console.log(post.deletedCount);
    
                    }else if(body.event == "update"){
    
                        const existing = await Sketch.findOne({_id:food.getId(),username:food.getUsername()});
                        
                        existing.description = body.description || existing.description
                        existing.time_taken = body.time_taken || existing.time_taken
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