module.exports = function makeGetTokenstore({readTokenstore}){
    return async function getTokenstore(httpRequest){
        const info = httpRequest.body;
       
        try {
            const readed = await readTokenstore(info);

            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 200,
                body: readed
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