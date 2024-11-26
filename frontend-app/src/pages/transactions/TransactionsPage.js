import MainLayout from "../../components/layout/Layout";
import TransactionsList from "../../components/transactions/TransactionsList";
import {AuthOnly} from "../../components/auth/restrict/AuthOnly";

function TransactionsPage() {
    return (
        <MainLayout>
            <AuthOnly>
                <TransactionsList />
            </AuthOnly>
        </MainLayout>
    )
}
export default TransactionsPage