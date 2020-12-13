module.exports = function makeDeleteCommet({Comment}){
    return async function deleteComment({id}){
        try {
            
            if(!id){
                throw new Error('must provide an id');
            }

            const delete_comment = await Comment.deleteOne({_id:id});

            if(delete_comment.deletedCount==0){
                throw new Error('no comment found');
            }
            return delete_comment;
        } catch (e) {
            throw new Error(e.message);
        }
    }
}