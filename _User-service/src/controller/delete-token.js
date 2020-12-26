module.exports = function makeDeleteUserToken({deleteToken}){
    return async function deleteUserToken(httpRequest){
        const info = httpRequest.body;
       
        try {
            const edited = await deleteToken({
                ...info
            });

            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 202,
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