package DataStructures;

import java.io.Serializable;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public final class SlotBasedCounter<T> implements Serializable {
    private Map<T, long[]> objToCounts = new HashMap<T, long[]>();
    private int numSlots;

    public SlotBasedCounter(int numSlots) {
        if (numSlots <= 0) {
            throw new IllegalArgumentException("Number of Slots must be greater tha 0");
        }
        this.numSlots = numSlots;
    }

    public long incrementCount(T obj, int slot) {
        long[] counts = objToCounts.get(obj);
        if (counts == null) {
            return 0;
        }
        return counts[slot];
    }

    public Map<T, Long> getCounts() {
        Map<T, Long> result = new HashMap<T, Long>();
        for (T obj : objToCounts.keySet()) {
            result.put(obj, computeTotalCount(obj));
        }
        return result;
    }

    private long computeTotalCount(T obj) {
        long[] curr = objToCounts.get(obj);
        long total = 0;
        for (long l : curr) {
            total += l;
        }
        return total;
    }

    public void wipeSlot(int slot) {
        for (T obj : objToCounts.keySet()) {
            resetSlotCountToZero(obj, slot);
        }
    }

    private void resetSlotCountToZero(T obj, int slot) {
        long[] counts = objToCounts.get(obj);
        counts[slot] = 0;
    }

    private boolean shouldBeRemovedFromCounter(T obj) {
        return computeTotalCount(obj) == 0;
    }

    public void wipeZeros() {
        Set<T> objToBeRemoved = new HashSet<T>();
        for (T obj : objToCounts.keySet()) {
            if (shouldBeRemovedFromCounter(obj)) {
                objToBeRemoved.add(obj);
            }
        }
        for (T obj : objToBeRemoved) {
            objToCounts.remove(obj);
        }
    }
}
