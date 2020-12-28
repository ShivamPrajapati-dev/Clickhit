const {makeSketch} = require('../sketch')

module.exports = function makeAddSketch({Sketch,rsmq,cache}){
    return async function addSketch(info){
       
        const sketch = makeSketch(info);
       
        const new_sketch = new Sketch({
            username:sketch.getUsername(),
            description:sketch.getDescription(),
            time_taken:sketch.getTimeTaken(),
            img_name:sketch.getImageName(),
            img_url:sketch.getImageUrl()
        });
      
        const saved = await new_sketch.save();
        const key = String(saved._id);

        cache.set(key,JSON.stringify(saved));//save post to redis
        
        await rsmq.sendMessageAsync({qname:process.env.QUEUE_NAME,message:JSON.stringify({       // send event to userfeed service
            id:saved._id,
            username:sketch.getUsername()       // username to find follower of this user
        })});

        return saved;
         
    }
}