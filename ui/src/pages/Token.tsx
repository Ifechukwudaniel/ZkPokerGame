import Header from '@/components/Header'
import React from 'react'
import Image from 'next/image'
function Token() {
    function buyTokens() {
        console.log("buy tokens")
    }
  return (
    <div className='bg-gray-800 px-10  text-white'>
        <Header />
        <div className='flex bg-gray-700  justify-around  py-24'>
         <div className=''>
            <h1 className='text-6xl py-10'>Buy Token Credits To Play</h1>
            <p className='text-3xl py-8 text-center mb-10'>1 MINA = 100 Credits</p>
            <button onClick={buyTokens} className='bg-green-800 text-2xl px-10 py-2 w-full rounded-2xl hover:bg-green-700 mb-52'>Buy Tokens</button>
        </div>
        <Image src="/assets/cards-coin.png" width={500} height={500} alt="coin" className="p-7" />
    </div>
    </div>
  )
}

export default Token    