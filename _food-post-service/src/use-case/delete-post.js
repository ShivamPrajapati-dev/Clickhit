module.exports = function makeDeletePost({Food, cache, promisify}){
    return async function deletePost({id}){
        try {
            
            if(!id){
                throw new Error('must provide an id');
            }

            const delete_post = await Food.deleteOne({_id:id});

            if(delete_post.deletedCount==0){
                throw new Error('no post found');
            }
            const delAsync = promisify(cache.del).bind(cache);
            await delAsync(id);
            return delete_post;
        } catch (e) {
            throw new Error(e.message);
        }
    }
}