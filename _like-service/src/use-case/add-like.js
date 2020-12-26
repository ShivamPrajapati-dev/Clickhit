const makeLike = require('../like');

module.exports = function makeAddLike({Like}){
    return async function addLike(likeInfo){
        
        const like = makeLike(likeInfo);

        let new_like = new Like({
            userId:like.getUserId(),
            activityId:like.getActivityId(),
            type: like.getType(),
            status: like.getStatus()
        });

        return await new_like.save();

    }
}