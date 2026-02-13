"use client";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useAction } from "next-safe-action/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import CardWrapper from "@/components/CardWrapper";
import { login } from "../actions/login";
import { authSignInSchema } from "../schemas/auth.sign-in";
import Link from "next/link";
import { registerPath, resetPasswordPath } from "@/path";
import GitHubForm from "./GitHubForm";
import { useRouter } from "next/navigation";
import GoogleForm from "./GoogleForm";

const Login = () => {
    const router = useRouter();

    const { execute, isPending ,result  } = useAction(login);

  const form = useForm<z.infer<typeof authSignInSchema>>({
    resolver: zodResolver(authSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit({email,password}: z.infer<typeof authSignInSchema>) {
    execute({email,password});
  }

     useEffect(()=>{
          const data = result.data;
    
          if(!data){
            return;
          }
    
          if(data?.success){
            toast.success("Sign In Success",{position : "top-center"})
            router.push("/");
            router.refresh();
          }
          if(!data?.success) {
            toast.error(result.data?.error)
          }
        },[result]);
    

  return (
    <>
      <CardWrapper
        title="Create New Post"
        description="This will be create new post!"
        footer={<Footer/>}
      >
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email : </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    autoComplete="false"
                    type="text"
                    placeholder="example@gmail.com"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password : </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    autoComplete="false"
                    type="password"
                    placeholder="**********"
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
          <Button type="submit" form="form-rhf-demo" className="w-full my-5" disabled={isPending}>
            {isPending ? <LoaderCircle className="animate-spin h-4 w-4" /> : ""}
            Submit
          </Button>
        </Field>
        <hr className="text-muted-foreground my-4" />
        <GitHubForm/>
        <hr className="text-muted-foreground my-4" />
        <GoogleForm/>
      </CardWrapper>
    </>
  );
};

const Footer = () => {
  return (
    <div className="flex justify-between w-full">
      <div className="text-sm font-medium text-muted-foreground flex space-x-1">
        <p>Don&apos;t have an accound?</p>
        <Link href={registerPath} className="underline">register</Link>
      </div>
      <div>
        <Link href={resetPasswordPath} className="text-sm font-medium text-muted-foreground underline">forget-password?</Link>
      </div>
    </div>
  )
}

export default Login;
