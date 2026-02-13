import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SINGLE_POST, UPDATE_POST } from "@/path";
import { MoveUpRight } from "lucide-react";

import Link from "next/link";
import { info, User } from "../../../../generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import DeleteButton from "./DeleteButton";
import { isOwner } from "@/lib/isOwner";
import { isWeakMap } from "util/types";

interface Props extends info {
  user: User;
  isCard: boolean;
}

const PostItems = async ({
  id,
  name,
  content,
  user,
  isCard = true,
  status,
}: Props) => {
  return (
    <Card className="relative">
      <Badge
        className="absolute top-4 right-4"
        variant={status === "DONE" ? "default" : "outline"}
      >
        {status}
      </Badge>
      <CardHeader>
        <CardTitle> {name}</CardTitle>
        <CardDescription className={cn(isCard && "line-clamp-1")}>
          {" "}
          {content}
        </CardDescription>
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {user.name}
          </p>
        </div>
      </CardHeader>
      {isCard && (
        <CardContent>
          <Button className="mx-4" asChild>
            <Link href={SINGLE_POST(id)}>
              <MoveUpRight /> View
            </Link>
          </Button>
          {(await isOwner(user.id)) && (
            <Button variant={"secondary"} asChild>
              <Link href={UPDATE_POST(id)}>
                <MoveUpRight /> Edit
              </Link>
            </Button>
          )}
        </CardContent>
      )}

      {!isCard &&  await isOwner(user.id) && <DeleteButton id={id}  />}
    </Card>
  );
};

export default PostItems;
