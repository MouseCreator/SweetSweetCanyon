package mouse.univ.backendapp.service.fill;

public class FillCounter {
    private int count;
    public FillCounter(int count) {
        this.count = count;
    }
    public FillCounter() {
        this.count = 0;
    }
    public int get() {
        return count;
    }
    public void increment() {
        count++;
    }
}
