
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import GradientBG from '../components/GradientBG.js';
import styles from '../styles/Home.module.css';
import MyForm from '@/components/Form';

export default function Home() {
  // useEffect(() => {
  //   (async () => {
  //     const { Mina, PublicKey } = await import('snarkyjs');
  //     // const { Add } = await import('../../../contracts/build/src/');

  //     // Update this to use the address (public key) for your zkApp account.
  //     // To try it out, you can try this address for an example "Add" smart contract that we've deployed to
  //     // Berkeley Testnet B62qkwohsqTBPsvhYE8cPZSpzJMgoKn4i1LQRuBAtVXWpaT4dgH6WoA.
  //     const zkAppAddress = '';
  //     // This should be removed once the zkAppAddress is updated.
  //     if (!zkAppAddress) {
  //       console.error(
  //         'The following error is caused because the zkAppAddress has an empty string as the public key. Update the zkAppAddress with the public key for your zkApp account, or try this address for an example "Add" smart contract that we deployed to Berkeley Testnet: B62qkwohsqTBPsvhYE8cPZSpzJMgoKn4i1LQRuBAtVXWpaT4dgH6WoA'
  //       );
  //     }
  //     //const zkApp = new Add(PublicKey.fromBase58(zkAppAddress))
  //   })();
  // }, []);

  return (
    <>
      <Head>
        <title>Poker ZK DApp</title>
        <meta name="description" content="Online Poker DApp which uses ZK proof" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <main className={`bg-black h-full w-full text-white bg-[url('/assets/poker-table.png')] bg-cover bg-center absolute`} >
        <MyForm/>
        </main>
    </>
  );
}
