import React, { useEffect, useState } from 'react'
import Spinner from "../components/Spinner"
import {toast} from "react-toastify"
import {getAuth} from "firebase/auth"
import {v4 as uuidv4}  from "uuid"
import {db} from '../firebase'
import {useNavigate, useParams} from 'react-router-dom'
import { serverTimestamp, doc, getDoc, updateDoc} from 'firebase/firestore'
import {getStorage,ref, uploadBytesResumable,getDownloadURL} from "firebase/storage"

export default function CreateListing () {
  const auth = getAuth()
  const navigate = useNavigate()
  
  const [geolocationEnabled, setGeolocationEnabled] = useState(true)
  
  const [loading,setLoading] = useState(false)
  const [listing,setListing] = useState(null)
  const [input,setInput] = useState({
    type: true,
    name: "",
    ram: 2,
    rom: 16,
    repaid: false,
    guarantee: false,
    address: "",
    description: "",
    offer: true,
    regularPrice: 0,
    discount: 0,
    latitude:0,
    longitude:0,
    images: {}

  })
  const {type,
    name,
    ram,
    rom,
    repaid,
    guarantee,
    address,
    description,
    offer,
    regularPrice,
    discount,
    latitude,
    longitude,
    images
  } = input

// editing your setup and updating it in the database
const params = useParams()

useEffect(()=>{

    if(listing && listing.userRef !== auth.currentUser.uid){
        toast.error("you cant edit this listing")
        navigate("/")
    }
},[auth.currentUser.uid,listing,navigate])

useEffect(()=>{
    setLoading(true)
    async function fetchListings(){
        const docRef = doc(db,"listings",params.listingID)
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
            setListing(docSnap.data())
            setInput({...docSnap.data()})
            setLoading(false)
        }else{
            navigate("/")
            toast("listing does not exist")
        }


    }
fetchListings()
},[navigate, params.listingID])


  function change (e){
    let boolean = null
    if(e.target.value === 'true'){
      boolean = true
    }
    
    if(e.target.value === 'false'){
      boolean = false
    }
    //files
    if(e.target.files){
      setInput((prevState)=>({
        ...prevState,
        images: e.target.files

      }))
    }
    //text/boolean/numbers
if(!e.target.files){
  setInput((prevState)=>({
    ...prevState,
    [e.target.id]: boolean ?? e.target.value
  }))
}
  }

async function submitting(e){
e.preventDefault()
setLoading(true)
if(+discount >=  +regularPrice){
  setLoading(false)
  toast.error("discounted price needs to be less than regular price")
  return;
}
if(images.length > 6){
  setLoading(false)
  toast.error("maximum of 6 images allowed")
  return;
 
}



async  function storeImage(image){
  return new Promise((resolve,reject)=>{
    const storage =getStorage()
    const filename = `${auth.currentUser.uid}-${image.name}- ${uuidv4()}`
    const storageRef = ref(storage, filename)
    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
    reject(error)
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      resolve( downloadURL);
    });
  }
);
  })

}
const imgUrls = await Promise.all(
[...images].map((image)=> storeImage(image))
  ).catch((error)=>{
    setLoading(false);
    toast.error("images not uploaded")
    return
  })

const formDataCopy = {
  ...input,
  imgUrls,
  timestamp:serverTimestamp(),
  userRef: auth.currentUser.uid
}
delete formDataCopy.images;
!formDataCopy.offer && delete formDataCopy.discount;
delete formDataCopy.longitude
delete formDataCopy.latitude
const docRef = doc(db, 'listings',params.listingID);
await updateDoc(docRef,formDataCopy)
setLoading(false)
toast.success("listing edited successfully")

navigate(`/category/${formDataCopy.type}/${docRef.id}`)
}

if(loading){
  return <Spinner/>
}
  return (
    <main className='max-w-md px-2 mx-auto'>
        <h1 className='text-3xl text-center mt-6 font-bold'> make your corrections</h1>
        <form onSubmit={submitting}>
            <p className='text-lg mt-6 font-semibold'> name </p>
            <input type="text" value={name} id="name" onChange={change}
            placeholder = "mobile phone name"  maxLength={32}
            minLength = "8" required className='w-full px-4 py-2
            text-xl text-gray-700 bg-white border border-gray-300
            transition duration-150 ease-in-out focus:text-gray-700
            focus:bg-white rounded focus:border-slate-600 mb-6'/>
            
            <div className='flex space-x-6 mb-6'>
            <div>
              <p className=' text-lg font-semibold'>RAM(GB)</p>
              <input type="number" id="ram" value={ram}
              onChange = {change} min = '1' max='50'
              required className='w-full px-4 py-2 text-lg text-gray-700 
             bg-white border rounded border-gray-300 transition duration-150
             ease-in-out focus:text-gray-700 focus:bg-white
              focus:border-slate-600 text-center ' />
            </div>
            <div>
              <p className='text-lg font-semibold'>ROM(GB)</p>
              <input type="number" id="rom" value={rom}
              onChange = {change} min = '1' max='200'
              required className='w-full px-4 py-2 text-lg text-gray-700 
             bg-white border rounded border-gray-300 transition duration-150
             ease-in-out focus:text-gray-700 focus:bg-white
              focus:border-slate-600 text-center ' />
            </div>
           </div>
             <p className='text-lg mt-6 font-semibold uppercase '>receipt available ?</p>
           <div className='flex mb-6'>
              <button type='button' value={true} id='type' onClick={change} className = {`
              px-7 py-3 font-medium mr-3 text-sm uppercase shadow-md rounded
              hover:shadow-lg focus:shadow-lg active:shadow-lg
              transition duration-150 ease-in-out w-full ${
                !type ? "bg-white text-black": "bg-slate-600 text-white"
              }`}> 
              yes
              </button>
              <button type='button' value={false} id='type' onClick={change} className = {`
              px-7 py-3 font-medium text-sm ml-3 uppercase shadow-md rounded
              hover:shadow-lg focus:shadow-lg active:shadow-lg
              transition duration-150 ease-in-out w-full ${
                type ? "bg-white text-black": "bg-slate-600 text-white"
              }`}> 
              no
              </button>
            </div>
           <p className='text-lg mt-6 font-semibold uppercase '>worked on before ?</p>
           <div className='flex'>
              <button type='button' id='repaid' value={true} onClick={change} className = {`
              px-7 py-3 font-medium mr-3 text-sm uppercase shadow-md rounded
              hover:shadow-lg focus:shadow-lg active:shadow-lg
              transition duration-150 ease-in-out w-full ${
                !repaid ? "bg-white text-black": "bg-slate-600 text-white"
              }`}> 
              yes
              </button>
              <button type='button' id='repaid' value={false} onClick={change} className = {`
              px-7 py-3 font-medium text-sm ml-3 uppercase shadow-md rounded
              hover:shadow-lg focus:shadow-lg active:shadow-lg
              transition duration-150 ease-in-out w-full ${
                repaid ? "bg-white text-black": "bg-slate-600 text-white"
              }`}> 
              no
              </button>
            </div>
            <p className='text-lg mt-6 font-semibold uppercase '>guarantee available ?</p>
           <div className='flex'>
              <button type='button' value={true} id='guarantee' onClick={change} className = {`
              px-7 py-3 font-medium mr-3 text-sm uppercase shadow-md rounded
              hover:shadow-lg focus:shadow-lg active:shadow-lg
              transition duration-150 ease-in-out w-full ${
                !guarantee ? "bg-white text-black": "bg-slate-600 text-white"
              }`}> 
              yes
              </button>
              <button type='button' value={false} id='guarantee' onClick={change} className = {`
              px-7 py-3 font-medium text-sm ml-3 uppercase shadow-md rounded
              hover:shadow-lg focus:shadow-lg active:shadow-lg
              transition duration-150 ease-in-out w-full ${
                guarantee ? "bg-white text-black": "bg-slate-600 text-white"
              }`}> 
              no
              </button>
            </div>
            <p className='text-lg mt-6 font-semibold'> Address </p>
            <textarea type="text" value={address} id="address" onChange={change}
            placeholder = "Recognized location"  
             required className='w-full px-4 py-2
            text-xl text-gray-700 bg-white border border-gray-300
            transition duration-150 ease-in-out focus:text-gray-700
            focus:bg-white rounded focus:border-slate-600 mb-6'/>
            {
              !geolocationEnabled && (
                <div className='flex space-x-6 mb-6'>
                  <div>
                    <p className='text-xl font-semibold'> latitude</p>
                    <input type="number" value={latitude}  id="latitude"
                    onChange={change}required 
                    min='-90'
                    max = '90'
                    className='w-full px-4 py-2 text-xl text-gray-700
                    bg-white border rounded border-gray-300 
                    transition duration-150 ease-in-out focus:text-gray-700
                     focus:bg-white focus:border-slate-600 text-center'  />
                  </div>
                  <div>
                    <p className='text-xl font-semibold'> longitude</p>
                    <input type="number" value={longitude}  id="longitude"
                    onChange={change}required 
                    min='-180'
                    max = '180'
                    className='w-full px-4 py-2 text-xl text-gray-700
                    bg-white border rounded border-gray-300 
                    transition duration-150 ease-in-out focus:text-gray-700
                     focus:bg-white focus:border-slate-600 text-center'  />
                  </div>
                </div>
              )
            }

            <p className='text-lg  font-semibold'> Description </p>
            <textarea type="text" value={description} id="description" onChange={change}
            placeholder = "description"  
             required className='w-full px-4 py-2
            text-xl text-gray-700 bg-white border border-gray-300
            transition duration-150 ease-in-out focus:text-gray-700
            focus:bg-white rounded focus:border-slate-600 mb-6'/>

<p className='text-lg  font-semibold uppercase '>offer</p>
           <div className='flex mb-6'>
              <button type='button' value={true} id='offer' onClick={change} className = {`
              px-7 py-3 font-medium mr-3 text-sm uppercase shadow-md rounded
              hover:shadow-lg focus:shadow-lg active:shadow-lg
              transition duration-150 ease-in-out w-full ${
                !offer ? "bg-white text-black": "bg-slate-600 text-white"
              }`}> 
              yes
              </button>
              <button type='button' value={false} id='offer' onClick={change} className = {`
              px-7 py-3 font-medium text-sm ml-3 uppercase shadow-md rounded
              hover:shadow-lg focus:shadow-lg active:shadow-lg
              transition duration-150 ease-in-out w-full ${
                offer ? "bg-white text-black": "bg-slate-600 text-white"
              }`}> 
              no
              </button>
            </div>
            <div>
              <div>
                <p className='text-lg font-semibold'>Regular price</p>
                <div className='flex w-full space-x-6 justify-center
                items-center'>
                  <input  type="number" onChange={change} value={regularPrice}
                  min = '50' max= '4000000' required id="regularPrice"
                  className='w-full px-4 py-2 text-xl text-gray-700
                  bg-white border rounded border-gray-300 
                  transition duration-150 ease-in-out focus:text-gray-700
                   focus:bg-white mb-6 focus:border-slate-600 text-center' />
                   {
                    offer && (
                    <p className='text-md w-full whitespace-nowrap
                   uppercase'></p>
                   )}
                </div>
              </div>
            </div>
            {
              offer && (
                <div>
              <div>
                <p className='text-lg font-semibold'>discounted price</p>
                <div className='flex w-full space-x-6 justify-center
                items-center'>
                  <input  type="number" onChange={change} value={discount}
                  min = '50' max= '4000000' required ={offer} id="discount"
                  className='w-full px-4 py-2 text-xl text-gray-700
                  bg-white border rounded border-gray-300 
                  transition duration-150 ease-in-out focus:text-gray-700
                   focus:bg-white focus:border-slate-600 text-center' />
                   {
                    offer === true && (
                    <p className='text-md w-full whitespace-nowrap
                   uppercase'># (for full payment)</p>
                   )}
                </div>
                
              </div>
            </div>
              )
                    }
                    <div className='mt-6'>
                      <p className='text-lg font-semibold'>images</p>
                      <p className='text-gray-600'>the first image will be the cover(max 6)</p>
                      <input type="file"  id="images "    className='
                      w-full px-3 py-1.5 text-gray-600 bg-white
                      border border-gray-300 rounded transition
                      duration-150 ease-in-out focus:bg-white
                      focus:border-slate-600 '
                      accept='.jpg, .png,.jpeg'
                      multiple
                      required
                       onChange={change}
  
                      />
                    </div>
                    <button type="submit" className='mt-6 w-full
                    px-7 py-3 bg-blue-600 text-white uppercase
                  font-medium text-sm rounded shadow-md hover:bg-blue-600
                  hover:shadow-lg focus:bg-blue-700 
                  focus:shadow-lg active:bg-blue-800 
                  transition duration-150 ease-in-out'>edit your listings</button>
        </form>
    </main>
  )
}
