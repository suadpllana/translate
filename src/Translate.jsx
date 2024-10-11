import React from 'react'
import {useState,useEffect, useRef} from "react"
import {languageData} from "./languages.js"
const Translate = () => {

    const from = useRef(null)
    const to = useRef(null)  
    const fromInput = useRef(null)
    const toInput = useRef(null) 
    const [loading , setLoading] = useState(false)
   
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
        if(e.key === "Enter"){
            e.preventDefault()
            getData()
        }
        return
    }
  
  return (
    <div>
        <h1>Translation App</h1>
      <div className="container">
        <div>
            <select ref={from}>
                <option value="">Select a language</option>
                {languageData.map((language, index) => (
                    <option key={index} value={language.region}>{language.language}</option>
                ))}
            </select>
            <textarea onKeyDown={(e) => enter(e)} ref={fromInput} placeholder="Enter Text"></textarea>
            <svg onClick={swapData} className="swap" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path></svg>
        </div>
        <div>
        <select ref={to}>
                <option value="">Select a Language</option>
                {languageData.map((language, index) => (
                    <option key={index} value={language.region}>{language.language}</option>
                ))} 
            </select>
            <textarea ref={toInput} placeholder={loading ? "Translating..." : "Translate"} readOnly></textarea>
        </div>
        <button onClick={getData}>Translate</button>
      </div>
   
    </div>
  )
}

export default Translate
