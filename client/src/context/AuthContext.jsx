// import { useNavigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { getCurrentUser } from "../api/userApi"

export const INITIAL_USER = {
    id : "",
    name : "",
    username : "",
    email : "",
    imageUrl : "",
    bio : "", 
    token : ""
}

const userFromLocal = JSON.parse(localStorage.getItem('userInfo'))

const INITIAL_STATE = {
    user : userFromLocal === null ? INITIAL_USER : userFromLocal,
    isLoading : false,
    isAuthenticated : false,
    token : INITIAL_USER.token,
    setUser : () => {},
    setIsAuthenticated : () => {},
    checkAuthUser : async () => false
}

const AuthContext = createContext(INITIAL_STATE);

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }){
    // const navigate = useNavigate();
    const [ user, setUser ] = useState(INITIAL_USER);
    const [isAuthenticated, setIsAuthenticated ] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function checkAuthUser() {
        setIsLoading(true);
        try {
            const currentUser = await getCurrentUser(user, user.token);
            if (currentUser) {
                setUser({
                    id: currentUser.id,
                    name: currentUser.name,
                    username: currentUser.username,
                    email: currentUser.email,
                    imageUrl: currentUser.imageUrl,
                    bio: currentUser.bio
                });
                JSON.stringify(localStorage.setItem('userInfo', currentUser));
                setIsAuthenticated(true);
                return true;
            }

            return false;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setIsLoading(false);
        }
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