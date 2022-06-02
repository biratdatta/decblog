import { Toaster } from 'react-hot-toast'
import './App.css'
import { CHAIN_DICT } from './common/constant'
import { useMetamask } from './context/metamask.context'

function App() {
  const {
    isWalletConnected,
    walletAddress,
    connectMetamask,
    connectWalletconnect,
    chain,
    changeChain,
    balance,
    signMessage,
  } = useMetamask()

  return (
    <>
      {' '}
      <div className='flex items-center justify-center h-screen'>
        {isWalletConnected && walletAddress && chain ? (
          <>
            <h1>
              Wallet Address: {walletAddress} <br /> Current Chain:{' '}
              {CHAIN_DICT[chain as keyof typeof CHAIN_DICT]} <br />
              Balance: {balance} <br />
              <select
                onChange={(e) => {
                  changeChain(
                    Object.keys(CHAIN_DICT)[e.target.options.selectedIndex]
                  )
                }}
              >
                {Object.keys(CHAIN_DICT).map((chainId: string) => {
                  return (
                    <option key={chainId}>
                      {CHAIN_DICT[parseInt(chainId) as keyof typeof CHAIN_DICT]}
                    </option>
                  )
                })}
              </select>
              <button
                className='px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent"'
                onClick={() => signMessage()}
              >
                Sign Message
              </button>
            </h1>
          </>
        ) : (
          <>
            <button
              className='px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent"'
              onClick={() => connectMetamask()}
            >
              Connect using Metamask
            </button>
            <button
              className='px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent"'
              onClick={() => connectWalletconnect()}
            >
              Connect using Wallet Connect
            </button>
          </>
        )}
      </div>
      <Toaster />
    </>
  )
}

export default App
