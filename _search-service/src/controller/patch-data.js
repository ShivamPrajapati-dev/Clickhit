module.exports = function makePatchData({updateData}){
    return async function patchData(httpRequest){
        const  info  = httpRequest
        
        try {
            const updated = await updateData(info);
            
            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 201,
                body: updated
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