import { ST } from "./secret"
import axios from "axios";

import {doDelete, doGet, doPost, doPut, onError} from "./connectCommons";
export async function getAllProducts() {
    return doGet(`${ST.HOST_URL}/products`);
}
export async function getProductById(id) {
    return doGet(`${ST.HOST_URL}/products/${id}`)
}
export async function postProduct(product) {
    const requestBody = {
        name: product.name,
        description: product.description,
        price: product.price,
        deliveryPrice: product.deliveryPrice,
        pictureUrl: product.pictureUrl
    }
    return doPost(`${ST.HOST_URL}/products`, requestBody);
}
export async function updateProduct(product) {
    const requestBody = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        deliveryPrice: product.deliveryPrice,
        pictureUrl: product.pictureUrl
    }
    return doPut(`${ST.HOST_URL}/products`, requestBody);
}
export async function getProductsByName(name) {
    return axios.get(`${ST.HOST_URL}/products/search`, {
        params: {
            name: name
        }
        })
        .then(response => {
            return response.data;
        })
        .catch(error => { return onError(error) });
}

export async function deleteProductById(id) {
    return doDelete(`${ST.HOST_URL}/products/${id}`);
}
