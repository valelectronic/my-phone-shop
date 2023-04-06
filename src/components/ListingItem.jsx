import React from 'react'
import { Link } from 'react-router-dom';
import Moment from "react-moment"
import {MdLocationOn} from "react-icons/md"
import {TbCurrencyNaira} from "react-icons/tb"
import {FaTrash} from "react-icons/fa"
import {MdModeEdit} from "react-icons/md"

export default function ListingItem({ listing, id,onDelete,onEdit }) {
    return <li className='bg-white flex relative flex-col justify-between
    items-center shadow-md hover:shadow-xl rounded-md overflow-hidden
    transition-shadow duration-150 m-[10px] '>
      <Link className='contents' to = {`/category/${listing.type}/${id}`}>
        <img className='h-[170px] w-full object-cover rounded-md
        hover:scale-105 transition-scale duration-200 ease-in-out
        ' loading='lazy' src={listing.imgUrls[0]} alt='' />
        <Moment className='absolute top-2 left-2  bg-[#3377cc]
        text-white uppercase text-xs font-semibold
        rounded-md px-2 py-1 shadow-lg' fromNow  >
          {listing.timestamp?.toDate()}
        </Moment>
        <div className='w-full p-[10px]'>
          <div className='flex items-center space-x-1'>
            <MdLocationOn className='h-4 w-4 text-green-600'/>
            <p className='font-semibold text-sm mb-[2px]
            text-gray-600 truncate '>{listing.address}</p>
          </div>
          <p className='font-semibold mt-2 text-xl m-0 truncate '>{listing.name}</p>
          <p className='text-[#457b9d]  mt-2
          font-semibold '><TbCurrencyNaira className='absolute left-0
          bottom-10  '/>{listing.offer
          ? listing.discount
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
         : listing.regularPrice
         .toString()
         .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }</p>

          <div className='flex  items-center mt-[10px] space-x-3'>
            <div className='flex items-center space-x-1'>
              <p className='font-bold text-xs'> {listing.ram > 1 ? `RAM ${listing.ram}`:"1 RAM"}</p>
            </div>
            <div className='flex items-center space-x-1'>
              <p className='font-bold text-xs'>{listing.rom > 1 ? `ROM ${listing.rom}`:"1 ROM"}</p>
            </div>
          </div>

        </div>
      </Link>
      {onDelete &&(
        <FaTrash className='absolute bottom-2 right-2
        h-[15px] cursor-pointer text-red-500'  
        onClick = {(()=>onDelete(listing.id))}
        />
      ) }
      {onEdit &&(
        <MdModeEdit className='absolute bottom-2 right-9
        h-4 cursor-pointer '  
        onClick = {(()=>onEdit(listing.id))}
        />
      ) }
    </li>;

  }
