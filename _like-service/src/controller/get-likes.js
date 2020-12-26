
module.exports = function makeReadLikes({getLikes}){
    return async function readLikes(httpRequest){
        const userId = httpRequest.body.userId;
        const activityId = httpRequest.body.activityId;

        try {
            
            const readed = await getLikes({
                userId,
                activityId
            });


            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 201,
                body: edited
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