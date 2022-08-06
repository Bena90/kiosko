import { useEffect, useCallback } from "react";
import useKiosko from "../hooks/useKiosko";
import Layout from "../layout/Layout";
import {useRouter} from 'next/router'
import { formatMoney } from "../helpers";

export default function Total () {
    const router = useRouter()
    const {order, orderName, setOrderName, handleSubmitOrder, total} = useKiosko ();

    const checkOrder = useCallback( () => {
        return order.length === 0 || orderName.length < 3
    }, [order, orderName])

    useEffect(() =>{
        checkOrder ()
    },[order, checkOrder])



    return (
        <Layout page={`Total`}>
            <h1 className="text-4xl font-black"> Total y confirmar pedido </h1>
            <p className="text-2xl my-10"> Confirma tu pedido:</p>

            <form onSubmit={handleSubmitOrder}>
                <div>
                    <label 
                        htmlFor="name"
                        className="block uppercase text-slate-800 font-bold text-xl"
                    >
                        Nombre
                    </label>
                    <input
                        id='name'
                        type="text"
                        className="bg-gray-100 w-full lg:w-1/3 mt-3 p-2 border-2 border-amber-300 rounded-md focus:outline-none focus:ring focus:ring-amber-200"
                        value={orderName}
                        onChange={(e)=>setOrderName(e.target.value)}
                    />
                </div>
                <div className="mt-10">
                    <p className="text-2xl">
                        Total a pagar:<span className='font-bold'> {formatMoney(total)}</span>
                    </p>
                </div>
                <div className="mt-5">
                    <input
                        type="submit"
                        value= 'Confirmar pedido'
                        className={`${checkOrder() ? 'bg-gray-300' : 'bg-lime-500 hover:bg-lime-600'} cursor-pointer w-full lg:w-auto py-2 px-5 rounded-md uppercase font-bold text-white text-center`}
                        disabled={checkOrder()}
                    />
                </div>
            </form>
            <div>
                <button
                    className="bg-amber-500 hover:bg-amber-600 text-white mt-5 p-2 uppercase font-bold rounded-md flex gap-2 "
                    onClick={()=> router.push('/cart')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                    Atrás
                </button>
            </div>
        </Layout>
    )
}