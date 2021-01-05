module.exports = function BuildMakeIndividualMSG({admin}){
    return async function makeIndividualMSG(info){

        const payload = {
            data:{
                title:info.title,
                body:info.body
            }
        }
        try {
            const resp = await admin.messaging().sendToDevice(info.token, payload)
           
            return {
                ack:true,
                response:resp
            }
        
        } catch (e) {
                return{
                    ack:false,
                    error:e.message
                }    
        }
        
    }
}