import {doGet, doPost, transformEach, transformSingle} from "./connectCommons";
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

function transformSupply(sfs) {
    return {
        id: sfs.id,
        type: sfs.type,
        date: sfs.date,
        products: sfs.products,
        cashier: sfs.username,
        price: sfs.price,
        supplierName: sfs.supplierName,
        supplier: {
            id: sfs.supplier.id,
            title: sfs.supplier.name
        }
    }
}

function transformLoss(sfs) {
    return {
        id: sfs.id,
        type: sfs.type,
        date: sfs.date,
        products: sfs.products,
        cashier: sfs.username,
        price: sfs.price,
        comment: sfs.comment,
        reason: {
            id: sfs.reason.id,
            title: sfs.reason.title
        }
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

export async function postSupply(supply) {
    const supplierId = supply.supplierId
    const supplierName = supply.supplierName
    const items = supply.items.map((pr)=> ({ productId: pr.product.id, amount: pr.amount} ))
    const body = {
        items: items,
        supplierId: supplierId,
        supplierName: supplierName
    }
    const data = await doPost(`${ST.HOST_URL}/supply`, body);
    return transformSingle(data, transformSupply);
}

export async function postLoss(loss) {
    const comment = loss.comment
    const reasonId = loss.reasonId
    const items = loss.items.map((pr)=> ({ productId: pr.product.id, amount: pr.amount} ))
    const body = {
        reasonId: reasonId,
        comment: comment,
        items: items
    }
    const data = await doPost(`${ST.HOST_URL}/loss`, body);
    return transformSingle(data, transformLoss);
}
export function toRequestParams(params) {
    return {
        type: params.type || "all",
        shopId: params.shopId === "all" || !params.shopId ? null : Number.parseInt(params.shopId),
        sort: params.sort,
        itemsPerPage: 20,
        currentPage: params.page
    }
}

function transformTransaction(tfs) {
    return {
        id: tfs.id,
        date: new Date(tfs.date),
        type: tfs.type,
        price: tfs.price,
        shop: tfs.shop
    }
}
export async function getTransactionList(params) {
    const request = toRequestParams(params)
    console.log('request')
    console.log(request)
    const data = await doGet(`${ST.HOST_URL}/transactions/search`, request)
    const transformed = transformEach(data, transformTransaction)
    console.log('response')
    console.log(transformed)
    return transformed
}
export async function getTransactionPages(params) {
    const request = toRequestParams(params)
    return await doGet(`${ST.HOST_URL}/transactions/pages`, request)
}