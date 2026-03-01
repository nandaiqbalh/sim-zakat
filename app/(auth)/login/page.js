import LoginForm from "@/components/auth/LoginForm";
import ToastClient from "@/components/ui/ToastClient";
import redirectIfAuthenticated from "./redirect-if-auth";
import Link from "next/link";
import { Home } from "lucide-react";

export const metadata = {
    title: "Masuk — SIM Zakat",
};

export default async function LoginPage(props) {
    await redirectIfAuthenticated();
    const searchParams = props.searchParams ? await props.searchParams : {};
    const justRegistered = searchParams?.registered === "1";
    const showWelcome = searchParams?.toast === "welcome";

    return (
        <>
            <ToastClient registered={justRegistered} welcome={showWelcome} />
            <main className="min-h-screen flex bg-white">
                {/* Left panel – branding */}
                <div className="hidden lg:flex flex-col justify-between w-2/5 bg-green-700 p-10">
                    <div>
                        <p className="text-2xl font-bold text-white tracking-tight">SIM Zakat</p>
                        <p className="text-green-200 text-sm mt-1">Sistem Informasi Manajemen Zakat</p>
                    </div>
                    <div className="space-y-4">
                        <p className="text-white text-3xl font-bold leading-snug">
                            Kelola Zakat<br />Lebih Mudah &amp; Transparan
                        </p>
                        <p className="text-green-200 text-sm leading-relaxed">
                            Platform digital untuk manajemen zakat masjid secara terintegrasi — dari penerimaan hingga distribusi.
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

                        <h1 className="text-2xl font-bold text-gray-900 mb-1">Selamat Datang</h1>
                        <p className="text-gray-500 text-sm mb-6">Masuk ke akun SIM Zakat Anda.</p>

                        <LoginForm />

                        <p className="text-center text-gray-500 text-xs mt-6">
                            Belum punya akun?{" "}
                            <Link href="/register" className="text-green-700 font-semibold hover:underline">
                                Daftar Sekarang
                            </Link>
                        </p>
                        <p className="text-center text-gray-500 text-xs mt-2">
                            <Link href="/" className="inline-flex items-center justify-center gap-1 text-gray-600 hover:text-green-700 transition-colors">
                                <Home className="w-4 h-4" /> Beranda
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}
