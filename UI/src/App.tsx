import './App.global.css'
import styles from './App.module.css'

import { Navigation } from './components/Navigation'
import { Display } from './components/Display'
import { MetaMaskError } from './components/MetaMaskError'
import { MetaMaskContextProvider, useMetaMask } from './hooks/useMetaMask'

export const App = () => {
  const { wallet, hasProvider } = useMetaMask()

  return (
    <MetaMaskContextProvider>
      <div className={styles.appContainer}>
        <Navigation />
        <Display />
        {/* <MetaMaskError /> */}
      </div>
    </MetaMaskContextProvider>
  )
}