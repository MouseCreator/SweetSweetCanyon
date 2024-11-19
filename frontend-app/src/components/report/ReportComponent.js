import {useState} from "react";
import {ReportsControl} from "./ReportsControl";
import {ReportsTable} from "./ReportsTable";
const MOCK_DATA = {
    requestType: "revenue",
    total: {
        name: "Total",
        value: -400,
        price: -40000
    },
    shops: [
        {
            name: "Shop 1",
            value: 8000,
            price: 800000
        },
        {
            name: "Shop 2",
            value: -8400,
            price: 840000
        }
    ]

}
const DEFAULT_REPORT_PROPS = {
    type: '',
    startDate: null,
    endDate: null
}
export function ReportComponent() {

    const [reportData, setReportData] = useState(MOCK_DATA);
    const [reportProperties, setReportProperties] = useState(DEFAULT_REPORT_PROPS);
    const [errors, setErrors] = useState(new Set());

    const updateProperties = (prop) => {
        console.log(prop)
        setReportProperties(prop);
    }
    const validate = function(properties) {
        const start = properties.startDate;
        const type = properties.type;
        const end = properties.endDate;

        const newErrors = new Set();
        console.log('validate')
        console.log(properties)
        if (!start) {
            newErrors.add('start')
        }
        if (!end) {
            newErrors.add('end')
        }
        if (type==="") {
            newErrors.add('type')
        }
        if (start && start > new Date()) {
            newErrors.add('start-overflow')
        }
        if (end && end > new Date()) {
            newErrors.add('end-overflow')
        }
        if (start > end) {
            newErrors.add('order')
        }
        setErrors(newErrors)
        return newErrors.size===0;
    }
    const createReport = () => {
        validate(reportProperties);
    }
    return (
        <main>
            <h1 className={"reports-top"}>Reports</h1>
            <ReportsControl initial={reportProperties} onUpdate={updateProperties} errors={errors} onCreate={createReport} />
            <ReportsTable displayData={reportData} />
        </main>
    )
}