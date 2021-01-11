const {makeFood} = require('../food')

module.exports = function makeAddFood({kafka}){
    return async function addFood(info){
       
        const food = makeFood(info);
       
        // const new_food = new Food({
        //     username:food.getUsername(),
        //     food_name:food.getFoodName(),
        //     category:food.getFoodCategory(),
        //     ingredients:food.getIngredients(),
        //     img_name:food.getImageName(),
        //     img_url:food.getImageUrl(),
        //     hashtags:food.getHashtags()
        // });
      
        // const saved = await new_food.save();
        // const key = String(saved._id);

        // cache.set(key,JSON.stringify(saved));//save post to redis
        
        // await rsmq.sendMessageAsync({qname:process.env.QUEUE_NAME,message:JSON.stringify({       // send event to userfeed service
        //     id:saved._id,
        //     username:food.getUsername()       // username to find follower of this user
        // })});

        // await rsmq.sendMessageAsync({qname:process.env.ES_QUEUE_NAME, message:JSON.stringify({   // send event to search service
        //     index:"posts",
        //     event_type:"create",
        //     body:saved
        // })})

        // return saved;
        
        const producer = kafka.producer();
        await producer.connect();

        const body = {
            username:food.getUsername(),
            food_name:food.getFoodName(),
            category:food.getFoodCategory(),
            ingredients:food.getIngredients(),
            img_name:food.getImageName(),
            img_url:food.getImageUrl(),
            hashtags:food.getHashtags(),
            createdAt:Date.now(),
            event:"create",
            metadata:"post"
        }
        
        const result = await producer.send({
            "topic":"FoodPost",
            "messages":[{
                "value":JSON.stringify(body),
                "partition":0        
            }]
        });
    
        await producer.disconnect();
       
        return {
            acknowledged:true,
            result
        }
    }
}