import Image from 'next/image';
import useKiosko from '../hooks/useKiosko'
import { formatMoney } from '../helpers/index'
import { useState, useEffect } from 'react';

const ModalProduct = () => {
    const {product, handleChangeModal, handleAddOrder, order} = useKiosko();
    const [quantity, setQuantity] = useState(1);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if(order.some(orderState => orderState.id === product.id)) {
            let updateQuantity = order.find (orderState => orderState.id === product.id)
            setQuantity(updateQuantity.quantity)
            setEdit (true)
        }
    }, [product, order])

    return (
        <div className="md:flex gap-10">
            <div className="md:w1/3">
                <Image 
                    height={400}
                    width={300}
                    src={`/assets/img/${product.image}.jpg`}
                    alt={product.Image}
                />
            </div>
            <div className="md:w2/3">
                <div className='flex justify-end'>
                    <button onClick={()=> handleChangeModal()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <h1 className='text-3xl font-bold mt-5'> {product.name}</h1>

                <p className="mt-5 font-black text-5xl text-amber-500">
                    {formatMoney(product.price)}
                </p>
                <div className='flex gap-4 mt-5'>
                    <button
                        type='button'
                        onClick={()=>{
                            (quantity > 1) && setQuantity (prev => prev - 1)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <p className='text-3xl'>{quantity}</p>
                    <button
                        type='button'
                        onClick={()=>{
                            (quantity < 6) && setQuantity (prev => prev + 1)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
                    <button
                        type='button'
                        onClick={()=>{
                            handleAddOrder({...product, quantity})
                            handleChangeModal()
                        }}
                        className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded-md'
                    >
                        {edit ? 'Guardar cambios' : 'Añadir'}
                    </button>
            </div>
        </div>
    )
}

export default ModalProduct