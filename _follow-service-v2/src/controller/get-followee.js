module.exports = function makeGetFollowee({readFollowee}){
   
    return async function getFollowee(httpRequest){
        
        const info = httpRequest.body.username;

        try {
            const read = await readFollowee(info);
        
            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 200,
                body: read
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