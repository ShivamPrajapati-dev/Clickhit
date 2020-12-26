const {makeFollow} = require('../follow');

module.exports = function makeAddFollowee({Follow}){

    return async function addFollowee(info){
        
        const follow = makeFollow(info);
        
        const new_followee = new Follow({
            follower_img_url:follow.getFollowerImgUrl(),
            follower_name: follow.getFollowerName(),
            follower_id: follow.getFollowerId(),
            followee_id:follow.getFolloweeId(),
            followee_img_url: follow.getFolloweeImgUrl(),
            followee_name: follow.getFolloweeName()
        });
        
        return await new_followee.save();
    }
}