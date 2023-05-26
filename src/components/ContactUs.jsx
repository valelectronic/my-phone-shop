import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import {toast} from "react-toastify"
import {IoLogoWhatsapp} from "react-icons/io"
import {FiPhoneCall} from "react-icons/fi"

export default function ContactUs({userRef,listing}) {
    const [owner, setOwner] = useState(null)
    const [message,setMessage] = useState("")
    useEffect(() => {
        async function getLandlord() {
          const docRef = doc(db, "users", userRef);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setOwner(docSnap.data());
          } else {
            toast.error("Could not get landlord data");
          }
        }
        getLandlord();
      }, [userRef]);

      function Change(e){
        setMessage(e.target.value)
       
      }
  return (
    <>
{owner !== null && (
    <div className='flex flex-col w-full'>
        <p className='mt-6 font-semibold'>Contact {owner.name} for the {listing.name.toLowerCase()}</p>
        <div className='mt-3 mb-5'>
          <textarea name="message" 
          id="message" rows="2" value={message}
          onChange={Change}
          required
          placeholder='how may we help you?'
          className='w-full px-4 py-2 text-lg text-gray-700 bg-white border
          border-gray-300 rounded transition duration-150 ease-in-out
          focus:text-gray-700 focus:bg-white focus:border-slate-600'>
          </textarea>
        </div>
       <a
            href={`mailto:${owner.email}?Subject=${listing.name}&body=${message}`}
          >
               <button  className="px-7 py-3 bg-blue-600
                text-white rounded text-sm uppercase shadow-md
                 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                  focus:shadow-lg active:bg-blue-800 active:shadow-lg
                   transition duration-150 ease-in-out w-full
                    text-center mb-6" type="button">
              Send Message
            </button>
          </a>
    </div>
)}
<div>
<ul className='flex items-center space-x-5 sm:space-x-11 text-lg
    font-semibold ' >
<li className='flex items-center whitespace-nowrap'>
<IoLogoWhatsapp className='text-xl mr-1 bg-green-600 rounded-sm'/>
{listing.whatsapp}
      </li>
      <li className='flex items-center whitespace-nowrap'>
        <FiPhoneCall className='text-xl mr-1 bg-green-600 rounded-sm'/>
        {listing.Number}
      </li>
</ul>

</div>
    </>
  )
}
