module.exports = function buildMakeFollow(){
    return function makeFollow({
        follower_img_url,
        follower_name,
        follower_id,
        followee_id,
        followee_img_url,
        followee_name
    }){
        if(!followee_id){
            throw new Error('Must provide followee id');
        }
        if(!follower_id){
            throw new Error('Must provide follower id');
        }

        return Object.freeze({
            getFollowerImgUrl: () => follower_img_url,
            getFolloweeImgUrl: () => followee_img_url,
            getFollowerName: () => follower_name,
            getFolloweeName: () => followee_name,
            getFolloweeId: () => followee_id,
            getFollowerId: () => follower_id
        });
    }
}