module.exports = function makePatchFood({editPost}){
    return async function patchFood(httpRequest){
        const  info  = httpRequest.body
        
        try {
            const edited = await editPost({...info});

            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 200,
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