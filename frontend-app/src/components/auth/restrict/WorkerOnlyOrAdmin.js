import {useHighLevel} from "../context/HighLevelAuthContext";
import {OnlyFor} from "./Only";

export function WorkerOnlyOrAdmin(shopId, {children}, showError= true) {
    const {role, shop} = useHighLevel()
    const allow = (role==='cashier' && shop === shopId) || role === 'admin'
    return (<OnlyFor allowed={allow} showError={showError} children={children} />)
}