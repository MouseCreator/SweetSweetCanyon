
import {OnlyFor} from "./Only";
import {useHighLevel} from "../context/HighLevelAuthContext";

export function AdminOnly({children}, showError= true) {
    const { role } = useHighLevel();
    return (<OnlyFor allowed={role} showError={showError} children={children} />)
}