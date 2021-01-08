module.exports = function makeEditComment({Comment, subscribe}){

    return async function editComment(){
      
        const consumer = await subscribe("Comment_EDIT");
      
        console.log('Consumer running ...');
        
        await consumer.run({
            "eachMessage": async ({message})=>{
               
                const body = JSON.parse(message.value.toString());

                if(body.event == "update"){
                   
                    try {
                        const comment = await Comment.findById({_id:body.id});
                    
                        if(comment){ 
                            comment.text = body.text || comment.text;
                            const saved = await comment.save();
                            console.log(saved);
                        }
                    } catch (e) {
                        console.log(e.message);
                    }

                }
                
            }
        });
    }
}