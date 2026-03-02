// components/auth/LoginForm.jsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

import { loginSchema } from "@/lib/validations/auth.schema";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import AuthDivider from "./AuthDivider";
import GoogleButton from "./GoogleButton";
import ErrorDialog from "@/components/ui/error-dialog";

export default function LoginForm() {
    const router = useRouter();
    const [dialog, setDialog] = useState({ open: false, title: "", description: "" });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (values) => {
        const res = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
        });

        if (res?.error) {
            const message = "Email atau password salah. Periksa kembali kredensial Anda.";
            setDialog({ open: true, title: "Login Gagal", description: message });
            return;
        }

        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();
        const role = session?.user?.role;

        if (role === "SUPERADMIN") {
            router.push("/superadmin?toast=welcome");
        } else if (role === "ADMIN") {
            router.push("/admin/dashboard?toast=welcome");
        } else {
            router.push("/?toast=welcome");
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
                <AuthInput
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="email@contoh.com"
                    error={errors.email?.message}
                    autoComplete="email"
                    {...register("email")}
                />
                <AuthInput
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    error={errors.password?.message}
                    autoComplete="current-password"
                    {...register("password")}
                />

                <AuthButton loading={isSubmitting}>Masuk</AuthButton>
                <AuthDivider />
                <GoogleButton callbackUrl="/" />
            </form>
        </>
    );
}