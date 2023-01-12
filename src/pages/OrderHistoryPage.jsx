
import { useEffect } from 'react'
import axios from 'axios'
import useStore from '../context/StoreProvider'
import { toast } from 'react-toastify'
import getError from '../utils/getError'
import { useReducer } from 'react'
import formatFecha from '../utils/formatFecha'
import { Link } from 'react-router-dom'
import Spinner from '../component/Spinner'

const reducer = (state, action) => {
    switch (action.type) {
        case 'fetch request':
            return {...state, loading:true}

        case 'fetch success':
            return { ...state, loading:false, orders: action.payload }

        case 'fail request':
            return {...state, loading:false}

        default:
            return state
    }
}

const OrderHistoryPage = () => {

    const { state } = useStore()
    const { userInfo } = state

    const [{ orders, loading }, dispatch] = useReducer(reducer, {})

    // console.log(userInfo)

    //este sirve para hacer fetch a las ordenes del usuario
    useEffect(() => {
        const fetchOrderHistory = async () => {

            try {
                dispatch({type:'fetch request'})
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
                const url = `${import.meta.env.VITE_API_BASE_URL}/orders/mine`

                const { data } = await axios.get(url, config)

                dispatch({ type: 'fetch success', payload: data })
                console.log(data)
            } catch (error) {
                dispatch({type:'fail request'})
                toast.error(getError(error))
            }

        }

        fetchOrderHistory()

    }, [])

    return (

        <div>
            <h2>Order History</h2>

            {loading && <Spinner />}

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">DATE</th>
                        <th scope="col">TOTAL</th>
                        <th scope="col">PAID</th>
                        <th scope="col">DELIVERED</th>
                        <th scope="col">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders?.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>$ {order.totalOrder}</td>
                                <td>
                                    {order.isPaid ? order.paidAt.substring(0, 10) : 'No'}
                                </td>
                                <td> {order.isDelivered ? order.isDelivered.substring(0, 10) : 'No'}</td>
                                <td>
                                    <Link to={`/order/${order._id}`}>Details</Link>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>

    )
}

export default OrderHistoryPage