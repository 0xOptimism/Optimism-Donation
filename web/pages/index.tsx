import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Flex } from '@chakra-ui/react'
import { useContract, useSigner, useAccount } from 'wagmi'
import { abi } from '../abi.json'


const Home: NextPage = () => {
  const { data: signer, isError, isLoading } = useSigner()
  const { data: account } = useAccount()
  const contract = useContract({
    addressOrName: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    contractInterface: abi,
    signerOrProvider: signer,
  })

  const initializeProxy = async () => {
    console.log(await contract)
    if (account) {
      await contract.initialize(account?.address);
    }
  }
  return (
    <div className={styles.container}>
      <Flex justify={'flex-end'}>
        <ConnectButton />
        <button onClick={initializeProxy}>Initializer</button>
      </Flex>
    </div>
  )
}

export default Home
