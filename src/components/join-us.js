import bitcoinImg from '../media/bitcoin.png'
import ethereumImg from '../media/ethereum.png'

const JoinUs = () => {
	return (
    <section id='join' className='bg-dpurple text-center pt-20 px-8 scroll-mb-0 flex flex-col items-center'>
      <h1 className='font-bold text-7xl'>JOIN US VIA 
        <img className='animate-[bounce_2s_ease-in-out_infinite] w-14 h-14 float-left mr-6 hidden lg:block' src={bitcoinImg} alt='Bitcoin'/>
        <img className='animate-[bounce_2s_ease-in-out_infinite] w-14 h-14 float-right ml-6 hidden lg:block' src={ethereumImg} alt='Bitcoin'/>
      </h1>
      <h1 className='font-bold text-7xl text-transparent bg-clip-text bg-gradient-to-tr from-blue to-pink'>DISCORD</h1>
      <p className='text-xl mt-6'>Invest and manage all your crypto at one place.</p>
      <button className='text-xl mt-12 rounded-full py-4 px-8 bg-gradient-to-tr from-blue to-pink'>Join via Discord</button>
    </section>
  )
}

export default JoinUs