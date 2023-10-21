import { Models } from 'appwrite';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { logIn, verifySession, VerifySessionOptions, deleteCurrentSession, getCurrentSession } from '@/lib/auth';

interface LiveBeatAuthContext {
    session?: Models.Session;
    logIn: Function;
    logOut: Function;
    verifySession: Function;
}

export const AuthContext = createContext<LiveBeatAuthContext | undefined>(undefined);

interface AuthProviderProps {
    children?: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
const auth = useAuthState();
    return (
    <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
)
}

export function useAuthState() {
    const[session, setSession] = useState<Models.Session>();

    useEffect(()=> {
        (async function run() {
         const data = await getCurrentSession();
         setSession(await data.session);
        })();
     },[])

     async function logOut(){
        await deleteCurrentSession();
        setSession(undefined);
     }

    async function verifySessionAndSave(options: VerifySessionOptions) {
        const data = await verifySession(options);
        setSession(data);
    }

    return {
        session, 
        logIn,
        logOut,
        verifySession: verifySessionAndSave
    }
}

export function useAuth() {
    const auth = useContext(AuthContext);
    if(!auth) {
        throw new Error('useAuth cannot be used outside of AuthContext')
    }
    return auth;
}