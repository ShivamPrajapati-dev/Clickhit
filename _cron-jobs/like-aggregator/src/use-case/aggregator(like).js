module.exports = function makeLikeAggregator({Like,TempLike,cron}){
    return function like_aggregator(){
      
        console.log('like aggregator running');
      
        cron.schedule('48 23 * * *', async function(){
            try {

                await Like.aggregate([
                    {
                        $match:{
                            active:true,
                            type:"post"
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
                        $out:"like-aggregate(like)"
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