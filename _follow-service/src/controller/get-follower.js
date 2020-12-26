module.exports = function makeGetFollower({readFollower}){
   
    return async function getFollower(httpRequest){
        
        const info = httpRequest.body.username;

        try {
            const read = await readFollower(info);
        
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