import MainLayout from "../../layout/Layout";
import {GlobalError} from "./GlobalError";

export function GlobalErrorPage({text}){
    return (
        <MainLayout>
            <GlobalError text={text} />
        </MainLayout>
    )
}