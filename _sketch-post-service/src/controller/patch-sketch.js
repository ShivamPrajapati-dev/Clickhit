module.exports = function makePatchSketch({editSketch}){
    return async function patchSketch(httpRequest){
        const  info  = httpRequest.body
        const id = httpRequest.id;
        try {
            const edited = await editSketch(info,id);

            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 200,
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