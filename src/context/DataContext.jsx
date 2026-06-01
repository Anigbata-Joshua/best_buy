import { createContext, useEffect, useState } from "react";

export const DataContent = createContext();

function DataProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user_data = localStorage.getItem("merchant_info");
        if (user_data) {
            setUser(JSON.parse(user_data));
        }
        setLoading(false);
    }, []);

    // Extract the merchantId safely using optional chaining
    const merchantId = user?.id || null;

    return (
        <DataContent.Provider value={{ user, setUser, loading, merchantId }}>
            {children}
        </DataContent.Provider>
    );
}

export default DataProvider;