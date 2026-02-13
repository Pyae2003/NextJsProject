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
import { authSignUpSchema } from "../schemas/auth.sign-up";
import { register } from "../actions/register";
import {  redirect, useRouter } from "next/navigation";
import { loginPath } from "@/path";
import Link from "next/link";
import GitHubForm from "./GitHubForm";
import GoogleForm from "./GoogleForm";

const Register = () => {
    const router = useRouter();
    const { execute, isPending ,result  } = useAction(register);

  const form = useForm<z.infer<typeof authSignUpSchema>>({
    resolver: zodResolver(authSignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      comfirmPassword: "",
    },
  });

  function onSubmit({name,email,password,comfirmPassword}: z.infer<typeof authSignUpSchema>) {
    execute({name,email,password,comfirmPassword});
  }

    useEffect(()=>{
      const data = result.data;

      if(!data){
        return;
      }

      if(data?.success){
        toast.success("Sign In Success",{position : "top-center"});
        router.push("/");
        router.refresh();
      }
      if(!data?.success) {
        toast.error(result.data?.error);
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
                    placeholder="Enter a Number..."
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
            <Controller
              name="comfirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Comfirm Password : </FieldLabel>
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
      
          <Button type="submit" form="form-rhf-demo" className="w-full  my-5" disabled={isPending}>
            {isPending ? <LoaderCircle className="animate-spin h-4 w-4" /> : ""}
            Register
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
    <div className="text-sm font-medium text-muted-foreground flex space-x-1">
      <p>Do you have an account?</p>
      <Link href={loginPath} className="underline">login</Link>
    </div>
  )
}

export default Register;
