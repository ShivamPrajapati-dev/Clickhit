const {makeFollow} = require('../follow');

module.exports = function makeRemoveollowee({Follow}){

    return async function removeFollowee(info){
        
        const follow = makeFollow(info);
        
        const data = await Follow.deleteOne({follower_id:follow.getFollowerId(),followee_id:follow.getFolloweeId()});

        if(data.deletedCount==0){
                throw new Error('no followee found with given id');
         }
        return data;
    }
}