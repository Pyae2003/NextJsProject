
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SINGLE_POST, UPDATE_POST } from "@/path";
import { Post } from "@/types/post";
import { MoveUpRight } from "lucide-react";

import Link from "next/link";
import { deletePosts } from "../actions/deletePosts";
import { info } from "../../../../generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import DeleteButton from "./DeleteButton";

interface Props extends info{
    isCard : boolean;
}

const PostItems = ({ id, name, content , isCard = true , status }: Props) => {

  return (
    <Card className="relative">
      <Badge className="absolute top-4 right-4" variant={status === "DONE"? "default" : "outline"}>{status}</Badge>
      <CardHeader>
        <CardTitle> {name}</CardTitle>
        <CardDescription className={cn(isCard && "line-clamp-1")}> {content}</CardDescription>
      </CardHeader>
      {
        isCard && (
          <CardContent>
            <Button className="mx-4" asChild>
              <Link href={SINGLE_POST(id)}>
                <MoveUpRight /> View
              </Link>
            </Button>
            <Button variant={"secondary"} asChild>
              <Link href={UPDATE_POST(id)}>
                <MoveUpRight /> Edit
              </Link>
            </Button>
          </CardContent>
        )
      }

      {
        !isCard && (
          <DeleteButton id={id}/>
        )
      }
      
    </Card>
  );
};

export default PostItems;
