import { useState } from "react"
import Image from "next/image"
import MyForm from "./Form"
function Seat(props : {id : number}) {
  const [seatOccupied, setSeatOccupied] = useState<boolean>(false)
  const [formPopup, setFormPopup] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('');
  const [intendedStack, setIntendedStack] = useState<number>(0);

  async function sit() {
    if(seatOccupied) return
    setFormPopup(true)
    // On form submit, setSeatOccupied(true)
    // setSeatOccupied(true)
  }

  return (
    <div>
      <div className="w-60 h-20 border border-gray-600 border-dashed z-20" onClick={sit} >
       {
          seatOccupied ? 
          <div className="text-white flex space-x-1 relative">
            <div className="flex space-x-1 ">
            <Image src="/assets/card.png" width={75} height={125} alt="card-1" className="relative bottom-10 " />
            <Image src="/assets/card.png" width={75} height={125} alt="card-2" className="relative bottom-10 " />
            </div>
            <div className="z-10 flex justify-between absolute right-1 w-full p-6 bg-slate-700">
            <h1>{username}</h1>
            <h1>Coins: {intendedStack}</h1>
            </div>
          </div>
           :
           formPopup ?
           <>
           <div className="text-white text-center p-7">Fill Form</div>
           <div className="relative top-5 left-5">
             <MyForm username={username} setUsername={setUsername} intendedStack={intendedStack} setIntendedStack={setIntendedStack}  setFormPopup={setFormPopup} setSeatOccupied={setSeatOccupied}/>
           </div>
           </>
           :
           <div className="text-white text-center p-7">{props.id}  SIT</div>
       }
      </div>
    </div>
  )
}

export default Seat