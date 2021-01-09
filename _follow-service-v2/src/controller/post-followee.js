module.exports = function makePostFollowee({addFollowee}){
   
    return async function postFollowee(httpRequest){
        
        const info = httpRequest.body;

        try {
            const posted = await addFollowee(info);
        
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
                body: e.message
            }
        
        }

    }
}