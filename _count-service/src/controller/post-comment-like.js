module.exports = function makePostCommentLikeCount({commentCounter}){
    return async function postCommentLikeCount(httpRequest){
        const  activityId  = httpRequest.body.activityId
        
        try {
            const posted = await commentCounter({activityId});    
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