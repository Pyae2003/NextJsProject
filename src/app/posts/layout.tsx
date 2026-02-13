import { getSession } from '@/lib/get-session'
import { loginPath } from '@/path'
import { redirect } from 'next/navigation'
import React from 'react'

type layout = {
    children : React.ReactNode
}
const layout = async ({children} : layout) => {
    const session = await getSession();
    if(!session){
        redirect(loginPath)
    };
    
  return (
    <div>
        {children}
    </div>
  )
}

export default layout