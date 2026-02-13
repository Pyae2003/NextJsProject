import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react';
import { useFormStatus } from 'react-dom'

type submitTypeProps = {
    type : string
}

const SubmitButton = ({type} : submitTypeProps) => {
    const {pending} = useFormStatus();
  return (
    <>
      <Button title='submit' variant={"secondary"} disabled={pending}>
        {pending ? <LoaderCircle className='animate-spin h-4 w-4'/> : type }
      </Button>
    </>
  )
}

export default SubmitButton