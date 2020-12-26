module.exports = function makeDeleteComment({deleteComment}){
    return async function delete_Comment(httpRequest){
        const id = httpRequest.id;

        try{
            const deleted = await deleteComment({id});
            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 201,
                body: deleted
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