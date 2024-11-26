
import {OnlyFor} from "./Only";
import {useHighLevel} from "../context/HighLevelAuthContext";

export function CashierOnly({children}, showError= true) {
    const {role} = useHighLevel()
    return (<OnlyFor allowed={role==='cashier'} showError={showError} children={children} />)
}