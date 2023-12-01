import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";


function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [userID, setUserID] = useState(localStorage.getItem('userID') || null);

    useEffect(() => {
        localStorage.setItem('token', token);
        localStorage.setItem('userID', userID);
    }, [token, userID])

    function logout(){
        setToken(null);
        setUserID(null);
    }
    

    return (
        <AuthContext.Provider value={{ token, setToken, userID, setUserID, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;