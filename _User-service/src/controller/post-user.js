module.exports = function makePostUser({addUser}){
    return async function postUser(httpRequest){
        const info = httpRequest.body;
       
        //TODO: attach JWT in header

        try {
            const posted = await addUser({
                ...info
            });

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