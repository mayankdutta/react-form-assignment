/* eslint-disable react/prop-types */
import { createContext } from "react";

export const APIDataContext = createContext()

export const APIDataProvider = ({children}) => {
    const value = {}

    return (
        <APIDataContext.Provider value = {value}>
            {children}
        </APIDataContext.Provider>
    )
}