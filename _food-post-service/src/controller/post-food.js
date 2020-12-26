module.exports = function makePostFood({addFood}){
    return async function postFood(httpRequest){
        const  info  = httpRequest.body
        
        try {
            const posted = await addFood({...info});
            
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