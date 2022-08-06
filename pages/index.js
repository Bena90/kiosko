import Product from "../components/Product";
import useKiosko from "../hooks/useKiosko"
import Layout from "../layout/Layout"


export default function Home() {
  const {currentCategory} = useKiosko(); 

  return (
    <Layout page={`Menu ${currentCategory?.name}`}>
      <h1 className='text-4xl font-black'>{currentCategory?.name}</h1>
      <p className='text-2xl my-10'>
        Elige y personaliza tu pedido a continuación
      </p>
      <div
        className=' mx-auto grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {
          currentCategory?.product?.map(prod => (
            <Product key={prod.id} product={prod}/>
          ))
        }
      </div>
    </Layout>
    
  )
}

//import { PrismaClient } from '@prisma/client'
// export const getServerSideProps = async () => {
//   const prisma = new PrismaClient();
// 
//   const categories = await prisma.category.findMany();
// 
//   return {
//     props: {
//       categories,
//     }
//   }
// 
// }