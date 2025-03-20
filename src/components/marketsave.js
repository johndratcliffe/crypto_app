import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Graph from './graph'

const Market = () => {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentTenCoins, setCurrentTentCoins] = useState(10)

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
		<section id='market' className='pt-10 px-6 bg-dpurple scroll-mt-20'>
      <h1 className='text-4xl font-bold mb-8'>Market Update</h1>
      {loading ? (
        <>Loading...</>
      ) : error ? (
        <>{error}</>
      ) : (
        <div className='overflow-auto h-[40rem] relative z-10'>
          <table className='text-right text-2xl w-full max-h-96'>
            <thead className='sticky top-0 bg-gradient-to-tr from-blue to-pink'>
              <tr>
                <th className='rounded-tl-lg text-left'>Rank</th>
                <th className='text-left'>Coin</th>
                <th>Price</th>
                <th>24h</th>
                <th>24h Volume</th>
                <th>Market Cap</th>
                <th className='rounded-tr-lg'>Last 7 Days</th>
              </tr>
            </thead>
            <tbody>
              {getTopCoins(currentTenCoins).map((coin) => (
                <tr onClick={() => goMarket(coin.id)} key={coin.id} className='cursor-pointer hover:bg-gradient-to-tr from-blue to-pink border-b'>
                  <td className='text-left'>
                    <span>#{coin.market_cap_rank}</span>
                  </td>
                  <td className='flex items-center h-full'>
                    <img src={coin.image} alt={coin.name} className='w-12 h-12 mr-2' />
                    <span>{coin.name}</span>
                  </td>
                  <td>€{coin.current_price.toFixed(2)}</td>
                  <td className={`${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td>€{(coin.total_volume / 1e9).toFixed(2)}B</td>
                  <td>€{(coin.market_cap / 1e9).toFixed(2)}B</td>
                  <td>
                    <div className='w-36 h-20'>
                      <Graph coinID={coin.id} timePeriod='1' dataType='prices' homePageGraph={true}/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className='flex justify-center space-x-2 mt-12'>
        <div className='bg-gradient-to-r from-blue to-pink w-fit p-0.5 rounded-full'>
          <button onClick={() => setCurrentTentCoins(10)} className={`bg-white text-black ${currentTenCoins === 10 ? 'bg-gradient-to-r text-white' : ''} px-4 py-2 rounded-full hover:text-white hover:bg-gradient-to-r from-blue to-pink`}>1</button>
        </div>
        <div className='bg-gradient-to-r from-blue to-pink w-fit p-0.5 rounded-full'>
          <button onClick={() => setCurrentTentCoins(20)} className={`bg-white text-black ${currentTenCoins === 20 ? 'bg-gradient-to-r text-white' : ''} px-4 py-2 rounded-full hover:text-white hover:bg-gradient-to-r from-blue to-pink`}>2</button>
        </div>
        <div className='bg-gradient-to-r from-blue to-pink w-fit p-0.5 rounded-full'>
          <button onClick={() => setCurrentTentCoins(30)} className={`bg-white text-black ${currentTenCoins === 30 ? 'bg-gradient-to-r text-white' : ''} px-4 py-2 rounded-full hover:text-white hover:bg-gradient-to-r from-blue to-pink`}>3</button>
        </div>
        <div className='bg-gradient-to-r from-blue to-pink w-fit p-0.5 rounded-full'>
          <button onClick={() => setCurrentTentCoins(40)} className={`bg-white text-black ${currentTenCoins === 40 ? 'bg-gradient-to-r text-white' : ''} px-4 py-2 rounded-full hover:text-white hover:bg-gradient-to-r from-blue to-pink`}>4</button>
        </div>
        <div className='bg-gradient-to-r from-blue to-pink w-fit p-0.5 rounded-full'>
          <button onClick={() => setCurrentTentCoins(50)} className={`bg-white text-black ${currentTenCoins === 50 ? 'bg-gradient-to-r text-white' : ''} px-4 py-2 rounded-full hover:text-white hover:bg-gradient-to-r from-blue to-pink`}>5</button>
        </div>
      </div>
    </section>
  )
}

export default Market