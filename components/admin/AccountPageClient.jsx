// components/admin/AccountPageClient.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { UserCircle, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { updateProfileAction } from "@/lib/actions/profile.actions";
import { changePasswordAction } from "@/lib/actions/auth.actions";
import ZakatPageHeader from "@/components/zakat/ZakatPageHeader";

// ── Schemas ──
const profileSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi.").trim(),
  phone: z
    .string()
    .regex(/^(2|0)[0-9]{8,13}$/, "Format nomor HP tidak valid. Contoh: 081234567890")
    .optional()
    .or(z.literal("")),
});

const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, "Password lama wajib diisi."),
    newPassword: z.string().min(8, "Password baru minimal 8 karakter."),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi."),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Konfirmasi password tidak cocok.",
    path: ["confirmPassword"],
  });

// ── Reusable input ──
function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}

function TextInput({ error, ...props }) {
  return (
    <input
      {...props}
      className={`w-full text-sm px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition
        ${error ? "border-red-400" : "border-gray-300"}`}
    />
  );
}

function PasswordInput({ error, ...props }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        {...props}
        type={show ? "text" : "password"}
        className={`w-full text-sm px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition pr-10
          ${error ? "border-red-400" : "border-gray-300"}`}
      />
      <button
        type="button"
        onClick={() => setShow((p) => !p)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        tabIndex={-1}
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
}

// ── Profile section ──
function ProfileSection({ initialUser, onSuccess }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: initialUser.name, phone: initialUser.phone ?? "" },
  });

  const onSubmit = async (values) => {
    const res = await updateProfileAction({ name: values.name, phone: values.phone });
    if (res.success) {
      toast.success("Profil berhasil diperbarui.");
      onSuccess?.();
      router.refresh();
    } else {
      toast.error(res.message ?? "Gagal memperbarui profil.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Field label="Nama Lengkap" error={errors.name?.message}>
        <TextInput
          type="text"
          placeholder="Ahmad Fauzi"
          error={errors.name?.message}
          {...register("name")}
        />
      </Field>

      <Field label="Email">
        <input
          type="email"
          value={initialUser.email}
          disabled
          className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed"
        />
        <p className="text-xs text-gray-400 mt-0.5">Email tidak dapat diubah.</p>
      </Field>

      <Field label="Nomor HP" error={errors.phone?.message}>
        <TextInput
          type="tel"
          placeholder="081234567890"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </Field>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="flex items-center gap-2 px-5 py-2 bg-green-700 text-white text-sm font-semibold rounded-lg hover:bg-green-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <CheckCircle2 className="w-4 h-4" />
          )}
          Simpan Perubahan
        </button>
      </div>
    </form>
  );
}

// ── Password section ──
function PasswordSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async (values) => {
    const res = await changePasswordAction({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      confirmNewPassword: values.confirmPassword,
    });
    if (res.success) {
      toast.success("Password berhasil diubah.");
      reset();
    } else {
      toast.error(res.message ?? "Gagal mengubah password.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Field label="Password Lama" error={errors.oldPassword?.message}>
        <PasswordInput
          placeholder="••••••••"
          error={errors.oldPassword?.message}
          {...register("oldPassword")}
        />
      </Field>

      <Field label="Password Baru" error={errors.newPassword?.message}>
        <PasswordInput
          placeholder="Min. 8 karakter"
          error={errors.newPassword?.message}
          {...register("newPassword")}
        />
      </Field>

      <Field label="Konfirmasi Password Baru" error={errors.confirmPassword?.message}>
        <PasswordInput
          placeholder="Ulangi password baru"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
      </Field>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-5 py-2 bg-green-700 text-white text-sm font-semibold rounded-lg hover:bg-green-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Lock className="w-4 h-4" />
          )}
          Ubah Password
        </button>
      </div>
    </form>
  );
}

// ── Main page ──
export default function AccountPageClient({ initialUser }) {
  return (
    <div className="w-full space-y-6">
      <ZakatPageHeader
        title="Akun Saya"
        subtitle="Kelola informasi profil dan keamanan akun Anda."
      />

      {/* Profile card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <UserCircle className="w-4 h-4 text-green-700" />
          <h2 className="text-sm font-semibold text-gray-800">Informasi Profil</h2>
        </div>
        <div className="p-6">
          <ProfileSection initialUser={initialUser} />
        </div>
      </div>

      {/* Password card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Lock className="w-4 h-4 text-green-700" />
          <h2 className="text-sm font-semibold text-gray-800">Ubah Password</h2>
        </div>
        <div className="p-6">
          <PasswordSection />
        </div>
      </div>
    </div>
  );
}
