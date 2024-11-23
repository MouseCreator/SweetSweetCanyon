import MainLayout from "../../layout/Layout";
import "./loading-page.css"
export function GlobalLoading() {
    return (<div className={"loading-page"}>
        <p className={"loading-text"}>Loading...</p>
    </div>)
}

export function GlobalLoadingPage() {
    return (
        <MainLayout>
            <GlobalLoading />
        </MainLayout>
    )
}