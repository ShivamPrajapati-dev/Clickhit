module.exports = function makePostComment({addComment}){
    return async function postComment(httpRequest){
        const  commentInfo  = httpRequest.body
        
        try {
            const posted = await addComment({
                ...commentInfo
            });    
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