
module.exports = function makeReadFollower({Follow}){

    return async function readFollower(id){
        
        if(!id){
            throw new Error('Must provide username')      // id = username
        }
        
        const data = await Follow.find({followee_id:id});
        
        return data;
    }
}