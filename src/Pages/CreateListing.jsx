import React, { useState } from 'react'

export default function CreateListing () {
  const [input,setInput] = useState({
    type: "yes",
    name: "",
    ram: 2,
    rom: 16,
    repaid: false,
    guarantee: false,
    address: "",
    description: "",
    offer: true,
    regularPrice: 0,
    discount: 0

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
    discount
  } = input
  function change (){
  }
  return (
    <main className='max-w-md px-2 mx-auto'>
        <h1 className='text-3xl text-center mt-6 font-bold'> mobile phone features</h1>
        <form>
            <p className='text-lg mt-6 font-semibold'> name </p>
            <input type="text" value={name} id="name" onChange={change}
            placeholder = "mobile phone name"  maxLength={32}
            minLength = "10" required className='w-full px-4 py-2
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
              onChange = {change} min = '1' max='50'
              required className='w-full px-4 py-2 text-lg text-gray-700 
             bg-white border rounded border-gray-300 transition duration-150
             ease-in-out focus:text-gray-700 focus:bg-white
              focus:border-slate-600 text-center ' />
            </div>
           </div>
             <p className='text-lg mt-6 font-semibold uppercase '>receipt available ?</p>
           <div className='flex mb-6'>
              <button type='button' id='type' onClick={change} className = {`
              px-7 py-3 font-medium mr-3 text-sm uppercase shadow-md rounded
              hover:shadow-lg focus:shadow-lg active:shadow-lg
              transition duration-150 ease-in-out w-full ${
                type === "yes" ? "bg-white text-black": "bg-slate-600 text-white"
              }`}> 
              yes
              </button>
              <button type='button' id='type' onClick={change} className = {`
              px-7 py-3 font-medium text-sm ml-3 uppercase shadow-md rounded
              hover:shadow-lg focus:shadow-lg active:shadow-lg
              transition duration-150 ease-in-out w-full ${
                type === "no" ? "bg-white text-black": "bg-slate-600 text-white"
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
              <button type='button' value={false} id='guarantee' onClick={change} className = {`
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
              offer === true && (
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
                      <input type="file"  id="images " className='
                      w-full px-3 py-1.5 text-gray-600 bg-white
                      border border-gray-300 rounded transition
                      duration-150 ease-in-out focus:bg-white
                      focus:border-slate-600 '
                      accept='.jpg, .png,.jpeg'
                      multiple
                      required onChange={change} 
                      />
                    </div>
                    <button type="submit" className='mt-6 w-full
                    px-7 py-3 bg-blue-600 text-white uppercase
                  font-medium text-sm rounded shadow-md hover:bg-blue-600
                  hover:shadow-lg focus:bg-blue-700 
                  focus:shadow-lg active:bg-blue-800 
                  transition duration-150 ease-in-out'>create your product</button>
        </form>
    </main>
  )
}
