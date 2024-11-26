import MainLayout from "../../components/layout/Layout";
import {ViewMainPage} from "../../components/main/ViewMainPage";

export function MainPage() {
    return (
    <MainLayout>
        <div>
            <ViewMainPage />
        </div>
    </MainLayout>
    )
}