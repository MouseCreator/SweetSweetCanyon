import {doDelete, doGet, doPost, doPut, transformSingle, transformEach, sortEach} from "./connectCommons";
import {ST} from './secret'

function transformShop(shopFromServer) {
    return {
        id: shopFromServer.id,
        name: shopFromServer.name,
        description: shopFromServer.description,
        address: shopFromServer.address,
        workingHours: shopFromServer.hours,
        pictureUrl: shopFromServer.pictureUrl
    }
}

export async function getShopById(id) {
    const data = await doGet(`${ST.HOST_URL}/shops/${id}`);
    return transformSingle(data, transformShop);
}
export async function getAllShops() {
    const data = await doGet(`${ST.HOST_URL}/shops`);
    const transformed = transformEach(data, transformShop);
    return sortEach(transformed, (a, b) => a.id - b.id)
}

export async function postShop(shop, authToken) {
    const requestBody = {
        name: shop.name,
        description: shop.description,
        address: shop.address,
        hours: shop.workingHours,
        pictureUrl: shop.pictureUrl
    }
    const data = await doPost(`${ST.HOST_URL}/shops`, requestBody, authToken);
    return transformSingle(data, transformShop);
}
export async function updateShop(shop, authToken) {
    const requestBody = {
        id: shop.id,
        name: shop.name,
        description: shop.description,
        address: shop.address,
        hours: shop.workingHours,
        pictureUrl: shop.pictureUrl
    }
    const data = await doPut(`${ST.HOST_URL}/shops`, requestBody, authToken);
    return transformSingle(data, transformShop);
}
export async function deleteShopById(id, authToken) {
    return await doDelete(`${ST.HOST_URL}/shops/${id}`, authToken);
}