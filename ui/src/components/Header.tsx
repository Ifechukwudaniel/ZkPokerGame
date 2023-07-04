import Link from 'next/link';

function Header() {
  return (
    <div className="flex items-center  w-full text-xs">
      <Link href="/" className="inline-flex bg-gray-800 bold p-1 px-2">
        POKER HOME
      </Link>
      <Link href="/Token" className="inline-flex  bg-gray-700 p-1 px-3">
        Mint Token
      </Link>
      <Link href="/Results" className="inline-flex  bg-gray-600 p-1 px-3">
        Result
      </Link>
    </div>
  );
}

export default Header;