import axios from "axios";
import {doGet, doPost, doPut, onError} from "./connectCommons";
import {ST} from './secret'
export async function getAllShops() {
    return doGet(`${ST.HOST_URL}/shops`);
}
export async function getShopById(id) {
    return axios.get(`${ST.HOST_URL}/shops/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => { return onError(error) });
}
export async function postShop(shop) {
    const requestBody = {
        name: shop.name,
        description: shop.description,
        address: shop.address,
        hours: shop.hours,
        pictureUrl: shop.pictureUrl
    }
    return doPost(`${ST.HOST_URL}/shops`, requestBody);
}
export async function updateShop(shop) {
    const requestBody = {
        id: shop.id,
        name: shop.name,
        description: shop.description,
        address: shop.address,
        hours: shop.hours,
        pictureUrl: shop.pictureUrl
    }
    return doPut(`${ST.HOST_URL}/shops`, requestBody);
}