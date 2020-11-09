package Bolt;

import org.apache.storm.Constants;
import org.apache.storm.tuple.Tuple;

public  class TupleHelpers {
    static boolean isTickTuple(Tuple tuple) {
        return tuple.getSourceComponent().equals(Constants.SYSTEM_COMPONENT_ID)
                && tuple.getSourceStreamId().equals(Constants.SYSTEM_TICK_STREAM_ID);
    }
}
