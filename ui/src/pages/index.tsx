
import Head from 'next/head';
import Image from 'next/image';
import { useEffect , useState } from 'react';
import styles from '../styles/Home.module.css';
import Seat from '@/components/Seat';
import Header from '@/components/Header';

import ZkappWorkerClient from './zkappWorkerClient';
import { PublicKey, Field } from 'snarkyjs';

export default function Home() {
  let [state, setState] = useState({
    zkappWorkerClient: null as null | ZkappWorkerClient,
    hasWallet: null as null | boolean,
    hasBeenSetup: false,
    accountExists: false,
    currentNum: null as null | Field,
    publicKey: null as null | PublicKey,
    zkappPublicKey: null as null | PublicKey,
    creatingTransaction: false,
  });

  function foo() {
    console.log('foo');
  }

  useEffect(() => {
    (async () => {
      if (!state.hasBeenSetup) {
        const zkappWorkerClient = new ZkappWorkerClient();
        console.log('Loading SnarkyJS...');
        await zkappWorkerClient.loadSnarkyJS();
        console.log('done');

        await zkappWorkerClient.setActiveInstanceToBerkeley();

        const mina = (window as any).mina;

        if (mina == null) {
          setState({ ...state, hasWallet: false });
          return;
        }
        const publicKeyBase58: string = (await mina.requestAccounts())[0];
        const publicKey = PublicKey.fromBase58(publicKeyBase58);

        console.log('using key', publicKey.toBase58());
          
      const { PublicKey } = await import('snarkyjs');
       console.log('checking if account exists...');
        const res = await zkappWorkerClient.fetchAccount({
          publicKey: publicKey!,
        });
        const accountExists = res.error == null;

        await zkappWorkerClient.loadContract();
        console.log('compiling zkApp');
        await zkappWorkerClient.compileContract();
        console.log('zkApp compiled');
        const zkappPublicKey = PublicKey.fromBase58(
          'B62qmhRvvHx8Pf4uZfDTUn966V8ZJSRx8MpTgaJydBAjzSasHm9u92J'
        );
        await zkappWorkerClient.initZkappInstance(zkappPublicKey);

        console.log('getting zkApp state...');
        await zkappWorkerClient.fetchAccount({ publicKey: zkappPublicKey });
        setState({
          ...state,
          zkappWorkerClient,
          hasWallet: true,
          hasBeenSetup: true,
          publicKey,
          zkappPublicKey,
          accountExists,
        });
      }
    })();
  }, []);
  
  useEffect(() => {
    (async () => {
      if (state.hasBeenSetup && !state.accountExists) {
        for (;;) {
          console.log('checking if account exists...');
          const res = await state.zkappWorkerClient!.fetchAccount({
            publicKey: state.publicKey!,
          });
          const accountExists = res.error == null;
          if (accountExists) {
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
        setState({ ...state, accountExists: true });
      }
    })();
  }, [state.hasBeenSetup]);

  return (
    <>
      <Head>
        <title>Poker ZK DApp</title>
        <meta name="description" content="Online Poker DApp which uses ZK proof" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <main className={`bg-gray-900 h-full w-full text-white bg-[url('/assets/poker-table.png')] bg-auto bg-center absolute px-10`} >
       <Header />
       <div className='py-20 px-10 flex justify-between relative'>
        <div className='absolute left-60'>
        <Seat id={1}  />
        </div>
        <div className='absolute right-60'>
        <Seat id={2}  />
        </div>
        <div className='absolute top-72'>
        <Seat id={3}  />
        </div>
        <div className='absolute right-10 top-72'>
        <Seat id={4}  />
        </div>
        <div className={`absolute left-60 ${styles.topm}`}>
        <Seat id={5}  />
        </div>
        <div className={`absolute right-60 ${styles.topm}`}> 
        <Seat id={6}  />
        </div>
       </div>
       <div className='p-10 text-center'>Pool Amount</div>
       <div className='flex space-x-4 justify-center'>
        <Image src={'/assets/Cards/2c.png'} width={75} height={125} alt='card-1' />
        <Image src={'/assets/card.png'} width={75} height={125} alt='card-1' />
        <Image src={'/assets/card.png'} width={75} height={125} alt='card-1' />
        <Image src={'/assets/card.png'} width={75} height={125} alt='card-1' />
       </div>
       <div className='mt-60 flex justify-center align-middle space-x-5 p-2'>
          <button onClick={foo} className='p-6 text-emerald-800 hover:text-emerald-600 hover:border-emerald-600 border-solid border border-emerald-800 rounded-xl'>
              CALL 10
          </button>
          <button onClick={foo} className='p-6 text-gray-700 hover:text-gray-500 hover:border-gray-500 border-solid border border-gray-700 rounded-xl'>
            RAISE
          </button>
          <button onClick={foo} className='p-6 text-gray-700 hover:text-gray-500 hover:border-gray-500 border-solid border border-gray-700 rounded-xl'>
            CHECK
          </button>
          <button onClick={foo} className='p-6 text-red-900 hover:text-red-700 hover:border-red-700 border-solid border border-red-900 rounded-xl'>
              FOLD
          </button>
       </div>
        </main>
    </>
  );
}
