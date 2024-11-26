import {createContext, useContext, useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
const RoleAwareContext = createContext();
export const RoleAwareProvider = ({ children }) => {
    const { user, isAuthenticated, getIdTokenClaims, getAccessTokenSilently } = useAuth0();
    const [roles, setRoles] = useState([]);
    const [shop, setShop] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchRoles = async () => {
            if (isAuthenticated) {
                const t = await getAccessTokenSilently();
                console.log(`t ${t}`)
                setToken(t);
                try {
                    const claims = await getIdTokenClaims();
                    const userRoles = claims['https://your-app/roles'] || [];
                    setRoles(userRoles);
                } catch (error) {
                    console.error('Error fetching roles:', error);
                }
            }
        };

        fetchRoles();
    }, [getAccessTokenSilently, isAuthenticated, getIdTokenClaims]);

    const withRole = () => roles;
    const withSub = () => user?.sub;
    const withShop = () => shop;
    const withToken = () => token;

    return (
        <RoleAwareContext.Provider value={{ roles, withRole, withSub, withShop, withToken }}>
            {children}
        </RoleAwareContext.Provider>
    );
};

export const useRoleAware = () => useContext(RoleAwareContext);