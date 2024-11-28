import DatePicker from "react-datepicker";
import "./../../static_controls/inputs.css"
import "react-datepicker/dist/react-datepicker.css";
import {useState} from "react";
import "./reports.css"
export function ReportsControl({initial, onUpdate, errors, onCreate}) {
    const [startDate, setStartDate] = useState(initial.startDate);
    const [endDate, setEndDate] = useState(initial.endDate);
    const [type, setType] = useState(initial.type);

    const dateFormat = "dd.MM.yyyy";
    const placeholder = "DD.MM.YYYY";

    const handleStartDateChange = (date) => {
        setStartDate(date);
        onUpdate({ ...initial, startDate: date });
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        onUpdate({ ...initial, endDate: date });
    };

    const handleSelectChange = (val) => {
        setType(val);
        onUpdate({ ...initial, type: val });
    }

    return (
        <div>

            <div className={"report-controls"}>
                <div>
                    <p>Start date</p>
                    <DatePicker
                        dateFormat={dateFormat}
                        placeholderText={placeholder}
                        className={`gen-input ${ errors.has('start') && 'gen-error' }`}
                        selected={startDate}
                        onChange={handleStartDateChange}
                    />
                </div>
                <div>
                    <p>End date</p>
                    <DatePicker
                        dateFormat={dateFormat}
                        placeholderText={placeholder}
                        className={`gen-input ${ errors.has('end') && 'gen-error' }`}
                        selected={endDate}
                        onChange={handleEndDateChange}
                    />
                </div>
                <div>
                    <p>Report type</p>
                    <select className={`gen-input ${ errors.has('type') && 'gen-error' }`} value={type} onChange={(e)=>handleSelectChange(e.target.value)}>
                        <option value={''}>-----</option>
                        <option value={"sale"}>Sales</option>
                        <option value={"supply"}>Supply</option>
                        <option value={"loss"}>Loss</option>
                        <option value={"revenue"}>Revenue</option>
                    </select>
                </div>
                <button className={"gen-button pink"} onClick={onCreate}>Create report</button>
            </div>
            <div className={"report-errors-pan"}>
                { errors.has('start-overflow') && <p>Start date out of bounds.</p> }
                { errors.has('end-overflow') && <p>End date out of bounds.</p> }
                { errors.has('order') && <p>Start date must be prior end date.</p> }
            </div>
        </div>
    );
}