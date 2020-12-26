const {makeFoodEdit} = require('../food');

module.exports = function makeEditPost({Food}){
    return async function editPost(info){
        const food = makeFoodEdit(info);

        const existing = await Food.findById({_id:food.getId(),username:food.getUsername()});
     
        existing.food_name = food.getFoodName() || existing.food_name;
        existing.category = food.getFoodCategory() || existing.category;
        existing.ingredients = food.getIngredients() || existing.ingredients;
        existing.img_name = food.getImageName() || existing.img_name
        existing.img_url = food.getImageUrl() || existing.img_url

        return await existing.save();

    }
}