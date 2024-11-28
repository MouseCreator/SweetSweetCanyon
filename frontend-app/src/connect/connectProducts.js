import { ST } from "./secret"

import {doDelete, doGet, doPost, doPut} from "./connectCommons";
export async function getAllProducts() {
    return doGet(`${ST.HOST_URL}/products`);
}
export async function getProductById(id) {
    return doGet(`${ST.HOST_URL}/products/${id}`)
}
export async function postProduct(product, authToken) {
    const requestBody = {
        name: product.name,
        description: product.description,
        price: product.price,
        deliveryPrice: product.deliveryPrice,
        pictureUrl: product.pictureUrl
    }
    return doPost(`${ST.HOST_URL}/products`, requestBody, authToken);
}
export async function updateProduct(product, authToken) {
    const requestBody = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        deliveryPrice: product.deliveryPrice,
        pictureUrl: product.pictureUrl
    }
    return doPut(`${ST.HOST_URL}/products`, requestBody, authToken);
}

export async function deleteProductById(id, authToken) {
    return doDelete(`${ST.HOST_URL}/products/${id}`,  authToken);
}
