import { useContext } from "react";
import { createContext, useReducer } from "react";


const StoreContext = createContext()

const initialState = {
    cart: {
        cartItems: []
    }
}

function reducer(state, action) {
    switch (action.type) {
        case 'add to cart':
            //add to cart

            const exist = state.cart.cartItems.find((x) => x._id === action.payload._id)

            const cartUpdated = exist ? state.cart.cartItems.map((item) => (
                item._id === action.payload._id ? action.payload : item
            )): [...state.cart.cartItems , action.payload]
            
            return (
                { ...state, cart: { ...state.cart, cartItems:[...cartUpdated] } }
            )
        default: return state
    }

}

const StoreProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)


    return (
        <StoreContext.Provider
            value={{ state, dispatch }}
        >
            {children}
        </StoreContext.Provider>
    )
}

const useStore = () => {
    return useContext(StoreContext)
}
export default useStore

export { StoreProvider }