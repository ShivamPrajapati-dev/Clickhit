module.exports = function makeCommentAggregator({Like,TempLike,cron}){
    return function comment_aggregator(){
        
        console.log('comment aggregator running');
        
        cron.schedule('48 23 * * *', async function(){
            try {

                await Like.aggregate([
                    {
                        $match:{
                            active:true,
                            type:"comment"
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
                        $out:"like-aggregate(comment)"
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