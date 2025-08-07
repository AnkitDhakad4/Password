import { useState,useCallback,useEffect,useRef} from 'react'

import './App.css'

function App() {
 
  const passRef=useRef(null)//ye select karne ke liye hai


  const [password,setPassword]=useState("")
  const [length,setLength]=useState(8);//setLength is function which update the length in next state (after any change)
  const [charallowed,setCharAllow]=useState(false);
  const [numallow,setnumallow]=useState(false);

  // const copyPasswordToClipboard=(()=>{//ye bhi kaam karega
  //   passRef.current?.select()
  //   window.navigator.clipboard.writeText(password)
  // })

  const copyPasswordToClipboard=useCallback(()=>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])//jab pass change hoga toh hi iski defination change hogi mujhe toh nahi lagta kuch optimize hoga par thik hai

  const passwordGenerator=useCallback(()=>{

    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pas="";

    if(numallow) str=str+"0123456789";
    if(charallowed) str=str+"!@#$%^&*(){}[]"

    for(let i=0;i<length;i++)
    {
      let j=Math.floor(Math.random()*str.length+1)
      pas=pas+str.charAt(j)
    }

    setPassword(pas)
  },[length,charallowed,numallow,setPassword])//isse function ki defination change hoti rahegi yani function re create hoga
//But if the dependencies don’t change, React will reuse the old version of the function
  
 useEffect(()=>{
  passwordGenerator();
 },[length,charallowed,numallow])//yha num allowed hta ke dekh fir isse sirf 1 baar chalega fir  nahi chalega par number aana start ho ajyenge agli baar se kyuki usecallback yaad rakhega ki numallow kar diye hai

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-10 py-2 text-center bg-gray-700'>
        <h3 className='text-white text-2xl'>Password Generator</h3>
        <div className='flex rounded-lg py-2  overflow-hidden mb-4 h-16'>
          <input type='text' value={password} placeholder='Password' 
          className='outline-none bg-white w-full py-1 px-3 rounded-lg my-1 '
           ref={passRef}
           readOnly/>
          <button className='outline-none rounded-2xl mx-0.5 bg-blue-700 text-white px-1 h-10 shrink-0'
          onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <div className='flex gap-x-2 text-sm'>
          <div className='flex gap-x-1 items-center'>
            <input type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{
              // console.log(e)
              setLength(e.target.value)
            }}
            />
            <label className='text-white mr-2'>Length:{length}</label>
            {/* ye var inject kiya */}
          </div>
          <div className='flex gap-x-1 items-center'>
             <input type="checkbox"
             defaultChecked={charallowed}
             id="char-allowed"
            onClick={()=>{
              setCharAllow((prev)=>{return !prev}); 
            }}
            />
            <label className='text-white mr-2'>CharAllowed</label>

            <input type="checkbox"
             defaultChecked={numallow}
             id="num-allowed"
            onClick={()=>{
              setnumallow((prev)=>{return !prev}); 
            }}
            />
            <label className='text-white'>NumAllowed</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
