const Follow = require('../model/follow');
const Post = require('../model/food/post');
const client = require('../redis-client/client');


module.exports = async (userId, postId)=>{
    
    const follow = await Follow.find({followeeId:userId});
    const post = await Post.findOne({_id:postId});
    
    follow.forEach((follower)=>{
        const key = '__userfeed__'+follower.followerId.toString();
        

        client.get(key,(err,data)=>{
            if(err) throw err

            if(data == null){
                let userFeed = [];

                userFeed.push({...post._doc});
                client.set(key, JSON.stringify(userFeed));
            }else {

                let userFeed  = JSON.parse(data);
                userFeed.push({...post._doc});

                client.set(key, JSON.stringify(userFeed));
            }
        });
    });

    
    

}