import MainLayout from "../../components/layout/Layout";
import {ReportComponent} from "../../components/report/ReportComponent";
import {AdminOnly} from "../../components/auth/restrict/AdminOnly";

export function ReportsPage() {
    return (
        <AdminOnly>
            <MainLayout>
                <ReportComponent />
            </MainLayout>
        </AdminOnly>
    )
}