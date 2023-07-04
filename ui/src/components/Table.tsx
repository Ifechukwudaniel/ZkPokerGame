import React from 'react'
import { Table  } from '@/types/types'
const  Table = (props: Table ) => {
  return (
    <tbody>
        <tr>
          <td className="border px-4 py-2">{props.gameID}</td>
          <td className="border px-4 py-2">{props.poolPrize}</td>
          <td className="border px-4 py-2">{props.winnerAddress}</td>
          <td className="border px-4 py-2">{props.totalRounds}</td>
          <td className="border px-4 py-2">{props.totalParticipants}</td>
        </tr>
      </tbody>
  )
}

export default Table