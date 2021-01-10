import com.clearspring.analytics.stream.frequency.CountMinSketch;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.BasicOutputCollector;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.topology.base.BaseBasicBolt;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Tuple;
import org.apache.storm.tuple.Values;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class CountMinSketchBolt extends BaseBasicBolt {

    CountMinSketch likeSketch;
    CountMinSketch commentSketch;
     HashMap<String,String> map;

    @Override
    public void prepare(Map<String, Object> topoConf, TopologyContext context) {
        super.prepare(topoConf, context);
        commentSketch = new CountMinSketch(10,10,1);
        likeSketch = new CountMinSketch(10,10,1);
        map = new HashMap<>();
    }

    @Override
    public void execute(Tuple tuple, BasicOutputCollector basicOutputCollector) {
        String s = tuple.getString(4);
        JSONObject json = new JSONObject(s);
        String event = json.getString("event");    // create, update or delete
        String type = json.getString("metadata"); // like or comment
        String activityId = json.getString("activityId");

        if(event.equals("create")){
            if(type.equals("like")){
                likeSketch.add(activityId,1);
            }else if(type.equals("comment")){
                commentSketch.add(activityId,1);
            }else if(type.equals("post")){
                String timestamp = json.getString("createdAt");
                map.put(activityId,timestamp);
            }
        }
        long likes = likeSketch.estimateCount(activityId);
        long comments = commentSketch.estimateCount(activityId);
        String timestamp = map.get(activityId);

        basicOutputCollector.emit(new Values(likes,comments,timestamp));
    }

    @Override
    public void declareOutputFields(OutputFieldsDeclarer outputFieldsDeclarer) {
        outputFieldsDeclarer.declare(new Fields("likes","comments","timestamp"));
    }
}
