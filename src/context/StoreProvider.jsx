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

            const newItem = action.payload;

            const existItem = state.cart.cartItems.find(
                (item) => item._id === newItem._id
            );

            const cartItems = existItem
                ? state.cart.cartItems.map((item) =>
                    item._id === existItem._id ? newItem : item
                )
                : [...state.cart.cartItems, newItem];

            return (
                { ...state, cart: { ...state.cart, cartItems } }
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