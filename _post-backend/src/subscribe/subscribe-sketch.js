module.exports = function makeSubscribeSketch({kafka}){
    return async function subscribeSketch(groupId){
       
        if(!groupId){
            throw new Error('Must provide group id')
        }

        const consumer = kafka.consumer({"groupId":groupId});
        await consumer.connect();
        console.log(`${groupId} connected`);
        await consumer.subscribe({
           "topic":"SketchPost",
           "fromBeginning":true
       })
    
       return consumer
    
    }
}