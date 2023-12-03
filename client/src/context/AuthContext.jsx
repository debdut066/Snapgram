import { useNavigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";

export const INITIAL_USER = {
    id : "",
    name : "",
    username : "",
    email : "",
    imageUrl : "",
    bio : "", 
    token : ""
}

const INITIAL_STATE = {
    user : INITIAL_USER,
    isLoading : false,
    isAuthenticated : false,
    setUser : () => {},
    setIsAuthenticated : () => {},
    checkAuthUser : async () => false
}

const AuthContext = createContext(INITIAL_STATE);

export function AuthProvider({ children }){
    const navigate = useNavigate();
    const [ user, setUser ] = useState(INITIAL_USER);
    const [isAuthenticated, setIsAuthenticated ] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const checkAuthUser = async () => {

    }

    const value = {
        user, 
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>   
}

export const useUserContext = () => useContext(AuthContext);