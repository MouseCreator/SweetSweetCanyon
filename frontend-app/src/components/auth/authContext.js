import {createContext, useContext, useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
const RoleAwareContext = createContext();
export const RoleAwareProvider = ({ children }) => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [shop, setShop] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const updateToken = async () => {
            if (isAuthenticated) {
                const t = await getAccessTokenSilently();
                setToken(t);
            }
        };


        updateToken();
    }, [getAccessTokenSilently, isAuthenticated, token]);

    const withSub = () => user?.sub;
    const withShop = () => shop;
    const withToken = () => { return token };

    return (
        <RoleAwareContext.Provider value={{ withSub, withShop, withToken }}>
            {children}
        </RoleAwareContext.Provider>
    );
};

export const useRoleAware = () => useContext(RoleAwareContext);