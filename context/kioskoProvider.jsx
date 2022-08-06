import { useState, useEffect, createContext} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export const KioskoContext = createContext ();


const KioskoProvider = ({children}) => {
    const [categories, setCategories] = useState ([]);
    const [currentCategory, setCurrentCategory] = useState ({});
    const [product, setProduct ] = useState ({});
    const [modal, setModal] = useState (false);
    const [order, setOrder] = useState ([]);
    const router = useRouter();
    const [orderName, setOrderName] = useState('');
    const [total, setTotal] = useState(0)

    const getCategories = async () => {
        const {data} = await axios('/api/categories')
        setCategories (data);
    }

    useEffect (() =>{
        getCategories();
    }, [])

    useEffect(()=>{
        const updateTotal = order.reduce((total, product) => (product.price * product.quantity) + total, 0)
        setTotal (updateTotal)
    }, [order])

    useEffect (() =>{
        setCurrentCategory (categories[0]);
    }, [categories])

    const handleClickCategory = (id) => {
        const category = categories.filter (cat => cat.id === id)
        setCurrentCategory(category[0]);
        router.push('/')
    }

    const handleSelectProduct = (productSelect) => {
        setProduct (productSelect)
    }

    const handleChangeModal = () => {
        setModal (prev => !prev)
    }

    const handleAddOrder = ({categoryId, ...product}) => {
        if(order.some(prodState => prodState.id === product.id)){
            let updateOrder = order.map(prodState => prodState.id === product.id ? product : prodState )
            setOrder (updateOrder)
            toast.success('Pedido actualizado')
        }else{
            setOrder (prev => [...prev, product])
            toast.success('Producto/s agregado/s')
        }
    }
    const handleChanceQuantity = (id) => {
        let updateProduct = order.filter(product => product.id === id)
        setProduct (updateProduct [0]);
        setModal (!modal)
    }

    const handleDelete = (id) => {
        let updateOrder = order.filter(product => product.id !== id)
        setOrder (updateOrder);
    }

    const handleSubmitOrder = async (e) =>{
        e.preventDefault();
        try {
            const {data} = await axios.post('/api/orders', {order, orderName, total, date: Date.now().toString()})
            console.log(data)
            setCurrentCategory(categories[0]);
            setOrder([]);
            setOrderName('');
            setTotal(0)
            toast.success('Pedido realizado correctamente')
            setTimeout(() =>{
                router.push('/')
            },1000)

        } catch (error) {
            console.log(error.response)
            toast.error('Hubo un error')
        }
    }

    return(
        <KioskoContext.Provider
            value={{
                categories,
                handleClickCategory, 
                currentCategory, 
                product, 
                setProduct, 
                handleSelectProduct, 
                handleChangeModal, 
                modal, 
                handleAddOrder, 
                order, 
                handleChanceQuantity, 
                handleDelete,
                orderName,
                setOrderName,
                handleSubmitOrder,
                total
            }}
        >
            {children}
        </KioskoContext.Provider>
    )
}

export default KioskoProvider