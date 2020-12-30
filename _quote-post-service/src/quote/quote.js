module.exports = function buildMakeQuote(){
    return function makeQuote({
        img_url,
        username,
        img_name,
        hashtags
    }){
        if(!username){
            throw new Error('Must provide the username');
        }
        if(!img_url){
            throw new Error('Must provide the image url');
        }
        if(!img_name){
            throw new Error('Must provide image name');
        }
        return Object.freeze({
            getUsername: () => username,
            getImageName: () =>img_name,
            getImageUrl: () => img_url,
            getHashtags: () => hashtags
        });
    }
}