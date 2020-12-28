module.exports = function makeGetSketch({readSketch}){
    return async function getSketch(httpRequest){
        
        const username = httpRequest.body.username;
        
        try {
          
            const readed = await readSketch({username});
          
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