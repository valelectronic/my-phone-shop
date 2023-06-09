import { getAuth, updateProfile } from 'firebase/auth'
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router'
import {toast} from 'react-toastify'
import {doc,updateDoc,getDocs,where,collection,orderBy,query, deleteDoc} from "firebase/firestore"
import {db} from "../firebase"
import {FcSmartphoneTablet} from "react-icons/fc"
import {Link} from "react-router-dom"
import ListingItem from '../components/ListingItem'




export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [changeDetail, setChangeDetail] = useState()
  const [listings, setListings] = useState(null)
  const [loading,setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })
  const {name,email} = formData
  function logout (){
    auth.signOut()
    navigate("/")
  }
 function change(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
    }))

  }
 async function onsubmit(){
    try {
      if(auth.displayName !==name ){
        //update display name in firebase  authentication
        await updateProfile(auth.currentUser, {
          displayName: name
        })
        //update the name in the firestore
        const docRef = doc(db, "users" ,auth.currentUser.uid)
        await updateDoc(docRef, {
          name
        })
      }
      toast.success("profile name updated successfully")
      
    } catch (error) {
    toast.error("could not update the profile details")
      
    }
  }
  
  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);
  async function onDelete(listingID){
    if(window.confirm("are you sure you want to delete?")){
      await deleteDoc(doc(db, "listings", listingID))
      const updatedListings = listings.filter((listing)=> listing.id
      !== listingID)
      setListings(updatedListings)
      toast.success("successfully removed your product")
    }

  }
  function onEdit(listingID){
    navigate(`/edit-listing/${listingID}`)

  }
  return (
   <>
   <section className='max-w-6xl mx-auto flex
   justify-center flex-col items-center'>
    <h1 className='text-3xl text-center
    mt-6 font-bold'>my profile</h1>
    <div className='w-full md:w-[50%] mt-6 px3'>
    <form >
      {/* name input */}
      <input type="text" onChange={change} value={name}  id="name" disabled = {!changeDetail}
      className={`mb-6 w-full px-4 py2 text-xl text-gray-700
      bg-white border border-gray-300 rounded
      transition ease-in-out l ${changeDetail && "bg-red-300 bg-red-300"}`}  />
      {/* email input */}
      <input type="email" value={email}  id="name"
       disabled 
      className='mb-6 w-full px-4 py2 text-xl text-gray-700
      bg-white border border-gray-300 rounded
      transition ease-in-out l'  />
      <div className='mb-6 flex justify-around whitespace-nowrap
      text-sm sm:text-lg '>
        <p className='flex items-center '>do you want to change your name? 
        <span
        onClick={ 
          ()=>{
            changeDetail && onsubmit()
            setChangeDetail((prevState)=> !prevState)
          }} className='text-red-600 hover:text-red-700
        transiton ease-in-out duration-200 ml-2 cursor-pointer'>
          {changeDetail ? "apply changes?" : "Edit"}
        </span>
        </p>
        <p onClick={logout} className='text-blue-600
        hover:text-blue-800 transition duration-200 cursor-pointer'>sign out</p>
      </div>
    </form>
    <button type='submit' className='mt-3 w-full bg-blue-700 text-white
    uppercase font-medium rounded shadow-md px-7 py-3 text-sm
    font-medium hover:bg-blue-800 transition duration-150 ease-in-out
    hover:shadow-lg active:bg-blue-900'>
      <Link to="/create_listing" className='flex justify-center items-center'>
      <FcSmartphoneTablet className='mr-2 border-2 text-3xl bg-red-300 rounded-full '/>
      set up your phone shop
      </Link>
   
    </button>
   </div>
   </section>
   <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listings.length > 0 && (
          <>
            <h2 className="mb-6  text-2xl text-center font-semibold uppercase">available phones for sell</h2>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            2xl-grid-cols-5 mt-6 mb-6'>
              {listings.map((listing) => (
                <ListingItem
                key={listing.id}
                id={listing.id}
                listing={listing.data}
                onDelete= {()=>onDelete(listing.id)}
                onEdit= {()=>onEdit(listing.id)}
              />
                
))}
            </ul>
          </>
        )}
      </div>
   
   </>
  )
}
