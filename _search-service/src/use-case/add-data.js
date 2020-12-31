module.exports = function makeAddData({client}){
    
    return async function adddata(info){

        if(info.index == "prefs"){

            const {body} = await client.get({
                index:"posts",
                id:info.body.activityId
            })

            const count_data = await client.count({
                index:"prefs",
                body:{
                    query:{
                        term:{
                            "username":index.body.userId
                        }
                    }
                }
            });

            if(count_data.count == 0){

                await client.index({
                    index:info.index,
                    id:info.body.userId,                 // use mongodb id
                    body:{
                        "username":info.body.userId,
                        "likes":[]                  // create an empty array initially
                    }
                });

            }else{
                
                await client.update({                // update likes array with the post the user liked
                    index:info.index,
                    id:info.body.userId,
                    body:{
                        script:{
                            lang:"painless",
                            source:"ctx._source.likes.add(params.like)",
                            params:{
                                like:body._source
                            }
                        }
                    }
                })
            }

        }else{

            await client.index({
                index:info.index,
                id:info.id,                 // use mongodb id
                body:info.body
            });

        }

        await client.indices.refresh({index:info.index});

        return {success:true};

    }
}