import {useState} from "react";
import {ReportsControl} from "./ReportsControl";
import {ReportsTable} from "./ReportsTable";
import {getReport} from "../../connect/connectReport";

const DEFAULT_REPORT_PROPS = {
    type: '',
    startDate: null,
    endDate: null
}
export function ReportComponent() {

    const [reportData, setReportData] = useState(null);
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
    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }
    const createReport = () => {
        validate(reportProperties);
        const request = {
            startDate: formatDate(reportProperties.startDate),
            endDate: formatDate(reportProperties.endDate),
            type: reportProperties.type,
        }
        getReport(request).then((r) => {
            if (r.success) {
                console.log('report')
                console.log(r.data)
                setReportData(r.data)
            } else {
                const err = new Set()
                err.add('Server error: ' + r.error)
                setErrors(err)
            }
        }).catch((e)=>{
            const err = new Set()
            err.add(`Server error: ${e}`)
            setErrors(err)
        })
    }
    return (
        <main>
            <h1 className={"reports-top"}>Reports</h1>
            <ReportsControl initial={reportProperties} onUpdate={updateProperties} errors={errors} onCreate={createReport} />
            <ReportsTable displayData={reportData} />
        </main>
    )
}