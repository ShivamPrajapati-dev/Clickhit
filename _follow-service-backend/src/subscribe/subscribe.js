module.exports = function makeSubscribe({kafka}){
    return async function subscribe(groupId){
       
        if(!groupId){
            throw new Error('Must provide group id')
        }

        const consumer = kafka.consumer({"groupId":groupId});
        await consumer.connect();
        console.log(`${groupId} connected`);
        await consumer.subscribe({
           "topic":"Follow",
           "fromBeginning":true
       })
    
       return consumer
    
    }
}