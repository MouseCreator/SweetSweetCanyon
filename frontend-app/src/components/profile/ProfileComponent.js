import {ProfileForm} from "./ProfileForm";
import React, {useEffect, useState} from "react";
import {getAllShops} from "../../connect/connectShops";
import {assignUserRole} from "../auth/connect/authUtils";
import {useHighLevel} from "../auth/context/HighLevelAuthContext";
import {getUserInfo, onDeleteUser, updateUserInfo} from "../../connect/connectUser";
import {useNavigate} from "react-router-dom";
import {GlobalLoading} from "../common/loading/GlobalLoading";
import {usePopup} from "../common/popup/PopupContext";
import {useAuth0} from "@auth0/auth0-react";
import DeleteProductOverlay from "../products/desc/DeleteProductOverlay";
import {OverlayBase} from "../overlay/OverlayBase";
import ProfileOverlay from "./ProfileOverlay";

export function ProfileComponent() {
    const [initialData, setInitialData] = useState(null)
    const navigate = useNavigate()
    const [shopList, setShopList] = useState([])
    const { token, subject, role, setShop, setRole } = useHighLevel()
    const { logout } = useAuth0()
    const [loading, setLoading] = useState(true)
    const { invokePopup } = usePopup()
    const { loginWithRedirect } = useAuth0()
    const [ overlayActive, setOverlayActive ] = useState(false)
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
    const onDelete = () => {
        setOverlayActive(false)
        logout().then(()=>{
            onDeleteUser(token);
            navigate("/")
        })

    }
    const onCloseOverlay = () => {
        setOverlayActive(false);
    }
    const deleteButtonPressed = () => {
        setOverlayActive(true)
    }
    if (loading) {
        return <GlobalLoading />
    }

    return (
        <div>
            <ProfileForm onSubmit={onSubmit} initialData={initialData} onDelete={deleteButtonPressed} shopList={shopList} onCancel={onCancel} />
            <OverlayBase isActive={overlayActive} onClose={onCloseOverlay}>
                <ProfileOverlay onDelete={onDelete} onCancel={onCloseOverlay}/>
            </OverlayBase>
        </div>)
}