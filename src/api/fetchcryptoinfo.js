export const fetchCryptoInfo = (CoinID) => {
  return fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false&x_cg_demo_api_key=CG-rxSR6b8tPCsWWJNSJhj8JiVw`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    })
    .catch(error => {
      console.error(`Error fetching info for ${CoinID}:`, error)
      throw error
    })
}