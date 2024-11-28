/*
<div className={"trc-table"}>
    <div className={"trc-row"}>
        <div className={"trc-td htop"}>Product</div>
        <div className={"trc-td htop"}>Price</div>
        <div className={"trc-td htop"}>Amount</div>
    </div>
    {
        item.products.map((p, index)=>
            (
                <div className={"trc-row"} key={index}>
                    <div className={"trc-td"}>{p.name}</div>
                    <div className={"trc-td"}>{formatPrice(p.price)}</div>
                    <div className={"trc-td"}>{p.amount}</div>
                </div>
            )
        )
    }
</div>
 */

import {formatPrice} from "../../utils/date";
import CustomizableGraph from "./ReportChart";

function ReportStatement({highlight, data}) {
    return (
        <div className={"trc-row"}>
            <div className={`trc-td ${ highlight && 'hlt'}`}>{data.name}</div>
            <div className={`trc-td ${ highlight && 'hlt'}`}>{formatPrice(data.price)}</div>
            <div className={`trc-td ${ highlight && 'hlt'}`}>{data.value}</div>
        </div>
    )
}
export function ReportsTable({displayData}) {
    return (
        <div className={"report-wrap"}>
        {
            displayData === null ?
            (
            <div>
                No data
            </div>
            )
            :
            (
                <div>
            <div className={"trc-table"}>
                <div className={"trc-row"}>
                    <div className={`trc-td htop`}>Shop</div>
                    <div className={`trc-td htop`}>Price</div>
                    <div className={`trc-td htop`}>Amount</div>
                </div>
                {
                    displayData.shops.map((s, index) => (
                        <ReportStatement key={index} highlight={false} data={s} />
                    ))
                }
                <ReportStatement highlight={true} data={displayData.total} />
                </div>
                    <CustomizableGraph data={displayData.graph} color="pink" numDivisions={15} />
                </div>
            )
        }
        </div>
    )
}