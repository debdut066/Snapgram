// import { useNavigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { getCurrentUser } from "../api/userApi"

// const INITIAL_USER = {
//     id : "",
//     name : "",
//     username : "",
//     email : "",
//     imageUrl : "",
//     bio : "", 
// }

const userFromLocal = JSON.parse(localStorage.getItem('userInfo'))

const INITIAL_STATE = {
    user : userFromLocal === null ? null : userFromLocal,
    isLoading : false,
    isAuthenticated : userFromLocal === null ? false : true,
    token : userFromLocal === null ? null : userFromLocal.token,
    saveUser : () => {},
    setIsAuthenticated : () => {},
    checkAuthUser : async () => false,
}

const AuthContext = createContext(INITIAL_STATE);

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }){
    // const navigate = useNavigate();
    const [ user, setUser ] = useState(null);
    const [isAuthenticated, setIsAuthenticated ] = useState(userFromLocal === null ? false : true);
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

    const saveUser = (data) => {
        setUser(data);
        let stringifiedUser = JSON.stringify(data);
        localStorage.setItem('userInfo', stringifiedUser)
    }

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false);
        localStorage.removeItem("userInfo")
    }

    const value = {
        user, 
        saveUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>   
}

export const UserContext = () => useContext(AuthContext);