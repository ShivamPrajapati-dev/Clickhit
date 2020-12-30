module.exports = function makePostSAYT({makeSAYT}){
    return async function postSAYT(httpRequest){
        const  info  = httpRequest
        
        try {
            const posted = await makeSAYT(info);
    
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