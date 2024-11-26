
import {OnlyFor} from "./Only";
import {useHighLevel} from "../context/HighLevelAuthContext";

export function NoneOnly({children}, showError= true) {
    const {role} = useHighLevel()
    return (<OnlyFor role={role==='none'} showError={showError} children={children} />)
}