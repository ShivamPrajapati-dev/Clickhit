module.exports = function makeCommentCounter({TempLike, CommentAggregate}){
    return async function commentCounter({activityId}){
        
        const tempLikes = await TempLike.find({activityId,type:"comment"}).count();
        const aggregate = await CommentAggregate.findOne({_id:activityId});
        
        const new_aggregate = aggregate.toObject();

        const total = new_aggregate.sum + tempLikes;

        return {
            acknowledged : true,
            likes : total
        }
    }
}