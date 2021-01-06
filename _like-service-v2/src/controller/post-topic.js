module.exports = function makePostTopic({createTopic}){
    return async function postTopic(httpRequest){
       
        try {
            const posted = await createTopic();

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