module.exports = function makeCalculator({Trends, cron}){
    return function calculator(){
        console.log('running ... ');

        cron.schedule('0 */60 * * * *', async ()=>{
            try {
                await Trends.aggregate([
                    {
                        $project:{
                            
                            score:{
                                $divide:[
                                    "$count",
                                    {
                                        $pow:[
                                            {
                                                $add:[
                                                    1,
                                                    {
                                                        $divide:[
                                                            {
                                                                $subtract:[
                                                                    Date.now(),
                                                                    "$startTime"
                                                                ]
                                                            },
                                                            60000
                                                        ]
                                                    }
                                                ]
                                            },
                                            1.8
                                        ]
                                    }
                                ]
                            }

                        }
                    },
                    {
                        $out:"score"
                    }
                ])
                console.log('successfull...');
            } catch (e) {
                console.log(e.message);
            }
        })
    }
}