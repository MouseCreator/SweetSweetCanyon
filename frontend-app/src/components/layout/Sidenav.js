import {Link} from "react-router-dom";
import "./layout.css"
import {LogoImage} from "../../static_controls/Images";
import {useHighLevel} from "../auth/context/HighLevelAuthContext";
export function Sidenav({open, toggleOpen}) {
    const { role } = useHighLevel()


    return (
        <div className={`sidenav ${open ? 'open' : 'closed'}`}>
            <button className="toggle-btn" onClick={toggleOpen}>
                {open ? '←' : '→'}
            </button>
            <LogoImage />
            <div className={"nav-list-contents nav-link-wrap"}>
                <div className={"nav-category-space nav-link-wrap"}>
                    <Link to={"/"} className={"nav-link-module"}>🏠 Main page</Link>
                    {(role === "cashier" || role === "admin") &&
                        (
                            <div><Link to={"/"} className={"nav-link-module"}>👥 Profile</Link></div>
                        )
                    }
                </div>

                <p className={"nav-category"}>Information</p>
                <ul className={"nav-category-space nav-link-wrap"}>
                    <li><Link to={"/products"} className={"nav-link-module"}>🍰 Products</Link></li>
                    <li><Link to={"/shops"} className={"nav-link-module"}>🏪 Shops</Link></li>
                    {
                        (role === "cashier" || role === "admin") &&
                        (
                            <li><Link to={"/transactions"} className={"nav-link-module"}>🎟️ Transactions</Link></li>
                        )
                    }

                </ul>
                {role === "cashier" ?
                    (
                        <div>
                            <p className={"nav-category"}>Cashier's cabinet</p>
                            <ul className={"nav-category-space"}>
                                <li><Link to={"/sale"} className={"nav-link-module"}>🛍️ Sales</Link></li>
                                <li><Link to={"/supply"} className={"nav-link-module"}>🚚 Deliveries</Link></li>
                                <li><Link to={"/loss"} className={"nav-link-module"}>🔻 Losses</Link></li>
                            </ul>
                        </div>
                    ) : role === "admin" ? (
                        <div>
                            <p className={"nav-category"}>Admin cabinet</p>
                            <ul className={"nav-category-space"}>
                                <li><Link to={"/reports"} className={"nav-link-module"}>🖥️ Reports</Link></li>
                            </ul>
                        </div>
                    ) : (
                        <div>

                        </div>
                    )
                }
                {
                    role === "none" ?
                        (
                            <div>
                                <Link to={"/"} className={"nav-link-module"}>👉 Log in</Link>
                            </div>
                        ) : (
                            <div>
                                <Link to={"/"} className={"nav-link-module"}>❌ Log out</Link>
                            </div>
                        )
                }
            </div>
        </div>
    )
}