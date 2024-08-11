import React from 'react'

const CreateButton = ({name,openModal}) => {
  return (
    <div className=' flex items-center mt-10 flex-col justify-center'>
    <button className="bg-blue-700 p-2 mt-3  ml-[2px]  text-white font-bold py-2 px-4 rounded-full w-[30%] " onClick={openModal}>
      Create
    </button>
    <div>
  
    </div>
    </div>
  )
}

export default CreateButton
