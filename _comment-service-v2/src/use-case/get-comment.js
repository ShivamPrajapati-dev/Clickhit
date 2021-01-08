module.exports = function makeGetComment({Comment}){
    return async function getComment({userId,activityId}){

        try {
            
            if(!userId){
                throw new Error('must provide userId');
            }
            if(!activityId){
                throw new Error('must provide post id');
            }
        
            const comments = await Comment.find({userId,activityId}); // here we can directly contact the database
                                                                      // but first we have to shard our database based on postid
            if(!comments){
                throw new Error(' no comments found')
            }

            return comments;

        } catch (e) {
            throw new Error(e.message);
        }

    }
}