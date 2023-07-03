import React, { useState } from 'react';
import {FormValues} from "@/types/types"
const MyForm = ( props : FormValues) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setIsLoading(true);
    // Additional logic or actions can be added here
    console.log(props.username, props.intendedStack);
    props.setSeatOccupied(true);
    setIsLoading(false);
    props.setFormPopup(false);
  };

  return ( 
  <div className="flex flex-col items-center bg-white w-64 p-4 rounded-lg">
  <form >
    <div className="mb-4 ">
      <div className='flex justify-between'>
      <label htmlFor="username" className="text-gray-700 text-sm">
        Your Nickname
      </label>
      <button onClick={() => props.setFormPopup(false)} className="text-gray-700 text-sm">X</button>
      </div>
      <input
        type="text"
        id="username"
        name="username"
        value={props.username}
        placeholder="Your Nickname"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setUsername(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 "
      />
    </div>
    <div className="mb-4">
      <label htmlFor="intendedStack" className="text-gray-700 text-sm">
        Intended Stack
      </label>
      <input
        type="number"
        id="intendedStack"
        name="intendedStack"
        placeholder="Intended Stack"
        value={props.intendedStack}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setIntendedStack(parseInt(e.target.value))}
        className="w-full border border-gray-300 rounded-md p-2"
      />
    </div>
    <button
      type="submit"
      onClick={handleButtonClick}
      className={`py-2 px-4 w-full rounded-md text-white  
        ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}
      `}
    >
      Request The Seat
    </button>
  </form>
</div>
  );
};

export default MyForm;
