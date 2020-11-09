package Bolt;

import DataStructures.SlidingWindowCounter;
import com.esotericsoftware.minlog.Log;
import org.apache.storm.Config;
import org.apache.storm.task.IOutputCollector;
import org.apache.storm.task.OutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.topology.base.BaseRichBolt;
import org.apache.storm.tuple.Tuple;
import org.apache.storm.tuple.Values;

import java.util.Map;

public class RollingCountBolt extends BaseRichBolt {
    private final int emitFrequencyInSeconds;
    private SlidingWindowCounter counter;
    private int windowLengthInSeconds;
    private OutputCollector collector;


    public RollingCountBolt(int windowLengthInSeconds, int emitFrequencyInSeconds) {
        this.windowLengthInSeconds = windowLengthInSeconds;
        this.emitFrequencyInSeconds = emitFrequencyInSeconds;
        counter = new SlidingWindowCounter(this.windowLengthInSeconds);
    }

    @Override
    public void prepare(Map<String, Object> map, TopologyContext topologyContext, OutputCollector outputCollector) {
        counter=new SlidingWindowCounter(this.windowLengthInSeconds);
        collector = outputCollector;
    }

    @Override
    public void execute(Tuple tuple) {

        if (TupleHelpers.isTickTuple(tuple)) {
            Log.info("Received tick tuple, triggering emit of current window counts");
            emitCurrentWindowCounts();
        }
        else {
            countObjAndAck(tuple);
        }
    }
    private void emitCurrentWindowCounts() {
        Map<Object, Long> counts = counter.getCountsThenAdvanceWindow();


        emit(counts, this.windowLengthInSeconds);
    }

    private void emit(Map<Object, Long> counts,int t) {
        for (Map.Entry<Object, Long> entry : counts.entrySet()) {
            Object obj = entry.getKey();
            Long count = entry.getValue();
            collector.emit(new Values(obj, count));
        }
    }

    private void countObjAndAck(Tuple tuple) {
        Object obj = tuple.getValue(0);
        counter.incrementCount(obj);
        collector.ack(tuple);
    }
    @Override
    public void declareOutputFields(OutputFieldsDeclarer outputFieldsDeclarer) {

    }

    @Override
    public Map<String, Object> getComponentConfiguration() {
        Config conf = new Config();
        int tickFrequencyInSeconds = 10;
        conf.put(Config.TOPOLOGY_TICK_TUPLE_FREQ_SECS, tickFrequencyInSeconds);
        return conf;
    }
}
