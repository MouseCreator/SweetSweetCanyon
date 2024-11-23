import {doPost, transformSingle} from "./connectCommons";
import {ST} from "./secret";
function transformSale(sfs) {
    return {
        id: sfs.id,
        type: sfs.type,
        date: sfs.date,
        products: sfs.products,
        cashier: sfs.username,
        price: sfs.price
    }
}
export async function postSale(sale) {
    const items = sale.map((pr)=> ({ productId: pr.product.id, amount: pr.amount} ))
    const body = {
        items: items
    }
    const data = await doPost(`${ST.HOST_URL}/sale`, body);
    return transformSingle(data, transformSale);
}