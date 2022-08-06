import Image from 'next/image'
import useKiosko from '../hooks/useKiosko'

const Category = ({category}) => {
    const {currentCategory, handleClickCategory} = useKiosko()
    const {name, icon, id } = category
  return (
    <div onClick={()=> handleClickCategory(id)} className={`${currentCategory?.id === id ? 'bg-amber-200' : ''} hover:cursor-pointer flex items-center gap-4 w-full border p-4 hover:bg-amber-400`}> 
        <Image
            height={50}
            width={50}
            src={`/assets/img/icono_${icon}.svg`}
            alt='iconImg'
        />
        <button
            type="button"
            className='text-2xl font-bold'
            
        >
            {name}
        </button>
    </div>
  )
}

export default Category