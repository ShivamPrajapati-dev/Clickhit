module.exports = function makeRemoveQuote({Quote, cache, promisify}){
    return async function removeQuote(id){
        try {
            
            if(!id){
                throw new Error('must provide an id');
            }

            const delete_post = await Quote.deleteOne({_id:id});

            if(delete_post.deletedCount==0){
                throw new Error('no post found');
            }
            
            const delAsync = promisify(cache.del).bind(cache);    // delete from cache
            await delAsync(id);

            return delete_post;
        } catch (e) {
            throw new Error(e.message);
        }
    } 
}