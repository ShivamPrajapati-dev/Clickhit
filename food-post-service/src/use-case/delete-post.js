module.exports = function makeDeletePost({Food}){
    return async function deletePost({id}){
        try {
            
            if(!id){
                throw new Error('must provide an id');
            }

            const delete_post = await Food.deleteOne({_id:id});

            if(delete_post.deletedCount==0){
                throw new Error('no post found');
            }
            return delete_post;
        } catch (e) {
            throw new Error(e.message);
        }
    }
}