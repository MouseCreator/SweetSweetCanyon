
import {OnlyFor} from "./Only";

export function AdminOnly({children}, showError= true) {
    return (<OnlyFor role={'admin'} showError={showError} children={children} />)
}