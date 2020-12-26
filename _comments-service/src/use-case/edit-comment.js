const makeCommment = require('../comment');

module.exports = function makeEditComment({Comment}){
    return async function editComment({id,commentInfo}){

        try {
            
            if(!id){
                throw new Error('must provide the comment id');
            }
            if(!commentInfo.text){
                throw new Error('comment must have atleast one character');
            }
            const existing  = await Comment.findById({_id:id});
            
            if(!existing){
                throw new Error('comment not found');
            }

            const new_comment = makeCommment(commentInfo);
            existing.text = new_comment.getText();
            existing.activityId = new_comment.getPostId();
            return await existing.save();
       
        } catch (e) {
            throw new Error(e.message);
        }


    }
}