package Bolt;

import DataStructures.Rankings;
import org.apache.storm.tuple.Tuple;

public class TotalRankingsBolt extends AbstractRankerBolt{
    private static final long serialVersionUID = -8447525895532302198L;

    public TotalRankingsBolt() {
        super();
    }

    public TotalRankingsBolt(int topN) {
        super(topN);
    }

    public TotalRankingsBolt(int topN, int emitFrequencyInSeconds) {
        super(topN, emitFrequencyInSeconds);
    }

    @Override
    void updateRankingsWithTuple(Tuple tuple) {
        Rankings rankingsToBeMerged = (Rankings) tuple.getValue(0);
        super.getRankings().updateWith(rankingsToBeMerged);
        super.getRankings().pruneZeroCounts();
    }
}
