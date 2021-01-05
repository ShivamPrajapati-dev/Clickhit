module.exports = function BuildMakePromotionalMSG({admin}){
    return async function makePromotionalMSG(info){

        const payload = {
            data:{
                title:info.title,
                body:info.body
            }
        }
        try {
            const resp = await admin.messaging().sendToTopic(info.event, payload)
           
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