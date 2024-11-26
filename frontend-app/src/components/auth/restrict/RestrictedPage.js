
import MainLayout from "../../layout/Layout";
import {Restricted} from "./Restricted";
import "./../auth.css"
export function RestrictedPage() {
 return (<MainLayout>
        <div className={'auth-err-page'}>
            <Restricted/>
        </div>
    </MainLayout>
     )
}