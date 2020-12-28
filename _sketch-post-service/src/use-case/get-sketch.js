module.exports = function makeGetSketch({Sketch}){
    return async function readSketch({username}){
        
        if(!username){
            throw new Error('Must provide username');
        }

        const posts = await Sketch.find({username});

        if(!posts){
            throw new Error('No posts found');
        }

        return posts;

    }
}