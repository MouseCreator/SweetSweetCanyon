
import {OnlyFor} from "./Only";

export function CashierOnly({children}, showError= true) {
    return (<OnlyFor role={'cashier'} showError={showError} children={children} />)
}