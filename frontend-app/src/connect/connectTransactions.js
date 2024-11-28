import {doGet, doPost, transformEach, transformSingle} from "./connectCommons";
import {ST} from "./secret";
function transformSale(sfs) {
    return {
        id: sfs.id,
        type: sfs.type,
        date: new Date(sfs.date),
        products: sfs.products,
        cashier: sfs.username,
        price: sfs.price,
        shop: {
            id: sfs.shop.id,
            name: sfs.shop.name
        }
    }
}

function transformSupply(sfs) {
    return {
        id: sfs.id,
        type: sfs.type,
        date: new Date(sfs.date),
        products: sfs.products,
        cashier: sfs.username,
        price: sfs.price,
        supplierName: sfs.supplierName,
        supplier: {
            id: sfs.supplier.id,
            title: sfs.supplier.name
        },
        shop: {
            id: sfs.shop.id,
            name: sfs.shop.name
        }
    }
}

function transformLoss(sfs) {
    return {
        id: sfs.id,
        type: sfs.type,
        date: new Date(sfs.date),
        products: sfs.products,
        cashier: sfs.username,
        price: sfs.price,
        comment: sfs.comment,
        reason: {
            id: sfs.reason.id,
            title: sfs.reason.title
        },
        shop: {
            id: sfs.shop.id,
            name: sfs.shop.name
        }
    }
}
function transformMove(sfs) {
    return {
        id: sfs.id,
        type: sfs.type,
        date: new Date(sfs.date),
        products: sfs.products,
        cashier: sfs.username,
        price: sfs.price,
        toShop: {
            id: sfs.toShop.id,
            name: sfs.toShop.name
        },
        shop: {
            id: sfs.shop.id,
            name: sfs.shop.name
        }
    }
}
export async function postSale(sale, authToken) {
    const items = sale.map((pr)=> ({ productId: pr.product.id, amount: pr.amount} ))
    const body = {
        items: items
    }
    const data = await doPost(`${ST.HOST_URL}/sale`, body, authToken);
    return transformSingle(data, transformSale);
}

export async function postSupply(supply, authToken) {
    const supplierId = supply.supplierId
    const supplierName = supply.supplierName
    const items = supply.items.map((pr)=> ({ productId: pr.product.id, amount: pr.amount} ))
    const body = {
        items: items,
        supplierId: supplierId,
        supplierName: supplierName
    }
    const data = await doPost(`${ST.HOST_URL}/supply`, body, authToken);
    return transformSingle(data, transformSupply);
}

export async function postLoss(loss, authToken) {
    const comment = loss.comment
    const reasonId = loss.reasonId
    const items = loss.items.map((pr)=> ({ productId: pr.product.id, amount: pr.amount} ))
    const body = {
        reasonId: reasonId,
        comment: comment,
        items: items
    }
    const data = await doPost(`${ST.HOST_URL}/loss`, body, authToken);
    return transformSingle(data, transformLoss);
}
export function toRequestParams(params) {
    return {
        type: params.type || "all",
        shop: params.shop === "all" ? null : Number.parseInt(params.shop),
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
    console.log(request)
    const data = await doGet(`${ST.HOST_URL}/transactions/search`, request)
    return transformEach(data, transformTransaction)
}
export async function getTransactionPages(params) {
    const request = toRequestParams(params)
    return await doGet(`${ST.HOST_URL}/transactions/pages`, request)
}

export async function getSaleById(id) {
    const data = await doGet(`${ST.HOST_URL}/sale/${id}`)
    return transformSingle(data, transformSale)
}
export async function getMoveById(id) {
    const data = await doGet(`${ST.HOST_URL}/move/${id}`)
    return transformSingle(data, transformMove)
}
export async function getSupplyById(id) {
    const data = await doGet(`${ST.HOST_URL}/supply/${id}`)
    const get = transformSingle(data, transformSupply)
    console.log(get)
    return get
}
export async function getLossById(id) {
    const data = await doGet(`${ST.HOST_URL}/loss/${id}`)
    return transformSingle(data, transformLoss)
}