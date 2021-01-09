module.exports = function buildMakeFollow(){
    return function makeFollow({
        follower_id,
        followee_id
    }){
        if(!followee_id){
            throw new Error('Must provide followee id');
        }
        if(!follower_id){
            throw new Error('Must provide follower id');
        }

        return Object.freeze({
            getFolloweeId: () => followee_id,
            getFollowerId: () => follower_id
        });
    }
}