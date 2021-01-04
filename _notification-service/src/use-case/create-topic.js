
module.exports = function makeCreateTopic({kafka}){
    return async function createTopic(info){

        const admin = kafka.admin();
        await admin.connect();

        await admin.createTopics({
            topics:info.topics                   // {topics:[{topic,numPartitions}]}
        })

        await admin.disconnect();
    }
}