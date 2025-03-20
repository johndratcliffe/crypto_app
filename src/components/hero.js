import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import bitcoinImg from '../media/bitcoin.png'
import ethereumImg from '../media/ethereum.png'

const Hero = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false&x_cg_demo_api_key=CG-rxSR6b8tPCsWWJNSJhj8JiVw')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(error => {
        setError(error.message)
        setLoading(false)
      })
  }, [])

  const handleNavigation = () => {
		document.getElementById('market').scrollIntoView({
			behavior: 'smooth',
		})
	}

  const getTopCoins = (num) => {
    if (!data) return []
    if (num < 10) return data
      .sort((a, b) => b.market_cap - a.market_cap)
      .slice(0, num)
    return data
      .sort((a, b) => b.market_cap - a.market_cap)
      .slice(num - 10, num)
  }

  const goMarket = (coinID) => {
    navigate('/market', { state: { coin: coinID } })
  }

	return (
    <section id='hero' className='bg-gradient-to-b from-dblue to-dpurple h-screen justify-center lg:items-center flex flex-col text-center font-extrabold text-6xl'>
      <h1>TRACK AND TRADE
        <img className='animate-[bounce_2s_ease-in-out_infinite] w-14 h-14 float-left mr-6 hidden lg:block' src={bitcoinImg} alt='Bitcoin'/>
        <img className='animate-[bounce_2s_ease-in-out_infinite] w-14 h-14 float-right ml-6 hidden lg:block' src={ethereumImg} alt='Bitcoin'/>
      </h1>
      <h2 className='bg-gradient-to-b from-blue to-pink text-transparent bg-clip-text'>CRYPTO CURRENCIES</h2>
      <button onClick={handleNavigation} className='sm:hidden mt-8 inline-block mx-auto font-semibold text-3xl bg-gradient-to-tr from-blue to-pink rounded-full px-14 py-6 w-fit'>See Prices</button>
      {loading ? (
        <>Loading...</>
      ) : error ? (
        <>{error}</>
      ) : (
        <div className='hidden sm:flex sm:flex-wrap sm:justify-evenly max-w-screen-lg px-10 lg:px-0'>
          {getTopCoins(4).map((coin) => {
            return (
              <div onClick={() => goMarket(coin.id)} className='cursor-pointer text-2xl font-medium w-1/2 flex flex-col items-center pt-10 px-2 lg:px-7 md:w-fit' key={coin.id}>
                <img className='w-14 h-14' src={coin.image} alt={coin.name}/>
                <p>{coin.name} <span className={`${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>{coin.price_change_percentage_24h.toFixed(2)}%</span></p>
                <p>€{coin.current_price.toFixed(2)}</p>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default Hero