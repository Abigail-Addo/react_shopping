import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState([''])
    const [auth, setAuth] = useState(false)
    const [token, setToken] = useState([''])

    const login = (user) => {
        if (user.id) {
            const randomToken = Array.from({ length: 32 }, () =>
                Math.random().toString(36)[2]
            ).join('');
            setToken(randomToken);
            localStorage.setItem("token", randomToken);

            let User = JSON.stringify(user);
            
            setCurrentUser(User)
            setAuth(true)
            localStorage.setItem("user", User);
            return
        }
    }

    const logout = () => {
        setCurrentUser(null)
        setToken(null)
        setAuth(false)
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    useEffect(() => {
        const localToken = localStorage.getItem("token");
        if (localToken && localToken.length > 0) {
            setAuth(true);
        } else {
            setAuth(false);
            console.log("user not authenticated")
        }
    }, [currentUser, setToken]);

    const info = {
        auth,
        setAuth,
        currentUser,
        setCurrentUser,
        token,
        setToken,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    )
}

