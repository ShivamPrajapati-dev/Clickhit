module.exports = function makeDeleteComment({Comment, subscribe}){

    return async function deleteComment(){
      
        const consumer = await subscribe("Comment_DELETE");
      
        console.log('Consumer running ...');
        
        await consumer.run({
            "eachMessage": async ({message})=>{
               
                const body = JSON.parse(message.value.toString());
               
                if(body.event == "delete"){

                    try {   

                        const delete_comment = await Comment.deleteOne({_id:body.id});
                        console.log(delete_comment);
                    
                    } catch (e) {
                        console.log(e.message);   
                    }
                 
                }
            }
        });
    }
}