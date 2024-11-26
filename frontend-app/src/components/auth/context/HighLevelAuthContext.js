import {useAuth0} from "@auth0/auth0-react";
import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {getUserRole} from "../connect/authUtils";
import {getWorksAt} from "../connect/connectWorksAt";

const queryClient = new QueryClient();

const HighLevelAuthContext = createContext(null);

export function HighLevelAuthProvider({ children }) {
    const [ contentLoads, setContentLoads ] = useState(true);
    const [ error, setError ] = useState(null)
    const [shop, setShop] = useState(null)
    const [role, setRole] = useState('none')

    const { isLoading: authLoading, getAccessTokenSilently, user } = useAuth0();
    const subject = user?.sub;


    const { data: token, error: tokenError, isLoading: tokenLoading } = useQuery(
        'token',
        async () => await getAccessTokenSilently(),
        { enabled: !!user }
    );

    const { error: roleError, isLoading: roleLoading } = useQuery(
        ['role', token, subject],
        async () => {
            const d = await getUserRole(token, subject)
            setRole(d)
        },
        { enabled: !!token && !!subject }
    );

    const { error: shopError, isLoading: shopLoading } = useQuery(
        ['shop', token, subject],
        async () => {
            const d = await getWorksAt(token, subject)
            setShop(d)
        },
        { enabled: !!token && !!subject }
    );

    useEffect(() => {
        const loading = authLoading || tokenLoading || roleLoading || shopLoading;
        setContentLoads(loading);
    }, [authLoading, tokenLoading, roleLoading, shopLoading]);

    // Aggregate error state
    useEffect(() => {
        const allErrors = [tokenError, roleError, shopError].filter(Boolean);
        setError(allErrors.length ? allErrors.map(e => e.message || e).join(' | ') : null);
    }, [tokenError, roleError, shopError]);
    return (
        <HighLevelAuthContext.Provider value={{ contentLoads, role: role, shop: shop, error, subject, token, setShop, setRole  }}>
            {children}
        </HighLevelAuthContext.Provider>
    );
}
export const useHighLevel = () => useContext(HighLevelAuthContext);
export function MainContext({children}) {
    return (
        <QueryClientProvider client={queryClient}>
            <HighLevelAuthProvider>
                {children}
            </HighLevelAuthProvider>
        </QueryClientProvider>
    )
}