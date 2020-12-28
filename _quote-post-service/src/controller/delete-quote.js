module.exports = function makeDeleteQuote({removeQuote}){
    return async function deleteQuote(httpRequest){
        const id = httpRequest.id;

        try{
            const deleted = await removeQuote(id);
            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 201,
                body: deleted
            }
        } catch(e){
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