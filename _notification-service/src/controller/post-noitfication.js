module.exports = function makePostNotification({createNotification}){
    return async function postNotification(httpRequest){
        const info = httpRequest.body;
       
        try {
            const posted = await createNotification(info);

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