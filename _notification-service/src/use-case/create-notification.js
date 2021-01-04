const { makeNotification } = require('../notification');

module.exports = function makeCreateNotification({axios,url,kafka}){
    return async function createNotification(info){

        // contact token-store service for device token and subscriptions details
        // taken info from token-store service and publish a task in kafka queue based on the topic
        // return { ack:true }

        const notification = makeNotification(info)
        const response = await axios.post(url,{username:notification.getUsername()});

        const producer = kafka.producer();
        await producer.connect();

        if(response[notification.getEvent()]===false){
            throw new Error('User not subscribed');
        }
        
        const body = {
            title:notification.getTitle(),
            subtitle:notification.getSubtitle(),
            body:notification.getBody(),
            img_url:notification.getImage(),
            token:response.device_token
        }

        await producer.send({
            topic:notification.getEvent(),
            messages:[{
                value:JSON.stringify(body)
            }]
        });

        return {
            acknowledged:true
        }

    }
}