import {createContext, useState} from 'react'

export const userContext = createContext()

export const UserProvider = (props) => {
    const [loggedInUser, setLoggedInUser] = useState({})


    return (
        <userContext.Provider value={{
            loggedInUser, 
            setLoggedInUser
        }}>

            {props.children}
        </userContext.Provider>
    )
}