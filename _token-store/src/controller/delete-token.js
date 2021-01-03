module.exports = function makeRemoveToken({deleteToken}){
    return async function removeToken(httpRequest){
        const info = httpRequest.body;
       
        try {
            const deleted = await deleteToken(info);

            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 200,
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