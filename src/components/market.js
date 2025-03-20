import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchCryptoInfo } from '../api/fetchcryptoinfo'

const Market = () => {
  const navigate = useNavigate()
  const [cryptoInfo, setCryptoInfo] = useState(null)
  const [loadingInfo, setLoadingInfo] = useState(true)
  const [errorInfo, setErrorInfo] = useState(null)
  const [currentTenCoins, setCurrentTentCoins] = useState(10)

  const loadCryptoInfo = useCallback(() => {
    setLoadingInfo(true)
    setErrorInfo(null)
    Promise.all([
      fetchCryptoInfo()
    ])
      .then(([cryptoInfo]) => {
        setCryptoInfo(cryptoInfo)
        setLoadingInfo(false)
      })
      .catch(() => {
        setErrorInfo('Failed to fetch crypto info')
        setLoadingInfo(false)
      })
  }, [])

  useEffect(() => {
    loadCryptoInfo()
  }, [loadCryptoInfo])

  const getTopCoins = (num) => {
    if (!cryptoInfo) return []
    if (num < 10) return cryptoInfo
      .sort((a, b) => b.market_cap - a.market_cap)
      .slice(0, num)
    return cryptoInfo
      .sort((a, b) => b.market_cap - a.market_cap)
      .slice(num - 10, num)
  }

  const goMarket = (coinID) => {
    navigate('/market', { state: { coin: coinID } })
  }

	return (
		<section id='market' className='pt-10 px-6 bg-dpurple scroll-mt-20 lg:flex lg:flex-col lg:items-center'>
      <h1 className='text-4xl font-bold mb-8'>Market Update</h1>
      {loadingInfo ? (
        <>Loading...</>
      ) : errorInfo ? (
        <>{errorInfo}</>
      ) : (
        <div className='overflow-auto h-[40rem] relative z-10 max-w-screen-lg'>
          <table className='text-right text-2xl w-full max-h-96 whitespace-nowrap'>
            <thead className='sticky top-0 bg-gradient-to-tr from-blue to-pink'>
              <tr>
                <th className='rounded-tl-lg text-left'>Rank</th>
                <th className='text-left'>Coin</th>
                <th>Price</th>
                <th>24h</th>
                <th>24h Volume</th>
                <th className='rounded-tr-lg'>Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {getTopCoins(currentTenCoins).map((coin) => (
                <tr onClick={() => goMarket(coin.id)} key={coin.id} className='cursor-pointer hover:bg-gradient-to-tr from-blue to-pink border-b'>
                  <td className='text-left'>
                    <span>#{coin.market_cap_rank}</span>
                  </td>
                  <td>
                    <div className='flex items-center'>
                    <img src={coin.image} alt={coin.name} className='w-12 h-12 mr-2' />
                    <span className='mr-10'>{coin.name}</span>
                    </div>
                  </td>
                  <td>€{coin.current_price.toFixed(2)}</td>
                  <td className={`${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td>€{(coin.total_volume / 1e9).toFixed(2)}B</td>
                  <td>€{(coin.market_cap / 1e9).toFixed(2)}B</td>
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