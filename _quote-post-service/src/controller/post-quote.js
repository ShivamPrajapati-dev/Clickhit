module.exports = function makePostQuote({addQuote}){
    return async function postQuote(httpRequest){
        const  info  = httpRequest.body
        
        try {
            const posted = await addQuote(info);
            
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