import React from 'react'
import { Toaster } from 'react-hot-toast'
import './App.css'
import { Chain } from './common/enums/chain.enum'
import { useMetamask } from './context/metamask.context'

function App() {
  const {
    isWalletConnected,
    walletAddress,
    checkIfWalletIsConnected,
    chain,
    changeChain,
  } = useMetamask()

  return (
    <>
      {' '}
      <div className='flex items-center justify-center h-screen'>
        {isWalletConnected && walletAddress && chain ? (
          <>
            <h1>
              Wallet Address: {walletAddress} <br /> Current Chain:{' '}
              {Chain[chain as string as keyof typeof Chain]} <br />
              <select
                onChange={(e) => {
                  changeChain(
                    Object.keys(Chain)[e.target.options.selectedIndex]
                  )
                }}
              >
                {Object.keys(Chain).map((chainId: string) => {
                  return (
                    <option key={chainId}>
                      {Chain[chainId as string as keyof typeof Chain]}
                    </option>
                  )
                })}
              </select>
            </h1>
          </>
        ) : (
          <button
            className='px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent"'
            onClick={() => checkIfWalletIsConnected()}
          >
            Connect Wallet
          </button>
        )}
      </div>
      <Toaster />
    </>
  )
}

export default App
