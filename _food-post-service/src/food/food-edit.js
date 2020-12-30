module.exports = function buildMakeFoodEdit(){
    return function makeFoodEdit({
        username,
        food_name,
        category,
        ingredients,
        img_url,
        img_name,
        id,
        hashtags
    }){
        if(!username){
            throw new Error('Must provide username');
        }
        if(!id){
            throw new Error('Must provide food id');
        }
        

        return Object.freeze({
            getUsername: () => username,
            getFoodName: () => food_name,
            getFoodCategory: () => category,
            getIngredients: () => ingredients,
            getImageUrl: () => img_url,
            getImageName: () => img_name,
            getId: () => id,
            getHashtags: () => hashtags
        });
        
    }
}