import {ProfileComponent} from "../../components/profile/ProfileComponent";
import {useAuth0} from "@auth0/auth0-react";
import {OnlyFor} from "../../components/auth/restrict/Only";
import MainLayout from "../../components/layout/Layout";

export function ProfilePage() {
    const { isAuthenticated } = useAuth0()
    return (<OnlyFor allowed={isAuthenticated} showError={true}>
        <MainLayout>
            <ProfileComponent />
        </MainLayout>
    </OnlyFor>)
}