const {makeSketch} = require('../sketch')

module.exports = function makeAddSketch({kafka}){
    return async function addSketch(info){
       
        const sketch = makeSketch(info);
       
        // const new_sketch = new Sketch({
        //     username:sketch.getUsername(),
        //     description:sketch.getDescription(),
        //     time_taken:sketch.getTimeTaken(),
        //     img_name:sketch.getImageName(),
        //     img_url:sketch.getImageUrl(),
        //     hashtags:sketch.getHashtags()
        // });
      
        // const saved = await new_sketch.save();
        // const key = String(saved._id);

        // cache.set(key,JSON.stringify(saved));//save post to redis
        
        // await rsmq.sendMessageAsync({qname:process.env.QUEUE_NAME,message:JSON.stringify({       // send event to userfeed service
        //     id:saved._id,
        //     username:sketch.getUsername()       // username to find follower of this user
        // })});

        // await rsmq.sendMessageAsync({qname:process.env.ES_QUEUE_NAME, message:JSON.stringify({   // send event to search service
        //     index:"posts",
        //     event_type:"create",
        //     body:saved
        // })})

        // return saved;
         
        const producer = kafka.producer();
        await producer.connect();

        const body = {
            img_url:sketch.getImageUrl(),
            img_name:sketch.getImageName(),
            username:sketch.getUsername(),
            hashtags:sketch.getHashtags(),
            description:sketch.getDescription(),
            time_taken:sketch.getTimeTaken(),
            createdAt:Date.now(),
            event:"create",
            metadata:"post"
        }
        
        const result = await producer.send({
            "topic":"SketchPost",
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