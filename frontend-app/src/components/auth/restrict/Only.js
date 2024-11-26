import {useRoleAware} from "../authContext";
import {useEffect, useState} from "react";
import {getUserRole} from "../connect/authUtils";
import {RestrictedPage} from "./RestrictedPage";

export function OnlyFor({role, showError= true, children}) {
    const aware = useRoleAware()
    const [isCashier, setIsCashier] = useState('unknown')
    useEffect(()=>{
        getUserRole(aware).then((r)=>setIsCashier(r === role ? 'yes' : 'no'))
    })
    if (isCashier === 'yes') {
        return children
    }
    if (isCashier === 'no' && showError) {
        return(<RestrictedPage />)
    }
    return (<div></div>)
}