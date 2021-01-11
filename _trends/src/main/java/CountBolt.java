import com.lambdaworks.redis.RedisClient;
import com.lambdaworks.redis.RedisConnection;
import com.lambdaworks.redis.RedisURI;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.BasicOutputCollector;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.topology.base.BaseBasicBolt;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Tuple;
import org.apache.storm.tuple.Values;
import org.json.JSONObject;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class CountBolt extends BaseBasicBolt {

    RedisClient client;
    RedisConnection<String, String> connection;

    @Override
    public void prepare(Map<String, Object> topoConf, TopologyContext context) {
        super.prepare(topoConf, context);
        client = new RedisClient(new RedisURI("localhost", 6379, 60, TimeUnit.SECONDS));
        connection = client.connect();
    }

    @Override
    public void execute(Tuple tuple, BasicOutputCollector basicOutputCollector) {
        String s = tuple.getString(4);
        JSONObject json = new JSONObject(s);
        String event = json.getString("event");    // create, update or delete
        String type = json.getString("metadata"); // like or comment
        String activityId = json.getString("activityId");

        long count = 0;

        if (event.equals("create")) {
            switch (type) {
                case "like":
                    count++;
                    break;
                case "comment":
                    count+=2;
                    break;
            }
        }


        String post = connection.get(activityId);
        JSONObject cacheJson = new JSONObject(post);
        Instant instant = Instant.parse(cacheJson.getString("createdAt"));
        long millis = instant.toEpochMilli();
        basicOutputCollector.emit(new Values(count, millis, activityId));
    }

    @Override
    public void declareOutputFields(OutputFieldsDeclarer outputFieldsDeclarer) {
        outputFieldsDeclarer.declare(new Fields("count","startTime", "activityId"));
    }
}
