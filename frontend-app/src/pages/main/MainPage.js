import MainLayout from "../../components/layout/Layout";
import {ViewMainPage} from "../../components/main/ViewMainPage";
import { getUserRoles} from "../../components/auth/authUtils";
import {useRoleAware} from "../../components/auth/authContext";
import {useEffect, useState} from "react";

export function MainPage() {

    const [text, setText] = useState('text')
    const aware = useRoleAware()
    useEffect(()=>{
        getUserRoles(aware).then(t=>setText(t))
    }, [aware])

    //useEffect(()=>{
    //    assignUserRole(aware, 'cashier')
    //})

    return (
    <MainLayout>
        <div>
            <p>{`${text}`}</p>
            <ViewMainPage />
        </div>
    </MainLayout>
    )
}