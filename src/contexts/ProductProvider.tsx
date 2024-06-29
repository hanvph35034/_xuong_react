import { ReactNode, createContext, useReducer } from "react";
import IProducts from "../interfaces/IProducts";

interface Props {
    children: ReactNode
}

export const ProductContext = createContext({} as {
    products: IProducts[],
    dispathProducts: any
})

const reducerPro = (state: any, action: any) => {
    switch (action.type) {
        case "SET_PRODUCT":
            return action.payload
        case "ADD_PRODUCT":
            return [...state, action.payload]
        case "DELETE_PRODUCT":
            return state.filter((item: IProducts) => item.id != action.payload);
        case "UPDATE_PRODUCT":
            return state.map((item: IProducts) => {
                if (item.id == action.payload.id)
                    return action.payload
                return item
            })
        default:
            break;
    }
}

export const ProductProvider = (props: Props) => {
    const [products, dispathProducts] = useReducer(reducerPro, [] as IProducts[])
    return (
        <ProductContext.Provider value={{
            products,
            dispathProducts
        }}>
            {
                props.children
            }</ProductContext.Provider>
    )
}