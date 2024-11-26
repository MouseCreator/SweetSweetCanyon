
import {OnlyFor} from "./Only";

export function NoneOnly({children}, showError= true) {
    return (<OnlyFor role={'none'} showError={showError} children={children} />)
}