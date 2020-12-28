module.exports = function makeReadQuote({Quote}){
    return async function readQuote(username){
        
        if(!username){
            throw new Error('Must provide username');
        }

        const posts = await Quote.find({username});

        if(!posts){
            throw new Error('No posts found');
        }

        return posts;

    }
}