const {makeFood} = require('../food')

module.exports = function makeAddFood({Food}){
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
       
        return await new_food.save();
    }
}