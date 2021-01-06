
module.exports = function makeGetLikes({axios, url, cache}){
    return async function getLikes({userId,activityId}){
       
            
            if(!userId){
                throw new Error('must provide the user id');
            }

            if(!activityId){
                throw new Error('must provide activity id');
            }

            // connect with count service

            return {count_likes, my_like};

       
    }
}