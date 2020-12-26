module.exports = function makeDeleteConsumer({logoutConsumer}){

    return async function deleteConsumer(httpRequest){                             // delete means logout
        const info = httpRequest.body;                                             // to logout credential id is required from the client
        console.log(httpRequest.body);
        try {
            
            const posted = await logoutConsumer(info)

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