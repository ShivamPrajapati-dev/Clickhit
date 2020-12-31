module.exports = function makeRemoveData({client}){
    return async function removeData(info){
       
        const deleted_data = await client.delete({
            index:info.index,
            id:info.id,
        })

        return deleted_data;
    }
}