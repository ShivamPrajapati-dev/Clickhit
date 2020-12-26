module.exports = function makeGetUserfeed({readUserfeed}){
    return async function getUserfeed(httpRequest){
        const info = httpRequest.body.username;
       
        try {
            const read = await readUserfeed(info);

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