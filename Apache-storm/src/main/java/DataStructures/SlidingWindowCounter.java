package DataStructures;

import java.io.Serializable;
import java.util.Map;

public class SlidingWindowCounter<T> implements Serializable {
    private SlotBasedCounter<T> objCounter;
    private int headSlots, tailSlots, windowLengthSlots;

    public SlidingWindowCounter(int windowLengthSlots) {
        if (windowLengthSlots < 2) {
            throw new IllegalArgumentException("Insufficient slot length. Must be greater than 1");
        }
        this.windowLengthSlots = windowLengthSlots;
        this.objCounter = new SlotBasedCounter<T>(windowLengthSlots);
        this.headSlots = 0;
        this.tailSlots = slotAfter(headSlots);
    }


    public void incrementCount(T obj) {
        objCounter.incrementCount(obj, headSlots);
    }

    public Map<T, Long> getCountsThenAdvanceWindow() {
        Map<T, Long> counts = objCounter.getCounts();
        objCounter.wipeZeros();
        objCounter.wipeSlot(tailSlots);
        advanceHead();
        return counts;
    }

    private void advanceHead() {
        headSlots = tailSlots;
        tailSlots = slotAfter(tailSlots);
    }

    private int slotAfter(int slot) {
        return (slot + 1) % windowLengthSlots;

    }
}
