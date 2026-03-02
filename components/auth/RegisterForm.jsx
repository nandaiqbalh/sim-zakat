// components/auth/RegisterForm.jsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerSchema } from "@/lib/validations/auth.schema";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import AuthDivider from "./AuthDivider";
import GoogleButton from "./GoogleButton";
import ErrorDialog from "@/components/ui/error-dialog";
import StrengthBar from "@/components/ui/strength-bar";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const [dialog, setDialog] = useState({ open: false, title: "", description: "" });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  const onSubmit = async (values) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          phone: values.phone,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        const msg = data.message || "Pendaftaran gagal. Silakan coba lagi.";
        setDialog({ open: true, title: "Pendaftaran Gagal", description: msg });

        if (/phone|hp|telepon/i.test(msg)) setError("phone", { message: msg });
        if (/email/i.test(msg)) setError("email", { message: msg });
      } else {
        router.push("/login?registered=1");
      }
    } catch {
      setDialog({ open: true, title: "Kesalahan Server", description: "Terjadi kesalahan. Silakan coba lagi." });
    }
  };

  return (
    <>
      <ErrorDialog
        open={dialog.open}
        title={dialog.title}
        description={dialog.description}
        onClose={() => setDialog((d) => ({ ...d, open: false }))}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AuthInput
            id="name"
            label="Full Name"
            placeholder="Your name"
            error={errors.name?.message}
            autoComplete="name"
            {...register("name")}
          />
        </div>
        <AuthInput
          id="phone"
          label="Phone Number"
          type="tel"
          placeholder="081234567890"
          error={errors.phone?.message}
          autoComplete="tel"
          {...register("phone")}
        />
        <AuthInput
          id="email"
          label="Email"
          type="email"
          placeholder="bruno-fernandes@gmail.com"
          error={errors.email?.message}
          autoComplete="email"
          {...register("email")}
        />
        <AuthInput
          id="password"
          label="Password"
          type="password"
          placeholder="Min. 8 characters"
          error={errors.password?.message}
          autoComplete="new-password"
          {...register("password")}
        />
        <StrengthBar password={passwordValue} />
        <AuthInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Repeat password"
          error={errors.confirmPassword?.message}
          autoComplete="new-password"
          {...register("confirmPassword")}
        />
        <AuthButton loading={isSubmitting}>Buat Akun</AuthButton>
        <AuthDivider />
        <GoogleButton callbackUrl="/" />
        <p className="text-center text-neutral-600 text-[11px] tracking-wide">
          Already have an account?{" "}
          <Link href="/login" className="text-neutral-800 font-medium hover:text-neutral-950 transition-colors">
            Log in here
          </Link>
        </p>
      </form>
    </>
  );
}