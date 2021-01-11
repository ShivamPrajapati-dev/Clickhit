const {makeSketch} = require('../sketch');

module.exports = function makeEditSketch({kafka}){
    return async function editSketch(info,id){

        if(!id){
            throw new Error('Must provide post id');
        }
        const sketch = makeSketch(info);

        // const existing = await Sketch.findOne({_id:id,username:sketch.getUsername()});
     
        // existing.description = sketch.getIngredients() || existing.description;
        // existing.img_name = sketch.getImageName() || existing.img_name;
        // existing.img_url = sketch.getImageUrl() || existing.img_url;
        // existing.time_taken = sketch.getTimeTaken() || existing.time_taken;
        // existing.hashtags = sketch.getHashtags() || existing.hashtags
        
        // const key = String(existing._id);

        // cache.set(key, JSON.stringify(existing));        // update post in redis
    
        // await rsmq.sendMessageAsync({qname:process.env.ES_QUEUE_NAME, message:JSON.stringify({   // send event to search service
        //     index:"posts",
        //     event_type:"update",
        //     body:existing
        // })})

        // return await existing.save();

        const producer = kafka.producer();
        await producer.connect();

        const body = {
            id:id,
            img_url:sketch.getImageUrl(),
            img_name:sketch.getImageName(),
            username:sketch.getUsername(),
            hashtags:sketch.getHashtags(),
            event:"update",
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