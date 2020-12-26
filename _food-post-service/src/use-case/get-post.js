module.exports = function makeGetPost({Food}){
    return async function getPost({username}){
        
        if(!username){
            throw new Error('Must provide username');
        }

        const posts = await Food.find({username});

        if(!posts){
            throw new Error('No posts found');
        }

        return posts;

    }
}