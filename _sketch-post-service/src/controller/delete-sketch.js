module.exports = function makeDeleteSketch({removeSketch}){
    return async function deleteSketch(httpRequest){
        const id = httpRequest.id;

        try{
            const deleted = await removeSketch(id);
            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 201,
                body: deleted
            }
        } catch(e){
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