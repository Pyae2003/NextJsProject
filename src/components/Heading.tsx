import { Separator } from "./ui/separator"

interface Props {
  title : string
  description : string
}
const Heading = ({title,description} : Props) => {
  return (
    <div className="">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm font-medium text-muted-foreground">{description}</p>
        <Separator className="my-2"/>
    </div>
  )
}

export default Heading