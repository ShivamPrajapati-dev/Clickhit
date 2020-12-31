module.exports = function makeRemoveData({client}){
    return async function removeData(info){

        if(info.index == "prefs"){

            const {body} = await client.get({
                index:"posts",
                id:info.body.activityId
            })

         
            await client.update({                // update likes array with the post the user liked
                index:info.index,
                id:info.body.userId,
                body:{
                    script:{
                        lang:"painless",
                        source:"if (ctx._source.likes.contains(params.like)) { ctx._source.likes.remove(ctx._source.likes.indexOf(params.like)) }",
                        params:{
                            like:body._source
                        }
                    }
                }
            })
            
        }else{
       
            await client.delete({
                index:info.index,
                id:info.id,
            })

        }

        return {success:true};
    }
}