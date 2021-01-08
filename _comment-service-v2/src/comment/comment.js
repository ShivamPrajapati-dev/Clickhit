module.exports = function buildMakeComment(){
    return function makeComment({
        userId,
        text,
        activityId  //post id
    }){
       
        if(!userId){
            throw new Error('comment must have author user-id');
        }
        if(!text || text.length<1){
            throw new Error('comment must have atleat one character');
        }
        if(!activityId){
            throw new Error('comment must have post id');
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