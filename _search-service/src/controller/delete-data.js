module.exports = function makeDeleteData({removeData}){
    return async function deleteData(httpRequest){
        const  info  = httpRequest
        
        try {
            const deleted = await removeData(info);
            
            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 201,
                body: deleted
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