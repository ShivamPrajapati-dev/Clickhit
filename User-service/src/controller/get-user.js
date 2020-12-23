module.exports = function makeGetUser({readUser}){
    return async function getUser(httpRequest){
        const info = httpRequest.body;
       
        try {
            const read = await readUser({
                ...info
            });

            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 200,
                body: read
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