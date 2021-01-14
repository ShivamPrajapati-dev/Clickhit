module.exports = function makeLikeCounter({TempLike, LikeAggregate}){
    return async function likeCounter({activityId}){
        
        const tempLikes = await TempLike.find({activityId,type:"post"}).count();
        const aggregate = await LikeAggregate.findOne({_id:activityId});
       
        const new_aggregate = aggregate.toObject();
        const total = new_aggregate.sum + tempLikes;

        return {
            acknowledged : true,
            likes : total
        }
    }
}