import MainLayout from "../../components/layout/Layout";
import {ViewMainPage} from "../../components/main/ViewMainPage";
import {useHighLevel} from "../../components/auth/context/HighLevelAuthContext";

export function MainPage() {
    return (
    <MainLayout>
        <div>
            <ViewMainPage />
        </div>
    </MainLayout>
    )
}