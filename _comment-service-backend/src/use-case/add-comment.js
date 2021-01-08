module.exports = function makeAddComment({Comment, subscribe}){

    return async function addComment(){
      
        const consumer = await subscribe("Comment_ADD");
      
        console.log('Consumer running ...');
        
        await consumer.run({
            "eachMessage": async ({message})=>{
             
                const body = JSON.parse(message.value.toString());

                if(body.event == "create"){

                    try {
                        let new_comment = new Comment({
                            userId:body.userId,
                            text:body.text,
                            activityId:body.activityId
                        });
        
                        const saved = await new_comment.save();
                        console.log(saved);
    
                    } catch (e) {
                        console.log(e.message);
                    }

                }
               
            }
        });
    }
}