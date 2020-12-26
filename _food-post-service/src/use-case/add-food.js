const {makeFood} = require('../food')

module.exports = function makeAddFood({Food,rsmq,cache}){
    return async function addFood(info){
       
        const food = makeFood(info);
       
        const new_food = new Food({
            username:food.getUsername(),
            food_name:food.getFoodName(),
            category:food.getFoodCategory(),
            ingredients:food.getIngredients(),
            img_name:food.getImageName(),
            img_url:food.getImageUrl()
        });
      
        const saved = await new_food.save();
        const key = String(saved._id);

        cache.set(key,JSON.stringify(saved));//save post to redis
        
        await rsmq.sendMessageAsync({qname:process.env.QUEUE_NAME,message:JSON.stringify({       // send event to userfeed service
            id:saved._id,
            username:food.getUsername()       // username to find follower of this user
        })});

        return saved;
         
    }
}