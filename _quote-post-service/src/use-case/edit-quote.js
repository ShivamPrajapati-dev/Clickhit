const { makeQuote } = require('../quote');

module.exports = function makeEditQuote({Quote, cache}){
    return async function editQuote(info,id){
        
        if(!id){
            throw new Error('Must provide quote id')
        }

        const quote = makeQuote(info);
        
        const existing = await Quote.findOne({_id:id,username:quote.getUsername()});
        existing.img_name = quote.getImageName() || existing.img_name;
        existing.img_url = quote.getImageUrl() || existing.img_url;
        
        const key = String(existing._id);

        cache.set(key, JSON.stringify(existing));        // update post in redis

        return await existing.save();
    } 
}