module.exports = function makeDeleteFood({deletePost}){
    return async function delete_food(httpRequest){
        const id = httpRequest.id;

        try{
            const deleted = await deletePost({id});
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