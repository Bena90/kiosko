import Image from 'next/image'
import {formatMoney} from '../helpers/index'
import useKiosko from '../hooks/useKiosko'

const Product = ({product}) => {
    const {name, image, price} = product;
    const {handleSelectProduct, handleChangeModal} = useKiosko();
  return (
    <div className="border p-3 m-auto">
        <div className="flex flex-col justify-center m-auto ">
            <Image
                width={400}
                height={500}
                src={`/assets/img/${image}.jpg`}
                alt={`image_${name}`}
            />
            <div className='p-5'>
                <h3 className='text-2xl font-bold'>
                    {name}
                </h3>
                <p className='mt-5 font-black text-4xl text-amber-500'>
                    {formatMoney(price)}
                </p>
                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold rounded-md"
                    onClick={()=> {
                        handleSelectProduct (product)
                        handleChangeModal()
                    }}
                >
                    Agregar
                </button>
            </div>
        </div>
    </div>
  )
}

export default Product