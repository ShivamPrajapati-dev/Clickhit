module.exports = function makePatchComment({editComment}){
    return async function patchComment(httpRequest){
        const id = httpRequest.id;
        const commentInfo = httpRequest.body;

        try{
            const edited = await editComment({id,commentInfo});
            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 201,
                body: edited
            }
        } catch(e){
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