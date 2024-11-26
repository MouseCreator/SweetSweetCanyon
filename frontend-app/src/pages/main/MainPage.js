import MainLayout from "../../components/layout/Layout";
import {ViewMainPage} from "../../components/main/ViewMainPage";
import {assignUserRole} from "../../components/auth/connect/authUtils";
import {useRoleAware} from "../../components/auth/authContext";
import {useEffect, useState} from "react";

export function MainPage() {


    return (
    <MainLayout>
        <div>
            <ViewMainPage />
        </div>
    </MainLayout>
    )
}