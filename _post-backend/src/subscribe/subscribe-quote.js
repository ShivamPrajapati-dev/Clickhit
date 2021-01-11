module.exports = function makeSubscribeQuote({kafka}){
    return async function subscribeQuote(groupId){
       
        if(!groupId){
            throw new Error('Must provide group id')
        }

        const consumer = kafka.consumer({"groupId":groupId});
        await consumer.connect();
        console.log(`${groupId} connected`);
        await consumer.subscribe({
           "topic":"QuotePost",
           "fromBeginning":true
       })
    
       return consumer
    
    }
}