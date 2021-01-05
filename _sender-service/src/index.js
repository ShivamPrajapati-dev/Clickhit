const {
    makeConsumer
} = require('./consumer');

const {
    makePromotionalMSG
} = require('./use-case');

const {fork} = require('child_process');

async function run(){

    try {
        const consumer = await makeConsumer();
        await consumer.run({
            "eachMessage": async (result) => {
                const body = JSON.parse(result.message.value.toString())
                
                if(body.event == 'promotion'){

                    const resp = await makePromotionalMSG(body)
                    console.log(resp);

                }else{

                    body.ids.forEach((id)=>{
                        const childProcess = fork('./process/index.js')

                        childProcess.send({token:id.token,...body})

                        childProcess.on("message", (message)=>{
                            console.log(message);
                        })
                    })

                }
            }
        })

    } catch (e) {
        console.log(e);
    }


}

run();