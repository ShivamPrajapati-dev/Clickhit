module.exports = function makePostData({addData}){
    return async function postData(httpRequest){
        const  info  = httpRequest
        
        try {
            const posted = await addData(info);
            
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