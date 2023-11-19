import {useLocation} from 'react-router-dom'
import './Result.css'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

const Result = () => {
       const location = useLocation()
       const state = location.state
   
       const [urls, setUrls] = useState([])
       const [loading, setLoading] = useState(false)
       const [error, setError] = useState("")

       useEffect(() => {
           // fetch the images
           const fetchImages = async () => {
               try{
                   setLoading(true)
                   setError("")
                   const promises = state?.prompts.map(async (prompt) => {
                       const response = await fetch(
                           "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
                           {
                               headers: { 
                                   "Accept": "image/png",
                                   "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
                                   "Content-Type": "application/json" 
                               },
                               method: "POST",
                               body: JSON.stringify({
                                    inputs: `Generate ${prompt.text}. Add ${prompt.speechBubble} as speech bubbles in the scene for the mentioned character.`
                                }),
                           }
                       );
                       const result = await response.blob();
                       const url = URL.createObjectURL(result);
                       return url
                   })
                   // wait for all the promises to resolve
                   const urls = await Promise.all(promises)
                   // set loading to false
                   setLoading(false)
                   // set the urls
                   setUrls(urls)
               }catch(e){
                   setLoading(false)
                   setError("Something went wrong")
               }
           }
           // call the function
           fetchImages()
       }, [state])
       return (
           <div className='Result'>
               <h1 className='title'>Generated comics</h1>
               {loading && <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
               {
                   !loading && error == '' &&
                   <div className="images">
                       {
                           urls.map((url, index) => (
                               <img key={index} src={url} alt={`comic${index}`}/>
                           ))
                       }
                   </div>
               }
               {
                   error && <div className='error'>
                       <h1>{error}</h1>
                       <Link className='button' to="/">Go  home</Link>
                   </div>
               }
           </div>
       )
   }
   
export default Result