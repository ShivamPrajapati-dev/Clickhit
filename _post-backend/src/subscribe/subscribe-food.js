module.exports = function makeSubscribeFood({kafka}){
    return async function subscribeFood(groupId){
       
        if(!groupId){
            throw new Error('Must provide group id')
        }

        const consumer = kafka.consumer({"groupId":groupId});
        await consumer.connect();
        console.log(`${groupId} connected`);
        await consumer.subscribe({
           "topic":"FoodPost",
           "fromBeginning":true
       })
    
       return consumer
    
    }
}