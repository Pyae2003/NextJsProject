import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";

type CardWrapperProps = {
    title : string,
    description : string,
    children : React.ReactNode
}

const CardWrapper = ({title , description , children} : CardWrapperProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
  
      </Card>
    </>
  );
};

export default CardWrapper;
