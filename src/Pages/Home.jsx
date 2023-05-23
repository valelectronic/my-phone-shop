import React, { useState } from 'react'
import Slider from '../components/Slider'
import { useEffect } from 'react'
import { collection, doc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { Link } from 'react-router-dom'
import ListingItem from '../components/ListingItem'


export default function Home() {
  // offers
  const [offerListing, setOffListing] = useState(null)
  useEffect(()=>{
    async function fetchListings(){
      try {
        // get reference
        const listingRef = collection(db, "listings")
        // create the query
        const q = query(listingRef, where("offer", "==", true),
        orderBy("timestamp", "desc"), limit(4))
        // execute the query
        const querySnap = await getDocs(q)
        const listings = []
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data:doc.data()
          })
        })
        setOffListing(listings)
        console.log(listings)
      } catch (error) {
        console.log(error)
        
      }

    }
fetchListings()
  },[])
  // receipt
  const [receiptListing, setReceptListing] = useState(null)
  useEffect(()=>{
    async function fetchListings(){
      try {
        // get reference
        const listingRef = collection(db, "listings")
        // create the query
        const q = query(listingRef, where("guarantee", "==", true),
        orderBy("timestamp", "desc"), limit(4))
        // execute the query
        const querySnap = await getDocs(q)
        const listings = []
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data:doc.data()
          })
        })
        setReceptListing(listings)
        
      } catch (error) {
        
        
      }

    }
fetchListings()
  },[])
  // receipt
  const [repaidtListing, setRepaidtListing] = useState(null)
  useEffect(()=>{
    async function fetchListings(){
      try {
        // get reference
        const listingRef = collection(db, "listings")
        // create the query
        const q = query(listingRef, where("repaid", "==", true),
        orderBy("timestamp", "desc"), limit(4))
        // execute the query
        const querySnap = await getDocs(q)
        const listings = []
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data:doc.data()
          })
        })
        setRepaidtListing(listings)
      } catch (error) {
        
      }

    }
fetchListings()
  },[])
  return (
    <div>
      <Slider/>
      <div className='max-w-6xl mx-auto pt-4 space-y-6'>
        {offerListing && offerListing.length> 0 && (
          <div  className='m-2 mb-6 font-semibold'>
            <h2>phones with offers</h2>
            <Link  to = "/offers">
              <p className='px-3 text-sm text-blue-600
              hover:text-blue-800 transition duration-150
              ease-in-out'>click to show more phones with offers</p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3'>
              {offerListing.map((listing)=>(
                <ListingItem key={listing.id} listing={listing.data}
                 id={listing.id}/>
              ))}
            </ul>
          </div>
        )}
        {receiptListing && receiptListing.length> 0 && (
          <div  className='m-2 mb-6 font-semibold'>
            <h2>phones with receipt</h2>
            <Link  to = "/category/receipt">
              <p className='px-3 text-sm text-blue-600
              hover:text-blue-800 transition duration-150
              ease-in-out'>click to show more phones with receipt</p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3'>
              {receiptListing.map((listing)=>(
                <ListingItem key={listing.id} listing={listing.data}
                 id={listing.id}/>
              ))}
            </ul>
          </div>
        )}
        
        {repaidtListing && repaidtListing.length> 0 && (
          <div  className='m-2 mb-6 font-semibold'>
            <h2>phones worked on before</h2>
            <Link  to = "/category/repaid">
              <p className='px-3 text-sm text-blue-600
              hover:text-blue-800 transition duration-150
              ease-in-out'>click to show more phones issue before</p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3'>
              {repaidtListing.map((listing)=>(
                <ListingItem key={listing.id} listing={listing.data}
                 id={listing.id}/>
              ))}
            </ul>
          </div>
        )}
        
      </div>
    </div>
  )
}
