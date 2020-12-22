module.exports = function makePostConsumer({addConsumer}){

    return async function postConsumer(httpRequest){
        const info = httpRequest.body;

        try {
            
            const posted = await addConsumer(info)

            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 201,
                body: posted.data
            }

        } catch (e) {
                throw new Error(e.message);
        }
    }

}