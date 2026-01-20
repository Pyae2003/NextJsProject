
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
import { SINGLE_POST } from "@/path";
import { Post } from "@/types/post";
import { MoveUpRight } from "lucide-react";

import Link from "next/link";
import { deletePosts } from "../actions/deletePosts";

interface Props extends Post{
    isCard : boolean;
}

const PostItems = ({ id, name, content , isCard = true }: Props) => {

  return (
    <Card>
      <CardHeader>
        <CardTitle> {name}</CardTitle>
        <CardDescription className={cn(isCard && "line-clamp-1")}> {content}</CardDescription>
      </CardHeader>
      {
        isCard && (
            <CardContent>
            <Button asChild>
              <Link href={SINGLE_POST(id)}>
                <MoveUpRight /> View{" "}
              </Link>
            </Button>
          </CardContent>
        )
      }

      {
        !isCard && (
          <CardFooter>
              <form action={deletePosts.bind(null,id as string)}>
                <Button variant={"destructive"}>Delete</Button>
              </form>
        </CardFooter>
        )
      }
      
    </Card>
  );
};

export default PostItems;
