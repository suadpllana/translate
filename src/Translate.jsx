import React from 'react'
import {useState,useEffect, useRef} from "react"
import {languageData} from "./languages.js"
const Translate = () => {

    const from = useRef(null)
    const to = useRef(null)  
    const fromInput = useRef(null)
    const toInput = useRef(null) 
    const [loading , setLoading] = useState(false)
    const [count , setCount] = useState(0)
   
        async function getData() {
            setLoading(true)
            try {
            const url = 'https://deep-translate1.p.rapidapi.com/language/translate/v2';
            const options = {
                method: 'POST',
                headers: {
                    'x-rapidapi-key': import.meta.env.VITE_API_KEY,
                    'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    q: `${fromInput.current.value}`,
                    source: `${from.current.value}`,
                    target: `${to.current.value}`
                })
            };
            
           
                const response = await fetch(url, options);
                const result = await response.json();
                toInput.current.value = result.data.translations.translatedText
                setLoading(false)
                
            } catch (error) {
                console.error(error);
            }
        }
    


      
        function swapData(){
            const holder = to.current.value;
            to.current.value = from.current.value;
            from.current.value = holder


            const textHolder = toInput.current.value
            toInput.current.value = fromInput.current.value
            fromInput.current.value = textHolder
        }

    function enter(e){
       if(count > 499){
        alert("The maximum character input is 500!")
        return
       }
        if(e.key === "Backspace"){
            setCount(prev => prev - 1)
            return
        }
    
        
        if(e.key === "Enter"){
            e.preventDefault()
            getData()
            return;
        }
        
        setCount(prev => prev + 1)
    }
 

  return (
    <div>
        <h1 className="text-3xl font-bold">Translation App</h1>
      <div className=" container w-full md:w-[50%] md:ml-[25%] w-1/2 ml-1/4 bg-gray-200 rounded-2xl grid grid-cols-2 h-80 mt-8 gap-10 relative">
        <div className=" h-3/5 bg-wheat relative">
            <select className="w-full h-8 border-b border-black border-b-[1px]" ref={from} >
                <option value="">Select a language</option>
                {languageData.map((language, index) => (
                    <option key={index} value={language.region}>{language.language}</option>
                ))}
            </select>
            <textarea className="w-[99%] h-full text-lg" onKeyDown={(e) => enter(e)} ref={fromInput} placeholder="Enter Text">
          
            </textarea>
                <p className="absolute right-2 z-20 bottom-[-35px]">{count}/500</p>
           
        </div>
        <div className=" h-3/5 bg-wheat relative">
        <select  className="w-full h-8 border-b border-black border-b-[1px]" ref={to}>
                <option value="">Select a Language</option>
                {languageData.map((language, index) => (
                    <option key={index} value={language.region}>{language.language}</option>
                ))} 
            </select>
            <textarea className="w-[99%] h-full text-lg" ref={toInput} placeholder={loading ? "Translating..." : "Translate"} readOnly></textarea>
           
        </div>
        <button className=" hover:opacity-70 absolute bottom-0 left-[15%] h-9 w-[70%] cursor-pointer text-lg bg-gray-400" onClick={getData}>Translate</button>
        <svg onClick={swapData} className="absolute top-0 left-[48%] w-[30px] cursor-pointer" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path></svg>
      </div>
   
    </div>
  )
}

export default Translate
