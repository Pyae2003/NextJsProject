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
import { useRouter } from "next/navigation";
import { loginPath, POSTS } from "@/path";
import Link from "next/link";
import { resetPassword } from "../actions/resetPassword";
import { resetPasswordSchema } from "../schemas/auth.resetPassword";

const ResetPassword = () => {
    const router = useRouter();
    const { execute, isPending ,hasSucceeded ,hasErrored,result  } = useAction(resetPassword);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",

    },
  });

  function onSubmit({email}: z.infer<typeof resetPasswordSchema>) {
    execute({email});
  }

    useEffect(()=>{
      if(hasSucceeded){
        form.reset();
        toast.success("ResetPassword Success?", { position: "bottom-center" })

      }else if(hasErrored){
        toast.error("ResetPassword Error!", { position: "bottom-center" })
      }
    },[hasSucceeded,hasErrored,result]);

  return (
    <>
      <CardWrapper
        title="Reset Password"
        description="Enter Your Email for reset Your Password!"
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
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter a Number..."
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

          <Button type="submit" form="form-rhf-demo" disabled={isPending}>
            {isPending ? <LoaderCircle className="animate-spin h-4 w-4" /> : ""}
            Reset Password
          </Button>
        </Field>
      </CardWrapper>
    </>
  );
};


export default ResetPassword;