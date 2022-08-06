import Layout from "../layout/Layout";
import useKiosko from "../hooks/useKiosko";
import { useRouter } from 'next/router';
import ProductCart from "../components/ProductCart";

export default function Cart () {
    const router = useRouter();
    const { order } = useKiosko ();

    return (
        <Layout page={`Cart`}>
            <h1 className="text-4xl font-black"> Cart </h1>
            <p className="text-2xl my-10"> Revisa tu carro de compras:</p>

            {order.length === 0 ? (
                <div>
                    <p className="text-2xl text-center">
                        El carro de compras está vacío...
                    </p>
                    <p>
                        <button></button>
                    </p>
                    <div className="flex justify-center">
                        <button
                            className="bg-indigo-600 hover:bg-indigo-800 text-white mt-5 p-3 uppercase font-bold rounded-md"
                            onClick={() =>router.push('/')}>
                            Ir a menú
                        </button>
                    </div>
                </div>
             ) : (
                 <>
                    {order.map (prod => <ProductCart key={prod.id} product={prod}/>)}
                    <div className="flex justify-between">
                        <button
                            className="bg-amber-500 hover:bg-amber-600 text-white mt-5 p-2 uppercase font-bold rounded-md flex gap-2 "
                            onClick={()=> router.push('/')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            </svg>
                            Atrás
                        </button>
                        <button
                            className="bg-amber-500 hover:bg-amber-600 text-white mt-5 p-2 uppercase font-bold rounded-md text-center flex gap-2 "
                            onClick={()=> router.push('/total')}>
                                Siguiente
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                </svg>
                        </button>
                    </div>
                </>
        )}
        </Layout>



    )
}