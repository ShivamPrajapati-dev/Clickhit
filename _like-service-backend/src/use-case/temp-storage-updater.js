module.exports = function makeTemporaryStorageUpdater({TempLike,subscribe}){
    return async function temporaryStorageUpdater(){
     
       const consumer = await subscribe("Like_temporary");
     
       console.log('Consumer running ......');
     
       await consumer.run({
           
           "eachMessage":async ({message})=>{

               const body = JSON.parse(message.value.toString());
              
               if(body.event=="create"){
                 
                   const like = new TempLike({
                       userId:body.userId,
                       activityId:body.activityId,
                       type:body.type
                   });
   
                    const saved = await like.save();
                    console.log(saved);
               
               }else if(body.event == "delete"){

                  const like = await TempLike.deleteOne({_id:body.id,userId:body.userId});
                   console.log(like.deletedCount);
            
               }
              
           }
       })
   }
}