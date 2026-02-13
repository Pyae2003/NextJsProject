import { Button } from '@/components/ui/button'
import { gitHubSignIn } from '@/lib/auth-client'
import { Github } from 'lucide-react'
import React from 'react'

const GitHubForm = () => {
  return (
    <div>
        <Button onClick={()=>gitHubSignIn()} className='w-full'>
            <Github/>
            <span>Continue with Github</span>
        </Button>
    </div>
  )
}

export default GitHubForm