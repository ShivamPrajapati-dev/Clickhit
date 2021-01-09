module.exports = function makePermanentStorageUpdater({Follow, subscribe}){
    return async function permanentStorageUpdater(){
        
        const consumer = await subscribe('FOLLOW_PERMANENT');

        console.log('Consumer running ... ');

        await consumer.run({
            "eachMessage":async ({message})=>{
                
                try {
                    
                    const body = JSON.parse(message.value.toString());

                    if(body.event == "create"){
                        
                        const new_followee = new Follow({

                            follower_id:body.follower_id,
                            followee_id:body.followee_id,

                        });
                        
                        const saved = await new_followee.save();
                        console.log(saved);

                    }else if(body.event == "delete"){

                        const data = await Follow.deleteOne({followee_id:body.followee_id,follower_id:body.follower_id});
                        console.log(data.deletedCount);
                    
                    }

                } catch (e) {
                    console.log(e.message);
                }
            }
        })
    }
}