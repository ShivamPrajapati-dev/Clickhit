module.exports = function makePostSketch({addSketch}){
    return async function postSketch(httpRequest){
        const  info  = httpRequest.body
        
        try {
            const posted = await addSketch({...info});
            
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