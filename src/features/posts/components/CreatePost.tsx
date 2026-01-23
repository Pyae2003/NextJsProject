"use client";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";import { Textarea } from "@/components/ui/textarea";
import { createPost } from "../actions/createPost";
import { useAction } from "next-safe-action/hooks";
import CardWrapper from "./CardWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { postCreateSchema } from "../schema";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const CreatePost = () => {
  const { execute, isPending ,hasSucceeded ,hasErrored  } = useAction(createPost);

  const form = useForm<z.infer<typeof postCreateSchema>>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: {
      name: "",
      content: "",
    },
  });

  function onSubmit(data: z.infer<typeof postCreateSchema>) {
    execute({name : data.name,content : data.content});
  };

  useEffect(()=>{
    if(hasSucceeded){
      form.reset();
      toast.success("Post has been created", { position: "bottom-center" });
    }else if(hasErrored){
      toast.error("Post created Error!", { position: "bottom-center" })
    }
  },[hasSucceeded,hasErrored]);

  return (
    <>
      <CardWrapper
        title="Create New Post"
        description="This will be create new post!"
      >
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Name : </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="text"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Content : </FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup> 
        </form>
        <Field orientation="horizontal" className="mt-3">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo" disabled={isPending}>
            {isPending?<LoaderCircle className="animate-spin h-4 w-4"/>: ""}Submit
          </Button>
        </Field>
      </CardWrapper>
    </>
  );
};

export default CreatePost;
