module.exports = function makeAddData({client}){
    return async function adddata(info){
        
        const data = await client.index({
            index:info.index,
            body:info.body
        });

        await client.indices.refresh({index:info.index});

        return data;

    }
}