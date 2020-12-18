module.exports = function makePostJWT({createJWT}){

    return async function postJWT(httpRequest){
        const info = httpRequest.body;

        try {
            
            const token = await createJWT(info)

            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 201,
                body: token.getToken()
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