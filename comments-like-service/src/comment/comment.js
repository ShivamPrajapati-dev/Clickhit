module.exports = function buildMakeComment(){
    return function makeComment({
        imageUrl, //user image
        name,     // user name
        userId,
        text,
        activityId  //post id
    }){
        if(!name){
            throw new Error('comment must have author name');
        }
        if(!imageUrl){
            throw new Error('comment must have author image url');
        }
        if(!userId){
            throw new Error('comment must have author user-id');
        }
        if(!text || text.length<1){
            throw new Error('comment must have atleat one character');
        }
        if(!activityId){
            throw new Error('comment must have author name');
        }

        return Object.freeze({
            getAuthorName:()=> name,
            getImageUrl:()=> imageUrl,
            getUserId:()=> userId,
            getText:()=>text,
            getPostId:()=>activityId
        });
        
    }
} 