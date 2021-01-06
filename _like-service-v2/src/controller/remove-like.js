
module.exports = function makeRemoveLike({deleteLike}){
   
    return async function removeLike(httpRequest){
        const id = httpRequest.body.id;
        const userId = httpRequest.body.userId;
        const activityId = httpRequest.body.activityId;

        try {
            
            const deleted = await deleteLike({
                id,
                userId,
                activityId
            });

            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 201,
                body: deleted
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