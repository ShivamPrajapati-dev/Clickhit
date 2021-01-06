
module.exports = function makePostLike({addLike}){

    return async function postLike(httpRequest){
        const likeInfo = httpRequest.body;

        try {
            const posted = await addLike({
                ...likeInfo
            });

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