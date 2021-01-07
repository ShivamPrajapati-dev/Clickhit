module.exports = function makePermanentStorageUpdater({Like,subscribe}){
     return async function permanentStorageUpdater(){
      
        const consumer = await subscribe("Like_permanent");
      
        console.log('Consumer running ......');
      
        await consumer.run({
            
            "eachMessage":async ({message})=>{

                const body = JSON.parse(message.value.toString());
               
                if(body.event=="create"){
                  
                    const like = new Like({
                        userId:body.userId,
                        activityId:body.activityId,
                        type:body.type
                    });
    
                     const saved = await like.save();
                     console.log(saved);
                
                }
               
            }
        })
    }
}