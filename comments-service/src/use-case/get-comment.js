module.exports = function makeGetComment({Comment}){
    return async function getComment({userId,activityId}){

        try {
            
            if(!userId){
                throw new Error('must provide userId');
            }
            if(!activityId){
                throw new Error('must provide post id');
            }
        
            const comments = await Comment.find({userId,activityId});

            if(!comments){
                throw new Error(' no comments found')
            }

            return comments;

        } catch (e) {
            throw new Error(e.message);
        }

    }
}