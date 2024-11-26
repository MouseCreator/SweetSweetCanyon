import {OnlyFor} from "./Only";
import {useHighLevel} from "../context/HighLevelAuthContext";

export function AuthOnly({children}, showError= true) {
    const {role} = useHighLevel()
    return (<OnlyFor allowed={role === 'cashier' || role === 'admin'} showError={showError} children={children} />)
}