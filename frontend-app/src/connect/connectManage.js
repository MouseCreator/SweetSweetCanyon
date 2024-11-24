import { doPost} from "./connectCommons";
import {ST} from "./secret";

export async function postManage(shopId, items) {
    const list = items.map((t)=>{
        return {
            type:
                t.type === "movement" ? "move" :
                t.type === "lose" ? "loss" : t.type
            ,
            moveTo: t.shopId ?? null,
            productId: t.origin,
            amount: t.amount,
            reasonId: t.reasonId ?? null,
            comment: t.comment ?? null
        }
    })

    const body = {
        shopId: shopId,
        items: list
    }
    return await doPost(`${ST.HOST_URL}/manage`, body);
}