const {
    makeIndividualMSG
} = require('../use-case')

process.on("message", async (message)=>{
    
    const resp = await makeIndividualMSG(message);
    process.send({resp,message});
    process.exit();
})