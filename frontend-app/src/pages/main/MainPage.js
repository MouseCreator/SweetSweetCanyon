import MainLayout from "../../components/layout/Layout";
import {ViewMainPage} from "../../components/main/ViewMainPage";
import {assignUserRole} from "../../components/auth/authUtils";
import {useRoleAware} from "../../components/auth/authContext";
import {useEffect, useState} from "react";

export function MainPage() {

    const [text, setText] = useState('text')
    const aware = useRoleAware()
    //getUserRoles(aware).then(t=>setText(t))
    useEffect(()=>{
        assignUserRole(aware, 'cashier')
    }, [aware])

    return (
    <MainLayout>
        <div>
            <p>{`${text}`}</p>
            <ViewMainPage />
        </div>
    </MainLayout>
    )
}