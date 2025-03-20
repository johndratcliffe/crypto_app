import ChooseMainImg from '../media/choose-main.png'

const ChooseUs = () => {
	return (
    <section id='choose-us' className='p-4 bg-dpurple scroll-mt-10'>
      <h1 className='text-7xl font-bold text-center flex flex-col mt-14 mb-24'>WHY <span className='font-bold text-transparent bg-clip-text bg-gradient-to-tr from-blue to-pink'>CHOOSE US</span></h1>
      <div className='flex flex-col items-center space-y-8 lg:flex-row lg:space-y-0 lg:space-x-6 justify-center'>
        <div className='flex flex-col space-y-8'>
          <div className='flex justify-center border border-white border-opacity-20 bg-purple w-full p-6 space-x-8 rounded-3xl'>
            <svg viewBox='0 0 26 26' className='p-2 rounded-xl bg-gradient-to-tr from-blue to-pink min-w-14 h-14' xmlns='http://www.w3.org/2000/svg'>
              <g transform='translate(2, 2)'>
                <path d='M 3 5 L 3 16 C 3 17 4 18 5 18 L 18 18 C 19 18 20 17 20 16 L 20 8 C 20 7 19 6 18 6 L 6 6 C 5 6 5 5 6 5 L 17 5 C 18 5 18 3 17 3 L 5 3 C 4 3 3 4 3 5' fill='white'/>
                <circle cx='17' cy='12' r='1' fill='black'/>
              </g>
            </svg>
            <div className='space-y-2'>
              <h3 className='text-3xl font-bold'>CONNECT YOUR WALLET</h3>
              <p className='font-semibold'>Use Trust Wallet, Metamask or connect to the app.</p>
            </div>
          </div>
          <div className='flex justify-center border border-white border-opacity-20 bg-purple w-full p-6 space-x-8 rounded-3xl'>
            <svg viewBox='0 0 40 40' className='p-2 rounded-xl bg-gradient-to-r from-blue to-pink min-w-14 h-14' xmlns='http://www.w3.org/2000/svg'>
              <g transform='translate(4, 4)'>
                <path fill='white' d='M11,1H9C7.3,1,6,2.3,6,4v1h4c0.6,0,1,0.4,1,1s-0.4,1-1,1H6v3h3c0.6,0,1,0.4,1,1s-0.4,1-1,1H6v3h4c0.6,0,1,0.4,1,1  s-0.4,1-1,1H6v3h3c0.6,0,1,0.4,1,1s-0.4,1-1,1H6v3h4c0.6,0,1,0.4,1,1s-0.4,1-1,1H6v1c0,1.7,1.3,3,3,3h2c1.7,0,3-1.3,3-3V4  C14,2.3,12.7,1,11,1z'/>
                <path fill='white' d='M26,6V4c0-1.7-1.3-3-3-3h-2c-1.7,0-3,1.3-3,3v2H26z'/>
                <path fill='white' d='M18,8v18c0,0.2,0.1,0.4,0.2,0.6l3,4c0.2,0.3,0.5,0.4,0.8,0.4s0.6-0.1,0.8-0.4l3-4c0.1-0.2,0.2-0.4,0.2-0.6V8H18z'/>
              </g>
            </svg>
            <div className='space-y-2'>
              <h3 className='text-3xl font-bold'>SELECT YOUR QUANTITY</h3>
              <p className='font-semibold'>Upload your crypto and set a title, description and price.</p>
            </div>
          </div>
          <div className='flex justify-center border border-white border-opacity-20 bg-purple w-full p-6 space-x-8 rounded-3xl'>
            <svg viewBox='0 0 36 36' className='p-2 rounded-xl bg-gradient-to-r from-blue to-pink min-w-14 h-14' xmlns='http://www.w3.org/2000/svg'>
              <path transform='translate(2.5, 1.5)' d='M26.9,15.7C26.8,15.3,26.4,15,26,15h-6l3.9-11.7c0.1-0.4,0-0.9-0.4-1.1c-0.4-0.3-0.8-0.2-1.2,0l-17,13  c-0.3,0.3-0.5,0.7-0.3,1.1C5.2,16.7,5.6,17,6,17h6L8.1,28.7c-0.1,0.4,0,0.9,0.4,1.1C8.6,29.9,8.8,30,9,30c0.2,0,0.4-0.1,0.6-0.2  l17-13C26.9,16.5,27.1,16.1,26.9,15.7z' fill='white'/>
            </svg>
            <div className='space-y-2'>
              <h3 className='text-3xl font-bold'>CONFIRM TRANSACTION</h3>
              <p className='font-semibold'>Earn by selling your crypto on our marketplace.</p>
            </div>
          </div>
        </div>
        
        <img src={ChooseMainImg} alt='Choose Main' className='w-52 h-auto'/>
        <div className='flex flex-col space-y-8'>
          <div className='flex justify-center border border-white border-opacity-20 bg-purple w-full p-6 space-x-8 rounded-3xl'>
            <svg viewBox='0 0 50 50' className='p-2 rounded-xl bg-gradient-to-r from-blue to-pink min-w-14 h-14' xmlns='http://www.w3.org/2000/svg'>
              <g transform='translate(-12, -1)'>
                <path fill='white' d='M 42.094 25.503 l -4.6 5.5 l 0 0 l 8.277 8.067 c -5.3 5.3 -13.8 5.3 -19.1 0 s -5.3 -13.8 0 -19.1 l 8.422 8.593 l 5.255 -4.463 C 39.869 23.005 41.17 21.807 42.71 23.108 C 44.216 24.579 42.915 26.017 42.059 25.503'/>
                <g transform='translate(4, -2)'>
                  <path fill='white' d='M38.9,20.2v1.5c1.9,0,3.4,1.5,3.4,3.4l1.5,0C43.8,22.4,41.6,20.2,38.9,20.2z'/>
                  <path fill='white' d='M38.9,17v2c3.4,0,6.1,2.8,6.1,6.1l2,0C47,20.7,43.3,17,38.9,17z'/>
                  <path fill='white' d='M38.7,12.1v3.2c5.5,0,10,4.5,10,10l3.2,0C51.9,18,46,12.1,38.7,12.1z'/>
                </g>
              </g>
            </svg>
            <div className='space-y-2'>
              <h3 className='text-3xl font-bold'>RECEIVE YOUR OWN NFTs</h3>
              <p className='font-semibold'>Invest all your crypto at once place on one platform.</p>
            </div>
          </div>
          <div className='flex justify-center border border-white border-opacity-20 bg-purple w-full p-6 space-x-8 rounded-3xl'>
            <svg viewBox='0 0 40 40' className='p-2 rounded-xl bg-gradient-to-r from-blue to-pink min-w-14 h-14' xmlns='http://www.w3.org/2000/svg'>
              <g transform='translate(4, 2.5)'>
                <path d='M7.2,16l1.1-0.2c1.6-0.3,3.3-0.5,5-0.7c-2.4,2.3-3.9,5.3-4.7,7.9h14.7c0.4-1.5,1.1-3,2.3-4.1l0.2-0.2   c0.2-0.2,0.3-0.4,0.3-0.6C26.6,13,24.2,8,19.8,5.3c-0.8-1.4-2-2.4-3.6-2.9l-0.9-0.3C15,2,14.7,2,14.4,2.2C14.2,2.4,14,2.7,14,3v2.4   l-1.4,0.7C12.2,6.3,12,6.6,12,7v0.5l-4.7,3.1C6.5,11.1,6,12.1,6,13.1V15c0,0.3,0.1,0.6,0.4,0.8C6.6,16,6.9,16,7.2,16z' fill='white'/>
                <path d='M6.8,25C6.3,25.5,6,26.2,6,27v2c0,0.6,0.4,1,1,1h18c0.6,0,1-0.4,1-1v-2c0-0.8-0.3-1.5-0.8-2H6.8z' fill='white'/>
              </g>
            </svg>
            <div className='space-y-2'>
              <h3 className='text-3xl font-bold'>TAKE A MARKET TO SELL</h3>
              <p className='font-semibold'>Discover, collect the right crypto collections to buy or sell.</p>
            </div>
          </div>
          <div className='flex justify-center border border-white border-opacity-20 bg-purple w-full p-6 space-x-8 rounded-3xl'>
            <svg viewBox='0 0 35 35' className='p-2 rounded-xl bg-gradient-to-r from-blue to-pink min-w-14 h-14' xmlns='http://www.w3.org/2000/svg'>
              <path transform='translate(5, 5)' d='M17,20 L5,20 C4.45,20 4,19.55 4,19 L4,7 C4,6.45 3.55,6 3,6 C2.45,6 2,6.45 2,7 L2,20 C2,21.1 2.9,22 4,22 L17,22 C17.55,22 18,21.55 18,21 C18,20.45 17.55,20 17,20 Z M20,2 L8,2 C6.9,2 6,2.9 6,4 L6,16 C6,17.1 6.9,18 8,18 L20,18 C21.1,18 22,17.1 22,16 L22,4 C22,2.9 21.1,2 20,2 Z M20,12 L17.5,10.5 L15,12 L15,4 L20,4 L20,12 Z' fill='white'/>
            </svg>
            <div className='space-y-2'>
              <h3 className='text-3xl font-bold'>DRIVE YOUR COLLECTTION</h3>
              <p className='font-semibold'>We make it easier to Discover, Invest and Manage.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChooseUs