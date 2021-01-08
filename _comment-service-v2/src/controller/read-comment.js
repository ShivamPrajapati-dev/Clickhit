module.exports = function makeReadComment({getComment}){
    return async function readComment(httpRequest){
        
        const userId = httpRequest.body.userId;
        const activityId = httpRequest.body.activityId;

        
        try {
          
            const readed = await getComment({userId,activityId});
          
            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 200,
                body: readed
            }    
        
        } catch (e) {
            
            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 400,
                body:{
                    error:e.message
                }
            }
        }
    }
}