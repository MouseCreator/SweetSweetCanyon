import {doGet, transformEach, sortEach} from "./connectCommons";
import {ST} from "./secret";

function transformStock(stockFromServer) {
    return {
        product: stockFromServer.product,
        remaining: stockFromServer.amount,
        shop: stockFromServer.shop
    }
}

export async function getStocksByShopId(id) {
    const data = await doGet(`${ST.HOST_URL}/stocks`, { shop: id });
    const transformed = transformEach(data, transformStock);
    return sortEach(transformed, (a, b) => a.product.id - b.product.id)
}