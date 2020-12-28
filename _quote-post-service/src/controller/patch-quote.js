module.exports = function makePatchQuote({editQuote}){
    return async function patchQuote(httpRequest){
        const  info = httpRequest.body
        const id = httpRequest.id;
        try {
            const edited = await editQuote(info, id);

            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 200,
                body: edited
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