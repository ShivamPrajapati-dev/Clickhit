
module.exports = function makeDeleteLike({Like}){
    return async function deleteLike({id,userId}){

        try {
            
            if(!id){
                throw new Error('must provide like id');
            }

            if(!userId){
                throw new Error('must provide user id');
            }


            const delete_like = await Like.deleteOne({_id:id,userId});

            if(delete_like.deletedCount==0){
                throw new Error('unable to delete like');
            }

            return delete_like;

        } catch (e) {
            throw new Error(e.message);
        }

    }
}