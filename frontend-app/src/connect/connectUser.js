import {doDelete, doGet, doPut} from "./connectCommons";
import {ST} from "./secret";

export async function getUserInfo(authToken) {
    return await doGet(`${ST.HOST_URL}/users`, {}, authToken)
}
export async function onDeleteUser(authToken) {
    return await doDelete(`${ST.HOST_URL}/auth/delete`, authToken)
}
export async function updateUserInfo(updateData, authToken) {
    return await doPut(`${ST.HOST_URL}/users`, updateData, authToken)
}