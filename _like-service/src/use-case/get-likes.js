
module.exports = function makeGetLikes({Likes}){
    return async function getLikes({userId,activityId}){
        try {
            
            if(!userId){
                throw new Error('must provide the user id');
            }

            if(!activityId){
                throw new Error('must provide activity id');
            }

            const count_likes = await Likes.count({activityId});
            const my_like = await Likes.findOne({userId});

            return {count_likes, my_like};

        } catch (e) {
            throw new Error(e);
        }
    }
}