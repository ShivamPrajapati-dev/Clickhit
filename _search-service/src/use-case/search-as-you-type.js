module.exports = function buildMakeSAYT({client}){
    return async function makeSAYT(info){
        let search_fields=[];

        for(field of info.body.field){
            search_fields.push(field);              // type of data user want to search e.g username, tags etc
            search_fields.push(`${field}._2gram`);          // split into phrases of two words
            search_fields.push(`${field}._2gram`);
            search_fields.push(`${field}_index_prefix`);        // split each token into prefixes of tokens
        }

        const {body} = await client.search({
            index:info.index,
            body:{
                query:{
                    multi_match:{
                        query:info.query,       // text to be searched
                        type:"bool_prefix",
                        fields:search_fields
                    }
                }
            }
        })
        return body.hits.hits;
    }
}