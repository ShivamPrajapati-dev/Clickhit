import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.*;
import com.mongodb.client.model.Filters;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.BasicOutputCollector;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.topology.base.BaseBasicBolt;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Tuple;
import org.apache.storm.tuple.Values;
import org.bson.Document;
import org.bson.types.ObjectId;
import java.util.Map;

import static com.mongodb.client.model.Updates.*;

public class DatabaseWriter extends BaseBasicBolt {

    MongoDatabase database;
    MongoCollection<Document> collection;

    @Override
    public void prepare(Map<String, Object> topoConf, TopologyContext context) {
        super.prepare(topoConf, context);
        ConnectionString connectionString = new ConnectionString(Assets.url);
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .retryWrites(true)
                .build();
        MongoClient mongoClient = MongoClients.create(settings);
        database = mongoClient.getDatabase("test");
    }

    @Override
    public void execute(Tuple tuple, BasicOutputCollector basicOutputCollector) {
        collection = database.getCollection("trends");
        long count = tuple.getLong(0);
        long startTime = tuple.getLong(1);
        String activityId = tuple.getString(2);

        FindIterable<Document> iterable = collection.find(new Document("_id", new ObjectId(activityId)));
        if (iterable.first() != null) {
            collection.updateOne(Filters.eq("_id", new ObjectId(activityId)), inc("count", count));
        } else {
            Document document = new Document("_id", new ObjectId(activityId))
                    .append("count", count)
                    .append("startTime", startTime);

            collection.insertOne(document);
        }
        basicOutputCollector.emit(new Values(activityId));
    }

    @Override
    public void declareOutputFields(OutputFieldsDeclarer outputFieldsDeclarer) {
        outputFieldsDeclarer.declare(new Fields("activityId"));
    }
}
