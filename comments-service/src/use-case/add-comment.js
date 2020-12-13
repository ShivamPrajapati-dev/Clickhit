const makeComment = require('../comment')

module.exports = function makeAddComment({Comment}){
    return async function addComment(commentInfo){
        const comment = makeComment(commentInfo);

        let new_comment = new Comment({
            imageUrl:comment.getImageUrl(),
            name:comment.getAuthorName(),
            userId:comment.getUserId(),
            text:comment.getText(),
            activityId:comment.getPostId()
        });
         return await new_comment.save();    
    }
}