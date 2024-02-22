'use client';

export default function Home() {
  return (
    <>
    <h1>
      Only Tips
    </h1>
    {
      window.starknet ?
     <>
     <br />
     <br />
     <br />
     <br />
     <input type="text" placeholder="Enter your Wei you want to deposit" width="300" />
     </>
     :
     <>
    <button onClick={() => connect()}>Connect wallet</button>
    </>
    }
    </>
    )
}
