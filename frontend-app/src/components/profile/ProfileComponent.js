import {ProfileForm} from "./ProfileForm";
import {useEffect, useState} from "react";
import {getAllShops} from "../../connect/connectShops";
import {assignUserRole} from "../auth/connect/authUtils";
import {useHighLevel} from "../auth/context/HighLevelAuthContext";
import {getUserInfo, updateUserInfo} from "../../connect/connectUser";
import {useNavigate} from "react-router-dom";
import {GlobalLoading} from "../common/loading/GlobalLoading";
import {usePopup} from "../common/popup/PopupContext";
import {useAuth0} from "@auth0/auth0-react";

export function ProfileComponent() {
    const [initialData, setInitialData] = useState(null)
    const navigate = useNavigate()
    const [shopList, setShopList] = useState([])
    const { token, subject, role, setShop, setRole } = useHighLevel()
    const [loading, setLoading] = useState(true)
    const { invokePopup } = usePopup()
    const { loginWithRedirect } = useAuth0()
    useEffect(()=> {
        getAllShops().then((s)=>setShopList(s.data))
        getUserInfo(token).then((i)=>{
            let t = i.data
            t.role = role
            setInitialData(t);
            setLoading(false) }).catch(()=>loginWithRedirect())
    }, [token, role, loginWithRedirect])
    const onSubmit = (formData) => {

        assignUserRole(token, subject, formData.role)
        updateUserInfo(formData).then(()=> {
            setShop(formData.shopId)
            setRole(formData.role)

        }).then(() => invokePopup('Changes are saved!', 'green')).catch(()=>invokePopup('Error!', 'red'))
        navigate("/")

    }
    const onCancel = () => {
        navigate("/")
    }
    if (loading) {
        return <GlobalLoading />
    }

    return (<ProfileForm onSubmit={onSubmit} initialData={initialData} shopList={shopList} onCancel={onCancel} />)
}