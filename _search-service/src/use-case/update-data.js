module.exports = function makeUpdateData({client}){
    return async function updateData(info){
        const update = await client.update({
            index:info.index,
            id:info.id,
            body:{
                doc:info.body
            }
        })

        return update;
    }
}