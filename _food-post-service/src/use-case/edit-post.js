const {makeFoodEdit} = require('../food');

module.exports = function makeEditPost({kafka}){
    return async function editPost(info){
        const food = makeFoodEdit(info);

        // const existing = await Food.findOne({_id:food.getId(),username:food.getUsername()});
     
        // existing.food_name = food.getFoodName() || existing.food_name;
        // existing.category = food.getFoodCategory() || existing.category;
        // existing.ingredients = food.getIngredients() || existing.ingredients;
        // existing.img_name = food.getImageName() || existing.img_name
        // existing.img_url = food.getImageUrl() || existing.img_url
        // existing.hastags = food.getHashtags() || existing.hastags

        // const key = String(existing._id);

        // cache.set(key, JSON.stringify(existing));        // update post in redis

        // await rsmq.sendMessageAsync({qname:process.env.ES_QUEUE_NAME, message:JSON.stringify({   // send event to search service
        //     index:"posts",
        //     event_type:"update",
        //     body:existing
        // })})

        // return await existing.save();

        const producer = kafka.producer();
        await producer.connect();

        const body = {
            id:food.getId(),
            username:food.getUsername(),
            food_name:food.getFoodName(),
            category:food.getFoodCategory(),
            ingredients:food.getIngredients(),
            img_name:food.getImageName(),
            img_url:food.getImageUrl(),
            hashtags:food.getHashtags(),
            event:"update",
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