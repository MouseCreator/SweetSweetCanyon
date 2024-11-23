import axios from "axios";
import {ST} from "./secret";
export const isNetworkError = (error) => {
    return !error.response && Boolean(error.request);
};
export function onError(error) {
    if (isNetworkError(error)) {
        return {
            success: false,
            error: "A Network error occurred.",
            data: null
        }
    }
    return {
        success: false,
        error: `${error.response?.data?.error || "An error occurred."}`,
        data: error.response?.data?.data
    }
}

export async function doPost(url, requestBody) {
    return axios.post(url, requestBody)
        .then(response => {
            return response.data;
        })
        .catch(error => { return onError(error) });
}
export async function doPut(url, requestBody) {
    return axios.put(url, requestBody)
        .then(response => {
            return response.data;
        })
        .catch(error => { return onError(error) });
}
export async function doGet(url, params={}) {
    return axios.get(url, {
        params: params
    })
        .then(response => {
            return response.data;
        })
        .catch(error => { return onError(error) });
}
export async function doDelete(url) {
    return axios.delete(url)
        .then(response => {
            return response.data;
        })
        .catch(error => { return onError(error) });
}

export function transformSingle(response, mapper) {
    if (!response.success) {
        return response;
    }
    return {...response, data: mapper(response.data) }
}

export function transformEach(response, mapper) {
    if (!response.success) {
        return response;
    }
    return {...response, data: response.data.map((s) => mapper(s)) }
}