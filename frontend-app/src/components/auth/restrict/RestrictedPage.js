import {ViewMainPage} from "../../main/ViewMainPage";
import MainLayout from "../../layout/Layout";
import {Restricted} from "./Restricted";

export function RestrictedPage() {
 return (<MainLayout>
        <div className={'auth-err-page'}>
            <Restricted/>
        </div>
    </MainLayout>
     )
}