module.exports = function makePatchUser({editUser}){
    return async function patchUser(httpRequest){
        const info = httpRequest.body;
       
        try {
            const edited = await editUser({
                ...info
            });

            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 202,
                body: edited
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