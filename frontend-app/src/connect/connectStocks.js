import {doGet, transformEach, transformSingle} from "./connectCommons";
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
    return transformEach(data, transformStock);
}