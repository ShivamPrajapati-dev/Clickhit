module.exports  = function BuildMakeConsumer({kafka}){
    return async function makeConsumer(){
        
        const consumer = kafka.consumer({"groupId":"Notifiers_1"});
        await consumer.connect();
        console.log('connected');
        await consumer.subscribe({
           "topic":"Notification",
           "fromBeginning":false
       })
       
       return consumer

    }
}