import React, { useState } from 'react';

const MyForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [intendedStack, setIntendedStack] = useState<number>(0);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setIsLoading(true);
    // Additional logic or actions can be added here
    console.log(username, intendedStack);
    setIsLoading(false);
  };

  return ( 
  <div className="flex flex-col items-center bg-white w-64 p-4 rounded-lg">
  <form >
    <div className="mb-4">
      <label htmlFor="username" className="text-gray-700">
        Your Nickname
      </label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        placeholder="Your Nickname"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 "
      />
    </div>
    <div className="mb-4">
      <label htmlFor="intendedStack" className="text-gray-700">
        Intended Stack
      </label>
      <input
        type="number"
        id="intendedStack"
        name="intendedStack"
        placeholder="Intended Stack"
        value={intendedStack}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIntendedStack(parseInt(e.target.value))}
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
