module.exports = function buildMakeFood(){
    return function makeFood({
        username,
        food_name,
        category,
        ingredients,
        img_url,
        img_name,
        hashtags
    }){
        if(!username){
            throw new Error('Must provide username');
        }
        if(!food_name){
            throw new Error('Must provide food name');
        }
        if(!category){
            throw new Error('Must provide category');
        }
        if(!ingredients){
            throw new Error('Must provide food ingredients');
        }
        if(!img_url){
            throw new Error('Must provide image url');
        }
        if(!img_name){
            throw new Error('Must provide image name');
        }

        return Object.freeze({
            getUsername: () => username,
            getFoodName: () => food_name,
            getFoodCategory: () => category,
            getIngredients: () => ingredients,
            getImageUrl: () => img_url,
            getImageName: () => img_name,
            getHashtags: () => hashtags
        });
        
    }
}