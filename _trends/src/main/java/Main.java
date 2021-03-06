import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.storm.Config;
import org.apache.storm.LocalCluster;
import org.apache.storm.kafka.spout.KafkaSpout;
import org.apache.storm.kafka.spout.KafkaSpoutConfig;
import org.apache.storm.topology.TopologyBuilder;

public class Main {
    public static void main(String[] args) {
        TopologyBuilder builder = new TopologyBuilder();

        builder.setSpout("kafka_spout", new KafkaSpout<>(KafkaSpoutConfig.builder("127.0.0.1:9092", "Like", "Comment", "Storm").setProp(ConsumerConfig.GROUP_ID_CONFIG, "storm-id").build()), 1);
        builder.setBolt("CounterBolt", new CountBolt()).shuffleGrouping("kafka_spout");
        builder.setBolt("DatabaseBolt", new DatabaseWriter()).shuffleGrouping("CounterBolt");

        Config config = new Config();

        try {
            LocalCluster cluster = new LocalCluster();
            cluster.submitTopology("Topology", config, builder.createTopology());
            Thread.sleep(1000);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}