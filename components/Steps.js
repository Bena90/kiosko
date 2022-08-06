import { useRouter } from 'next/router';

const steps = [
    {step: 1, name: 'Menu', url:'/'},
    {step: 2, name: 'Carro de Compras', url:'/cart'},
    {step: 3, name: 'Datos y Total', url:'/total'},
]

const Steps = () => {
  const router = useRouter();
  const checkProgress = () => {
    let value
    if (router.pathname === '/') {
      value = 10;
    } else if (router.pathname === '/cart') {
      value = 50;
    }else {
      value = 100;
    }

    return value
  }

  return (
    <>
        <div className='flex justify-between'>
            {steps.map( step => (
              <button
                key={step.step}
                className=' text-2xl font-bold hover:text-amber-500'
                onClick={() => {
                  router.push(step.url)
                  }}>
                  {step.name}
              </button>
            ))}
        </div>
        <div className='bg-gray-200 my-5'>
          <div
            style={{width: `${checkProgress()}%`}}
            className='rounded-full bg-lime-400 text-xs leading-none h-2 text-center text-white w-20' >

          </div>
        </div>
    </>
  )
}

export default Steps;