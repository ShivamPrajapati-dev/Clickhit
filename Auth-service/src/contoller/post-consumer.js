module.exports = function makePostConsumer({addConsumer}){

    return async function postConsumer(httpRequest){
        const info = httpRequest.body;
        console.log(httpRequest.body);
        try {
            
            const posted = await addConsumer(info)

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