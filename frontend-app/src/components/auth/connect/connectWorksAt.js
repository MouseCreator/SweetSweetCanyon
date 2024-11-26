import axios from "axios";
import {ST} from "../../../connect/secret";

export async function getWorksAt(accessToken, userId) {
    if (!accessToken) {
        return null
    }
    if (!userId) {
        return null
    }

    const response = await axios.get(`${ST.HOST_URL}/works/shop`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const dat = response.data
    if (!dat.success) {
        return null
    }
    return dat.data.shop
}