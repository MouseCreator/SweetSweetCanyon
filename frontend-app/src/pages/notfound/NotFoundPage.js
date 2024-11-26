import MainLayout from "../../components/layout/Layout";
import {GlobalError} from "../../components/common/errors/GlobalError";

export function NotFoundPage() {
    return (
        <MainLayout>
            <GlobalError text={"404. Page not found"} />
        </MainLayout>
    )
}