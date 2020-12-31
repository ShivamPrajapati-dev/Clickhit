module.exports = function makeRecommendation({client}){
    return async function recommendation(info){
        // first search all the post that current user liked
        const {body} = await client.search({
            index:"prefs",
            body:{
                query:{
                    term:{
                        _id:info.id
                    }
                }
            }
        });
        
    }
}