import React from 'react'
import Header from '@/components/Header'
import Table from '@/components/Table'
// import { PublicKey  } from 'snarkyjs'
function Results() {

  return (
    <div className='bg-gray-800 px-10  text-white h-full '>
        <Header />
        <div className='bg-gray-600 h-full'>
            <div className='py-10 text-3xl text-center'>
            LeaderBoard
            </div>
       
        <div className='p-10'>
            <table className="table-auto border-collapse w-full">
                <thead>
                    <tr className='text-left'>
                    <th className="border px-4 py-2">GameID</th>
                    <th className="border px-4 py-2">Pool Prize</th>
                    <th className="border px-4 py-2">Winner</th>
                    <th className="border px-4 py-2">Total Rounds</th>
                    <th className="border px-4 py-2">Total Participants</th>
                    </tr>
                </thead>
                <Table gameID='1' poolPrize={100} winnerAddress={'B62qoEmkxdgAo9FokbvRQjxePE8hn7jz2k8qMUFKG8V7XZPGywWf1hM'} totalRounds={10} totalParticipants={10} />
            </table>
        </div>
        </div>
    </div>
  )
}

export default Results