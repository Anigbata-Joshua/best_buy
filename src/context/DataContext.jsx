import { createContext, useEffect, useState } from "react";

export const DataContent = createContext();

function DataProvider({ children }) {
    const [user, setUser] = useState({});
    useEffect(() => {
        const user_data = localStorage.getItem("merchant_info")
        if (user_data) {
            setUser(JSON.parse(user_data))
        }
    }, []);
    
    return <DataContent.Provider value={{ user, setUser }}>{children}</DataContent.Provider>;
}

export default DataProvider;
