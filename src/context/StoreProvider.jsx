import { useContext } from "react";
import { createContext, useReducer } from "react";


const initialState = {
    cart: {
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        paymentMethod: localStorage.getItem('paymentMethod') ? localStorage.getItem('paymentMethod') : ''
    },

    userInfo:localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    
}

function reducer(state, action) {
    switch (action.type) {

        case 'add to cart': {
            //add to cart

            const exist = state.cart.cartItems.find((x) => x._id === action.payload._id)

            const cartUpdated = exist ? state.cart.cartItems.map((item) => (
                item._id === action.payload._id ? action.payload : item
            )) : [...state.cart.cartItems, action.payload]


            localStorage.setItem('cartItems', JSON.stringify(cartUpdated))
            return (
                { ...state, cart: { ...state.cart, cartItems: [...cartUpdated] } }
            )
        }

        case 'remove item cart':{
            // remove item from cart

            const cartUpdated = state.cart.cartItems.filter(p => p._id !== action.payload)

            localStorage.setItem('cartItems', JSON.stringify(cartUpdated))
            return (
                {...state ,cart:{...state.cart, cartItems:[... cartUpdated] }}
            )
        }

        //user log in
        case 'user signin':{
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
            return (
                {...state, userInfo:action.payload}
            )
        }

        //user log out
        case 'user signout':{
            return{
                ...state,
                userInfo:null,
                cart:{
                    cartItems:[],
                    shippingAddress:{},
                    paymentMethod:''
                }
            
            }
        }

        //shipping address
        case 'save shipping address':{
            localStorage.setItem('shippingAddress', JSON.stringify(action.payload))
            return (
                {
                    ...state,
                    cart:{
                        ...state.cart,
                        shippingAddress: action.payload
                    }
                }
            )
        }

        //save payment method
        case 'save payment method':{
            localStorage.setItem('paymentMethod', action.payload)
            console.log(action.payload)
            return (
                {
                    ...state,
                    cart:{
                        ...state.cart,
                        paymentMethod:action.payload
                    }
                }
            )
        }

        case 'cart clear':{
            return {...state, cart:{...state.cart, cartItems:[]}}
        }


        default: return state
    }

}


// el context

const StoreContext = createContext()

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