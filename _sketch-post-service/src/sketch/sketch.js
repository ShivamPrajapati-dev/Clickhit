module.exports = function buildMakeSketch(){
    return function makeSketch({
        img_name,
        img_url,
        username,
        time_taken,
        description
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
            getTimeTaken: () => time_taken,
            getDescription: () => description
        });
    }
}