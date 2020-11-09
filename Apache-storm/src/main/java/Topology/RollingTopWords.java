package Topology;

import Bolt.IntermediateRankingsBolt;
import Bolt.RollingCountBolt;
import Bolt.TotalRankingsBolt;
import org.apache.storm.Config;
import org.apache.storm.LocalCluster;
import org.apache.storm.testing.TestWordSpout;
import org.apache.storm.topology.TopologyBuilder;
import org.apache.storm.tuple.Fields;

public class RollingTopWords {
    private static final int DEFAULT_RUNTIME = 60;
    private static final int TOP_N = 5;
    private final TopologyBuilder builder;
    private final String topologyName;
    private final Config topologyConfig;
    private final int runtimeInSeconds;

    public RollingTopWords() throws InterruptedException{

        builder = new TopologyBuilder();
        topologyName = "slidingWindowCounts";
        topologyConfig = createTopologyConfiguration();
        runtimeInSeconds = DEFAULT_RUNTIME;
        
        wireTopology();
    }

    private Config createTopologyConfiguration() {
        Config conf = new Config();
        conf.setDebug(true);
        return conf;
    }

    private void wireTopology() throws InterruptedException {
        String spoutId = "wordGenerator";
        String counterId = "counter";
        String intermediateRankerId = "intermediateRanker";
        String totalRankerId = "finalRanker";
        builder.setSpout(spoutId, new TestWordSpout(), 5);
        builder.setBolt(counterId, new RollingCountBolt(9, 3), 4).fieldsGrouping(spoutId, new Fields("word"));
        builder.setBolt(intermediateRankerId, new IntermediateRankingsBolt(TOP_N), 4).fieldsGrouping(counterId, new Fields(
                "obj"));
        builder.setBolt(totalRankerId, new TotalRankingsBolt(TOP_N)).globalGrouping(intermediateRankerId);
    }


    public void run() throws InterruptedException {
        try {
            LocalCluster cluster = new LocalCluster();
            cluster.submitTopology(topologyName,topologyConfig,builder.createTopology());
            Thread.sleep((1000));
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public static void main(String[] args) throws Exception {
        new RollingTopWords().run();
    }
}
