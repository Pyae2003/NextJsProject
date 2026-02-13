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
import { useRouter, useSearchParams } from "next/navigation";
import { changePasswordSchema } from "../schemas/auth.changePassword";
import { changePassword } from "../actions/changePassword";
import { loginPath } from "@/path";


const ChangePassword = () => {
    const router = useRouter();

    const { execute, isPending ,hasSucceeded ,hasErrored,result  } = useAction(changePassword);

    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    
    if (!token) {
        router.push("/login");
    };
      
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      token: token ?? ""
    },
  });

  function onSubmit({password,token}: z.infer<typeof changePasswordSchema>) {
    execute({password,token});
  }

  useEffect(() => {
    if (hasSucceeded) {
      form.reset();
      toast.success(result.data?.message ?? "Password changed successfully!", {
        position: "bottom-center",
      });

      // Optional: redirect after success
      router.push(loginPath);
    }

    if (hasErrored) {
      toast.error("Password reset failed!", {
        position: "bottom-center",
      });
    }
  }, [hasSucceeded, hasErrored, result, form, router]);

  return (
    <>
      <CardWrapper
      title="Reset Password"
      description="Enter your new password below."
      >
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
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
          <Button type="submit" form="form-rhf-demo" disabled={isPending}>
            {isPending ? <LoaderCircle className="animate-spin h-4 w-4" /> : ""}
            Change Password
          </Button>
        </Field>
      </CardWrapper>
    </>
  );
};



export default ChangePassword;
