
module.exports = function makeCreateTopic({kafka}){
    return async function createTopic(){

        const admin = kafka.admin();
        await admin.connect();

        await admin.createTopics({
            topics:[{
                topic:"Like",
                numPartitions:1
            }]                // {topics:[{topic,numPartitions}]}
        })

        await admin.disconnect();

        return {
            acknowledged:true
        }
    }
}