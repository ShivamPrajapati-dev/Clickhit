module.exports = function makeDeleteFollowee({removeFollowee}){
   
    return async function deleteFollowee(httpRequest){
        
        const info = httpRequest.body;

        try {
            const deleted = await removeFollowee(info);
        
            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 200,
                body: deleted
            }            
        
        } catch (e) {
        
            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 400,
                body: e.message
            }
        
        }

    }
}