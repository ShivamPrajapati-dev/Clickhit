module.exports = function makePatchTokenstore({updateTokenstore}){
    return async function patchTokenstore(httpRequest){
        const info = httpRequest.body;
       
        try {
            const updated = await updateTokenstore(info);

            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 200,
                body: updated
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