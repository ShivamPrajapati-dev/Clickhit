import org.apache.storm.topology.BasicOutputCollector;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.topology.base.BaseBasicBolt;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Tuple;
import org.joda.time.DateTime;
import org.joda.time.Period;

import java.sql.Timestamp;

public class ScoreCalculatorBolt extends BaseBasicBolt {

    @Override
    public void execute(Tuple tuple, BasicOutputCollector basicOutputCollector) {
        long likes = tuple.getLong(0);
        long comments = tuple.getLong(1);
        DateTime startDate = DateTime.parse(tuple.getString(2));
        long count = 2*comments + likes;
        double gravity = 1.8;
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        long seconds = (startDate.toDate().getTime() - timestamp.getTime())/1000;
        long mins = seconds/60;
        System.out.println(mins);
    }

    @Override
    public void declareOutputFields(OutputFieldsDeclarer outputFieldsDeclarer) {
        outputFieldsDeclarer.declare(new Fields("score"));
    }
}
