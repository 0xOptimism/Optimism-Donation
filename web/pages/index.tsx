import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Flex } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Flex justify={'flex-end'}>
        <ConnectButton />
      </Flex>
    </div>
  )
}

export default Home
