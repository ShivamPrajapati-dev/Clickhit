const { makeNotification } = require('../notification');

module.exports = function makeCreateNotification({axios,url,kafka}){
    return async function createNotification(info){

        // contact token-store service for device token and subscriptions details
        // taken info from token-store service and publish a task in kafka queue based on the topic
        // return { ack:true }

        const notification = makeNotification(info)
        const response = await axios.post(url,{username:notification.getUsername()});    // contact token service

        const producer = kafka.producer();
        await producer.connect();

        if(response.data[notification.getEvent()]===false){
            throw new Error('User not subscribed');
        }
        
        const body = {
            title:notification.getTitle(),
            subtitle:notification.getSubtitle(),
            body:notification.getBody(),
            img_url:notification.getImage(),
            type:"push",                            // type={push,email,sms}
            event:notification.getEvent(),
            ids:response.data.device_token
        }

        const result = await producer.send({
            "topic":"Notification",
            "messages":[{
                "value":JSON.stringify(body),
                "partition":0        
            }]
        });
        await producer.disconnect();
        return {
            acknowledged:true,
            result
        }

    }
}