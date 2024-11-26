
import {RestrictedPage} from "./RestrictedPage";
import {useHighLevel} from "../context/HighLevelAuthContext";

export function OnlyFor({showError= true, children}) {
    const {role} = useHighLevel()
    if (role === 'cashier') {
        return children
    }
    else if (showError) {
        return(<RestrictedPage />)
    }
    return (<div></div>)
}