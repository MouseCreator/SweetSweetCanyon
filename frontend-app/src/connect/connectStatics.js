import {doGet, transformEach} from "./connectCommons";
import {ST} from "./secret";

function transformSupplier(sfs) {
    return { id: sfs.id, title: sfs.name }
}
export async function getAllSuppliers() {
    const data = await doGet(`${ST.HOST_URL}/suppliers`)
    return transformEach(data, transformSupplier);
}

export async function getAllLossReasons() {
    return await doGet(`${ST.HOST_URL}/reasons`);
}