package mouse.univ.backendapp.exception;

public class InternalNotFound extends RuntimeException{
    public InternalNotFound(String item, long id) {
        super("Cannot find " + item + " with id " + id);
    }

    public InternalNotFound() {
    }
}
