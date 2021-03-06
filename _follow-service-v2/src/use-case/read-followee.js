
module.exports = function makeReadFollowee({Follow}){

    return async function readFollowee(id){
        
        if(!id){
            throw new Error('Must provide username')      // id = username
        }
        
        const data = await Follow.find({followee_id:id});
        
        return data;
    }
}