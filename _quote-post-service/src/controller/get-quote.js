module.exports = function makeGetQuote({readQuote}){
    return async function getQuote(httpRequest){
        
        const username = httpRequest.body.username;
        
        try {
          
            const readed = await readQuote(username);
          
            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 200,
                body: readed
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