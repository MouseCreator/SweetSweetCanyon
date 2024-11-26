import axios from "axios";
export const isNetworkError = (error) => {
    return !error.response && Boolean(error.request);
};

export const getAuth = (accessToken) => {
    if (!accessToken) {
        return {}
    }
    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        }
    }
}
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

export function sortEach(response, comparator) {
    if (response.data && Array.isArray(response.data)) {
        response.data.sort(comparator);
    }
    return response;
}

export async function doPost(url, requestBody, accessToken=null) {
    const auth = getAuth(accessToken)
    return axios.post(url, requestBody, auth)
        .then(response => {
            return response.data;
        })
        .catch(error => { return onError(error) });
}
export async function doPut(url, requestBody, accessToken=null) {
    const auth = getAuth(accessToken)
    return axios.put(url, requestBody, auth)
        .then(response => {
            return response.data;
        })
        .catch(error => { return onError(error) });
}
export async function doGet(url, params={}, accessToken=null) {

    const headers = accessToken == null ? {} : {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
    }
    return axios.get(url, {
        params: params,
        headers: headers
    })
        .then(response => {
            return response.data;
        })
        .catch(error => { return onError(error) });
}
export async function doDelete(url, accessToken = null) {
    const auth = getAuth(accessToken)
    return axios.delete(url, auth)
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