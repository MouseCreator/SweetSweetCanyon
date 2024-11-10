import React, { createContext, useContext, useState } from 'react';


const ShopContext = createContext(null);

export const ShopProvider = ({ children }) => {
   const [shopId, setShopId] = useState(null);
   const updateShop = (newShopId) => {
        setShopId(newShopId);
    };

    return (
        <ShopContext.Provider value={{ shopId, updateShop }}>
            {children}
        </ShopContext.Provider>
    );
};
export const useShop = () => useContext(ShopContext);
