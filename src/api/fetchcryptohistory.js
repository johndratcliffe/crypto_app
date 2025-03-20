export const fetchCryptoPriceHistory = (CoinID, days) => {
  return fetch(`https://api.coingecko.com/api/v3/coins/${CoinID}/market_chart?vs_currency=eur&days=${days}&x_cg_demo_api_key=CG-rxSR6b8tPCsWWJNSJhj8JiVw`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    })
    .catch(error => {
      console.error(`Error fetching price history for ${CoinID}:`, error)
      throw error
    })
}