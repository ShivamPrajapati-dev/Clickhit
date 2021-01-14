module.exports = function makePostLikeCount({likeCounter}){
    return async function postLikeCount(httpRequest){
        const  activityId  = httpRequest.body.activityId
        
        try {
            const posted = await likeCounter({activityId});    
            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 201,
                body: posted
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