module.exports = function makeGetConsumer({loginConsumer}){

    return async function getConsumer(httpRequest){
        const info = httpRequest.body;
        console.log(httpRequest.body);
        try {
            
            const posted = await loginConsumer(info)

            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 200,
                body: posted
            }

        } catch (e) {
                throw new Error(e.message);
        }
    }

}