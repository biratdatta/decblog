import { createContext, Context, useState, useContext, useEffect } from 'react'
import { Chain } from '../common/enums/chain.enum'
import { errorHandler } from '../utils/error.handler'

interface AppContextInterface {
  isWalletConnected: boolean
  walletAddress: string | null
  checkIfWalletIsConnected: Function
  chain: Chain | null
  changeChain: Function
}

const MetamaskContext: Context<AppContextInterface | null> =
  createContext<AppContextInterface | null>(null)

interface Props {
  children: any
}

export const MetaMaskProvider = ({ children }: Props) => {
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [chain, setChain] = useState<Chain | null>(null)

  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })

        const chain: Chain = await window.ethereum.request({
          method: 'eth_chainId',
        })

        const account = accounts[0]
        setIsWalletConnected(true)

        setWalletAddress(account)
        setChain(chain)

        window.ethereum.on('accountsChanged', handleAccountsChanged)
        window.ethereum.on('chainChanged', handleChainChanged)
      } else {
        console.log('No Metamask detected')
      }
    } catch (error: any) {
      if (error?.code === -32002) {
        errorHandler('Please navigate to metamask.')
      }
      // console.log(error)
    }
  }

  const handleAccountsChanged = (accounts: any) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.')
      setIsWalletConnected(false)
      setWalletAddress(null)
      setChain(null)
    } else if (accounts[0] !== walletAddress) {
      setIsWalletConnected(true)
      setWalletAddress(accounts[0])
      // Do any other work!
    }
  }

  const handleChainChanged = async (chainId: Chain) => {
    setChain(chainId)
  }

  const changeChain = async (chainId: Chain) => {
    try {
      const chain = await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      })

      setChain(chain)
    } catch (error: any) {
      if (error?.code === 4902) {
        errorHandler('Please add chain in metamask.')
      }
    }
  }

  return (
    <MetamaskContext.Provider
      value={{
        isWalletConnected,
        walletAddress,
        checkIfWalletIsConnected,
        chain,
        changeChain,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  )
}

export function useMetamask() {
  const metamaskContext = useContext(MetamaskContext)

  if (!metamaskContext) {
    throw new Error(
      'Component must be enclosed by MetamaskProvider to be able to use MetamaskContext'
    )
  }

  return metamaskContext
}
