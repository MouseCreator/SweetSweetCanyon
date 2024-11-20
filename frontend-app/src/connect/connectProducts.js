import { ST } from "./secret"
import axios from "axios";

import {doGet, onError} from "./connectCommons";
export async function getAllProducts() {
    return doGet(`${ST.HOST_URL}/products`);
}
export async function getProductById(id) {
    return axios.get(`${ST.HOST_URL}/products/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => { return onError(error) });
}
export async function postProduct(product) {
    const requestBody = {
        name: product.name,
        description: product.description,
        price: product.price,
        deliveryPrice: product.deliveryPrice,
        pictureUrl: product.pictureUrl
    }
    console.log(`${ST.HOST_URL}/products`);
    return axios.post(`${ST.HOST_URL}/products`, requestBody)
        .then(response => {
            return response.data;
        })
        .catch(error => { return onError(error) });
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
    return axios.put(`${ST.HOST_URL}/products`, requestBody)
        .then(response => {
            return response.data;
        })
        .catch(error => { return onError(error) });
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
    return axios.delete(`${ST.HOST_URL}/products/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => { return onError(error) });
}
