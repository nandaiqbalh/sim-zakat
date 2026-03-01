import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";
import redirectIfAuthenticated from "../login/redirect-if-auth";

export const metadata = {
    title: "Daftar — SIM Zakat",
};

export default async function RegisterPage() {
    await redirectIfAuthenticated();
    return (
        <main className="min-h-screen flex bg-white">
            {/* Left panel – branding */}
            <div className="hidden lg:flex flex-col justify-between w-2/5 bg-green-700 p-10">
                <div>
                    <p className="text-2xl font-bold text-white tracking-tight">SIM Zakat</p>
                    <p className="text-green-200 text-sm mt-1">Sistem Informasi Manajemen Zakat</p>
                </div>
                <div className="space-y-4">
                    <p className="text-white text-3xl font-bold leading-snug">
                        Mulai Perjalanan<br />Pengelolaan Zakat Anda
                    </p>
                    <p className="text-green-200 text-sm leading-relaxed">
                        Bergabung dan kelola zakat masjid Anda secara digital, transparan, dan akuntabel.
                    </p>
                </div>
                <p className="text-green-300 text-xs">© 2026 SIM Zakat</p>
            </div>

            {/* Right panel – form */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-sm">
                    {/* Mobile logo */}
                    <div className="mb-8 lg:hidden text-center">
                        <p className="text-xl font-bold text-green-800">SIM Zakat</p>
                        <p className="text-gray-400 text-xs mt-0.5">Sistem Informasi Manajemen Zakat</p>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Buat Akun Baru</h1>
                    <p className="text-gray-500 text-sm mb-6">Daftarkan diri Anda untuk memulai.</p>

                    <RegisterForm />

                    <p className="text-center text-gray-500 text-xs mt-6">
                        Sudah punya akun?{" "}
                        <Link href="/login" className="text-green-700 font-semibold hover:underline">
                            Masuk
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
