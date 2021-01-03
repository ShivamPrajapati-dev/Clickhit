module.exports = function makePostToken({addToken}){
    return async function postToken(httpRequest){
        const info = httpRequest.body;
       
        try {
            const posted = await addToken(info);

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