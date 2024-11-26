import "./layout.css"
import {Sidenav} from "./Sidenav";
import {SideContext} from "./SidenavContext";
import {useState} from "react";
export default function MainLayout({ children }) {
    const [open, setOpen] = useState(true);
    const toggleOpen = () => {
        setOpen(!open);
    }
    return (
        <SideContext.Provider value={open}>
            <Sidenav open={open} toggleOpen={toggleOpen} />
            <main className={`main-content ${open ? 'open' : 'collapsed'}`}>
                <div className={'main-tab'}>
                    {children}
                </div>
            </main>
        </SideContext.Provider>
    )
}