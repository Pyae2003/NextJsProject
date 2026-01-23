"use client"
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAction } from "next-safe-action/hooks";
import { deletePosts } from "../actions/deletePosts";

type DeleteButtonProps = {
  id: string;
};
const DeleteButton = ({ id }: DeleteButtonProps) => {

    const { isPending,execute} = useAction(deletePosts);

  return (
    <div>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"} size={"sm"}>
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action delete your post?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button variant={"destructive"} size={"sm"} className="text-white" disabled={isPending} onClick={()=>{execute({id})}}>
                  Delete
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </div>
  );
};

export default DeleteButton;
