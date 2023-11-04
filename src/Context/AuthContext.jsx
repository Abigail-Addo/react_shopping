import { createContext, useState } from "react"

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState([''])
    const [auth, setAuth] = useState(false)

    const login = (response) => {
        setCurrentUser(response)
    }

    const logout = () => {
        setCurrentUser(null)
    }

    const info = {
        auth,
        setAuth,
        currentUser,
        setCurrentUser,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    )
}

