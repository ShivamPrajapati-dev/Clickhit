const {makeSketch} = require('../sketch');

module.exports = function makeEditSketch({Sketch,cache}){
    return async function editSketch(info,id){

        if(!id){
            throw new Error('Must provide post id');
        }
        const sketch = makeSketch(info);

        const existing = await Sketch.findOne({_id:id,username:sketch.getUsername()});
     
        existing.description = sketch.getIngredients() || existing.description;
        existing.img_name = sketch.getImageName() || existing.img_name;
        existing.img_url = sketch.getImageUrl() || existing.img_url;
        existing.time_taken = sketch.getTimeTaken() || existing.time_taken;

        const key = String(existing._id);

        cache.set(key, JSON.stringify(existing));        // update post in redis

        return await existing.save();

    }
}