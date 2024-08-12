import AuthContext from "../context/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from '../config/supabaseClient';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // On mount, subscribe to auth state change
    useEffect(() => {
        const session = supabase.auth.session();
        setUser(session?.user || null);

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => {
            authListener?.unsubscribe();
        };
    }, []);

    // Auth functions
    const signUp = (email, password) => {
        return supabase.auth.signUp({ email, password });
    };
    
    const signIn = (email, password) => {
        return supabase.auth.signIn({ email, password });
    };
    
    const logOut = () => {
        return supabase.auth.signOut();
    };
    
    const resetPassword = (email) => {
        return supabase.auth.api.resetPasswordForEmail(email);
    };
    
    const googleSignIn = () => {
        return supabase.auth.signIn({ provider: 'google' });
    };

    const value = {
        user,
        setUser,
        signUp,
        signIn,
        logOut,
        resetPassword,
        googleSignIn,
    };
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
