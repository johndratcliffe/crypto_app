import { useState, useEffect, useCallback } from 'react'
import { fetchCryptoInfo } from '../api/fetchcryptoinfo'
import { fetchCryptoPriceHistory} from '../api/fetchcryptohistory'
import { useLocation } from 'react-router-dom'
import Graph from '../components/graph'

const MarketPage = () => {
  const location = useLocation()
  const [cryptoInfo, setCryptoInfo] = useState(null)
  const [priceHistory14Days, setPriceHistory14Days] = useState(null)
  const [priceHistory365Days, setPriceHistory365Days] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [coinID, setCoinID] = useState(location.state?.coin)
  const [timePeriod, setTimePeriod] = useState('1')
  const [dataType, setDataType] = useState('prices')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchDropDown, setSearchDropDown] = useState(false)
  const [timeDropDown, setTimeDropDown] = useState(false)
  const [typeDropDown, setTypeDropDown] = useState(false)

  const loadCryptoData = useCallback(() => {
    setLoading(true)
    setError(null)
    Promise.all([
      fetchCryptoPriceHistory(coinID, 14),
      fetchCryptoPriceHistory(coinID, 365),
      fetchCryptoInfo(coinID)
    ])
      .then(([data14Days, data365Days, cryptoInfo]) => {
        setCryptoInfo(cryptoInfo)
        setPriceHistory14Days(data14Days)
        setPriceHistory365Days(data365Days)
        setLoading(false)
      })
      .catch(() => {
        setError(`Failed to fetch crypto info for ${coinID}`)
        setLoading(false)
      })
  }, [coinID])

  useEffect(() => {
    loadCryptoData()
  }, [loadCryptoData])

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2 
    }).format(value)
  }

  const handleSearch = (event) => {
    if (!cryptoInfo) return

    const searchTerm = event.target.value
    setSearchTerm(event.target.value)

    if (searchTerm === '') {
      setSearchResults([])
      setSearchDropDown(false)
      return
    }

    const results = cryptoInfo.filter(coin =>
      coin.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (results.length === 0) {
      setSearchResults([])
      setSearchDropDown(false)
      return
    }

    setSearchResults(results)
    setSearchDropDown(true)
  }

  const handleSelectCoin = (coin) => {
    setCoinID(coin.id)
    setSearchTerm('')
    setSearchDropDown(false)
  }

  const getCoinInfo = (coinName) => {
    if (!cryptoInfo) return []
    return cryptoInfo
      .filter(coin => coin.id === coinName)
  }

  return (
    <div className='pt-20 min-h-svh'>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className='p-4 flex flex-col items-center'>
          <input
            type='text'
            value={searchTerm}
            onChange={handleSearch}
            placeholder='Search...'
            className='max-w-screen-md text-black text-xl rounded-xl w-full outline-0 px-6 py-4'
          />
          {searchDropDown && (
            <ul className='w-full max-w-screen-md max-h-96 overflow-y-auto bg-white text-black text-xl mt-2 rounded-xl p-2'>
              {searchResults.map(coin => (
                <li
                  key={coin.id}
                  onClick={() => handleSelectCoin(coin)}
                  className='cursor-pointer p-4 hover:bg-gray-200'
                >
                  {coin.name} ({coin.symbol.toUpperCase()})
                </li>
              ))}
            </ul>
          )}
          {getCoinInfo(coinID).map((coin) => (
            <div key={coin.id} className='mt-8 max-w-screen-md w-full'>
              <div className='flex items-center space-x-4'>
                <img className='w-14 h-14' src={coin.image} alt={coin.name}/>
                <p className='text-4xl font-bold'>{coin.name}</p>
                <p className='text-3xl text-gray-400 font-semibold'>{coin.symbol.toUpperCase()}</p>
                <p className='text-2xl font-medium bg-gradient-to-tr from-blue to-pink rounded-xl py-1 px-2'>#{coin.market_cap_rank}</p>
              </div>
              <div className='flex items-center space-x-4 mt-3'>
                <p className='text-5xl'>€{coin.current_price}</p>
                <p className={`text-3xl ${coin.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-700'}`}>{coin.price_change_percentage_24h.toFixed(2)}%</p>
              </div>
              <div className='bg-white w-full h-2 rounded mt-3'>
                <div className='bg-gradient-to-tr from-blue to-pink h-2 rounded' style={{width: `${coin.current_price > coin.high_24h ? '100' : (coin.current_price < coin.low_24h ? '0' : (coin.current_price - coin.low_24h)/(coin.high_24h - coin.low_24h)*100)}%`}}></div>
              </div>
              <div className='flex justify-between text-2xl mt-1'>
                <p>€{Math.min(coin.current_price, coin.low_24h)}</p>
                <p>24h Range</p>
                <p>€{Math.max(coin.current_price, coin.high_24h)}</p>
              </div>
            </div>
          ))}

          
          
          <div className='flex flex-col xl:flex-row-reverse xl:justify-center w-full'>
            <div className='text-xl mt-10 max-w-screen-md w-full self-center'>
              {getCoinInfo(coinID).map((coin) => (
                <p key={coin.id} className='mt-14 xl:m-0 text-lg text-gray-400 mb-2'>{coin.name} {dataType === 'prices' ? 'Price' : (dataType === 'market_caps' ? 'Market Cap' : 'Total Volume')} Chart ({coin.symbol.toUpperCase()})</p>
              ))}

              <div className='md:hidden text-2xl text-black pointer-cursor flex flex-col items-end'>
                <button className='bg-white px-6 py-2 rounded-lg' onClick={() => {
                  setTypeDropDown(!typeDropDown)
                  setTimeDropDown(false)
                }}>Data Type</button>
                {typeDropDown && 
                  <ul className='bg-white rounded-lg mt-2 w-fit'>
                    <li onClick={() => {
                      setDataType('prices')
                      setTypeDropDown(false)
                    }} className='hover:bg-gray-200 px-2 pt-2 pb-1 rounded-t-lg'>Price</li>
                    <li onClick={() => {
                      setDataType('market_caps')
                      setTypeDropDown(false)
                    }} className='hover:bg-gray-200 px-2 py-1'>Market Cap</li>
                    <li onClick={() => {
                      setDataType('total_volumes')
                      setTypeDropDown(false)
                    }} className='hover:bg-gray-200 px-2 pb-2 pt-1 rounded-b-lg'>Total Volume</li>
                  </ul>
                }
              </div>
              
              <div className='md:hidden text-2xl text-black pointer-cursor flex flex-col items-end mt-2'>
                <button className='bg-white px-6 py-2 rounded-lg' onClick={() => {
                  setTimeDropDown(!timeDropDown)
                  setTypeDropDown(false)
                }}>Time Period</button>
                {timeDropDown && 
                  <ul className='bg-white rounded-lg mt-2 w-fit'>
                    <li onClick={() => {
                      setTimePeriod('1')
                      setTimeDropDown(false)
                    }} className='hover:bg-gray-200 px-2 pt-2 pb-1 rounded-t-lg'>24 Hours</li>
                    <li onClick={() => {
                      setTimePeriod('7')
                      setTimeDropDown(false)
                    }} className='hover:bg-gray-200 px-2 py-1'>7 Days</li>
                    <li onClick={() => {
                      setTimePeriod('14')
                      setTimeDropDown(false)
                    }} className='hover:bg-gray-200 px-2 py-1'>2 Weeks</li>
                    <li onClick={() => {
                      setTimePeriod('30')
                      setTimeDropDown(false)
                    }} className='hover:bg-gray-200 px-2 py-1'>1 Month</li>
                    <li onClick={() => {
                      setTimePeriod('365')
                      setTimeDropDown(false)
                    }} className='hover:bg-gray-200 px-2 pb-2 pt-1 rounded-b-lg'>1 Year</li>
                  </ul>
                }
              </div>

              <div className='hidden md:flex flex-col items-end space-y-2 '>
                <div className='space-x-6'>
                  <button onClick={() => {setDataType('prices')}} className='hover:bg-gradient-to-tr from-blue to-pink bg-clip-text hover:text-transparent'>Price</button>
                  <button onClick={() => {setDataType('market_caps')}} className='hover:bg-gradient-to-tr from-blue to-pink bg-clip-text hover:text-transparent'>Market Cap</button>
                  <button onClick={() => {setDataType('total_volumes')}} className='hover:bg-gradient-to-tr from-blue to-pink bg-clip-text hover:text-transparent'>Total Volume</button>
                </div>
                <div className='space-x-6'>
                  <button onClick={() => {setTimePeriod('1')}} className='hover:bg-gradient-to-tr from-blue to-pink bg-clip-text hover:text-transparent'>24 Hours</button>
                  <button onClick={() => {setTimePeriod('7')}} className='hover:bg-gradient-to-tr from-blue to-pink bg-clip-text hover:text-transparent'>7 Days</button>
                  <button onClick={() => {setTimePeriod('14')}} className='hover:bg-gradient-to-tr from-blue to-pink bg-clip-text hover:text-transparent'>2 Weeks</button>
                  <button onClick={() => {setTimePeriod('30')}} className='hover:bg-gradient-to-tr from-blue to-pink bg-clip-text hover:text-transparent'>1 Month</button>
                  <button onClick={() => {setTimePeriod('365')}} className='hover:bg-gradient-to-tr from-blue to-pink bg-clip-text hover:text-transparent'>1 Year</button>
                </div>
              </div>

              <div className='h-96 text-xl mt-6 max-w-screen-md w-full self-center'>
                <Graph coinID={coinID} timePeriod={timePeriod} dataType={dataType} homePageGraph={false} priceHistory14Days={priceHistory14Days} priceHistory365Days={priceHistory365Days}/>
              </div>
              
            </div>

            {getCoinInfo(coinID).map((coin) => (
              <div key={coin.id} className='max-w-screen-md w-full self-center xl:self-start xl:max-w-screen-sm mt-14 mb-20 text-xl text-gray-400 xl:mt-10 xl:mr-10 space-y-4'>
                <h1 className='text-4xl font-bold text-white'>{coin.name} Statistics</h1>
                <p className='flex border-b'>Market Cap <span className='ml-auto text-white pl-2'>{formatNumber(coin.market_cap)}</span></p>
                <p className='flex border-b'>Fully Diluted Valuation <span className='ml-auto text-white pl-2'>{formatNumber(coin.fully_diluted_valuation)}</span></p>
                <p className='flex border-b'>24 Hour Trading Vol <span className='ml-auto text-white pl-2'>{formatNumber(coin.total_volume)}</span></p>
                <p className='flex border-b'>Circulating Supply <span className='ml-auto text-white pl-2'>{formatNumber(coin.circulating_supply)}</span></p>
                <p className='flex border-b'>Total Supply <span className='ml-auto text-white pl-2'>{formatNumber(coin.total_supply)}</span></p>
                <p className='flex border-b'>Max Supply <span className='ml-auto text-white pl-2'>{coin.max_supply === null ? '∞' : formatNumber(coin.max_supply)}</span></p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MarketPage