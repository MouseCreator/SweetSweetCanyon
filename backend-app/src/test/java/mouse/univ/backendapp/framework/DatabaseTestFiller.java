package mouse.univ.backendapp.framework;

import mouse.univ.backendapp.service.fill.FillDataBaseService;
import org.springframework.test.context.TestContext;
import org.springframework.test.context.support.AbstractTestExecutionListener;

public class DatabaseTestFiller extends AbstractTestExecutionListener {
    @Override
    public void beforeTestExecution(TestContext testContext) {
        FillDataBaseService filler = testContext.getApplicationContext().getBean(FillDataBaseService.class);
        filler.fillDataBase();
        filler.addOnRequest();
    }
}
