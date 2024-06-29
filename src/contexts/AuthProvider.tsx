import { ReactNode, createContext, useReducer } from "react";

interface Props {
    children: ReactNode
}

export const AuthContext = createContext({} as {
    user: any,
    dispatchUser: any
})

const reducerUser = (state: any, action: any) => {
    switch (action.type) {
        case "login":
            return JSON.parse(localStorage.getItem('user') as string)
        case "logout":
            return localStorage.removeItem('user');
        default:
            return state;
    }
}

export const AuthProvider = (props: Props) => {
    const [user, dispatchUser] = useReducer(reducerUser, JSON.parse(localStorage.getItem('user') as string))
    return (
        <AuthContext.Provider value={{
            user,
            dispatchUser
        }}>
            {
                props.children
            }</AuthContext.Provider>
    )
}