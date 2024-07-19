import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-violet-600 text-white py-2'>
        <div className="logo">
            <span className='font-bold mx-8 text-xl' >i task</span>
        </div>
        <ul className='flex mx-8 gap-10'>
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Task</li>
        </ul>

    </nav>
  )
}

export default Navbar