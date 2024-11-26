
import {RestrictedPage} from "./RestrictedPage";
import {useHighLevel} from "../context/HighLevelAuthContext";
import {GlobalLoading} from "../../common/loading/GlobalLoading";
import {GlobalError} from "../../common/errors/GlobalError";

export function OnlyFor({allowed, showError= true, children}) {
    const { contentLoads, error } = useHighLevel()
    if (contentLoads) {
        return <GlobalLoading />
    }
    if (error) {
        return <GlobalError text={error} />
    }
    if (allowed) {
        return children
    }
    else if (showError) {
        return(<RestrictedPage />)
    }
    return (<div></div>)
}