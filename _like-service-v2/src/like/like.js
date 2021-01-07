module.exports = function buildMakeLike(){
    return function makeLike({
        userId,
        activityId,  //postId or commentId
        active,      // alive or not
        type        // post like or comment like
    }){
        if(!userId){
            throw new Error('Like must have an user id');
        }
        if(!activityId){
            throw new Error('Like must have an activity id');
        }
      
        if(!type){
            throw new Error('Like must a type');
        }

        return Object.freeze({
            getUserId:() => userId ,
            getActivityId:() => activityId,
            getStatus:() => active,
            getType:() => type
        });

    }
}