module.exports = function makeAggregator({Follow,TempFollow,cron}){
    return function aggregator(){
      
        console.log('aggregator running');
      
        cron.schedule('11 13 * * *', async function(){
            try {

                await Follow.aggregate([
                    
                    {
                        $group:{
                            _id:"$followee_id",
                            sum:{
                                $sum:1
                            }
                        }
                    },
                    {
                        $out:"follow-aggregate"
                    }
                ]);
                
                await TempFollow.deleteMany({});      // purge temporary data

                console.log('successfull...');

            } catch (e) {
                console.log(e);
            }
            
        })
    }
}