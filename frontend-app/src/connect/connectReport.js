import {doPost, transformSingle} from "./connectCommons";
import {ST} from "./secret";


const transformData = (data) => {
    console.log('data')
    console.log(data)
    const total = data.staticList.filter((s)=>s.total === true)
    const shopData = data.staticList.filter((s)=>s.total === false)
    return {
        requestType: data.requestType,
        total: {
            name: "Total",
            value: total.length === 1 ? total[0].value : 0,
            price: total.length === 1 ? total[0].price : 0
        },
        shops: shopData.map((s)=>{ return { name: s.shopName, value: s.value, price: s.price } }),
        graph: data.detailsList
    }
}
export async function getReport(reportRequest, authToken) {
    const data = await doPost(`${ST.HOST_URL}/report`, reportRequest, authToken)
    return transformSingle(data, transformData)
}