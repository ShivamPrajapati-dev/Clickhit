module.exports = function makePostJWT({createJWT}){

    return async function postJWT(httpRequest){
        const info = httpRequest.body;

        try {
            
            const obj = await createJWT(info)

            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 201,
                body: { token:obj.getToken(), id:obj.getId(), secret:obj.getSecret() }
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