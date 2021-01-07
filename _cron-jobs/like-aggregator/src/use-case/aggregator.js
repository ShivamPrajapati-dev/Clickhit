module.exports = function makeAggregator({Like,TempLike,cron}){
    return function aggregator(){
        cron.schedule('10 23 * * *', async function(){
            try {

                await Like.aggregate([
                    {
                        $match:{
                            active:true
                        }
                    },
                    {
                        $group:{
                            _id:"$activityId",
                            sum:{
                                $sum:1
                            }
                        }
                    },
                    {
                        $out:"like-aggregate"
                    }
                ]);
                
                await TempLike.deleteMany({});      // purge temporary data

                console.log('successfull...');

            } catch (e) {
                console.log(e);
            }
            
        })
    }
}