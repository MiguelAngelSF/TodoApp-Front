import { createContext, useContext, useState, useEffect } from "react";
import { registerPost, loginPost, verityTokenRequet } from "../server/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("Error in useAuth working")
    }
    return context;
}
export const AuthProvider = ({children}) => {
    const [ user, setUser ] = useState(null);
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ errors, setErrors ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    
    const signup = async (user) => {
        try {
            const res = await registerPost(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data)
        }
    };

    const signin = async (user) => {
        try {
          const res = await loginPost(user);
          console.log(res)
          setIsAuthenticated(true);
          setUser(res.data);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message])
        }
    };

    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    }

    useEffect(() => {
        if (errors.length > 0) {
            const time = setTimeout(() => {
                setErrors([])
            }, 2000)
            return () => clearTimeout(time)
        } 
    }, [errors])

    useEffect(() => {
        async function checkLogin () {
            const cookies = Cookies.get();

            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            } 

               try {
                const res = await verityTokenRequet(cookies.token)
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false);
               }
            
        }
        checkLogin();
    }, []);
    

    return (
        <AuthContext.Provider 
            value={{
                signup,
                signin,
                logout,
                user,
                isAuthenticated,
                errors,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};