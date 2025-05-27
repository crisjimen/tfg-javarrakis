import React from 'react'

const RegisterForm = () => {
  return (
    <div className='flex w-3/4 bg-amber-50 h-3/4 justify-self-center items-center shadow-sm
    align-middle mt-10 flex-col p-4 pixel-border rounded-pixel'>
      
  <h1 
  className='text-2xl font-bold pixel-text text-spice-700'>
    REGISTER
  </h1>

      <form action="get"
      className='flex flex-col font-montserrat'>

        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="password">Confirm Password</label>
      </form>

    </div>
  )
}

export default RegisterForm