import React, { createContext, useContext, useEffect, useReducer } from "react";
import { usedItemsReducer } from "../reducers/UsedItemsReducer";

const UsedItemsContext = createContext(undefined);

const UsedItemsProvider = ({ children }) => {
    const [store, dispatch] = useReducer(usedItemsReducer, [], () => {
        const localData = localStorage.getItem("UsedItems");
        return localData ? JSON.parse(localData) : [];
    });

    const value = {
        store,
        dispatch
    }

    useEffect(() => {
        localStorage.setItem("UsedItems", JSON.stringify(store));
    }, [store]);

    return (
        <UsedItemsContext.Provider value={value}>
            { children }
        </UsedItemsContext.Provider>
    );
};

const useUsedItems = () => {
    const context = useContext(UsedItemsContext);
    if (context === undefined) {
        throw new Error('useUsedItems must be used within a Provider');
    }

    return context;
}

export { UsedItemsProvider, useUsedItems };
