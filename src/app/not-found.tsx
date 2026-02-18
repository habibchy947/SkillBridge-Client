"use client";
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white ">
            <div className="max-w-2xl w-full text-center space-y-8">
                {/* Animated 404 */}
                <motion.h1
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-7xl md:text-9xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                    404
                </motion.h1>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-4"
                >
                    <h2 className="text-2xl md:text-3xl font-semibold">
                        Oops! Page not found
                    </h2>
                    <p className="text-slate-400 text-base md:text-lg">
                        The page you're looking for doesn't exist or has been moved.
                        Let’s get you back on track.
                    </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href="/">
                        <Button className="rounded-2xl px-6 py-5 text-base shadow-lg">
                            <Home className="mr-2 h-5 w-5" />
                            Go Home
                        </Button>
                    </Link>

                    <Button
                        variant="outline"
                        className="rounded-2xl px-6 py-5 text-black font-bold border-slate-600 hover:bg-slate-800"
                        onClick={() => router.replace("/")}
                    >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Go Back
                    </Button>
                </motion.div>

                {/* Decorative Glow */}
                <div className="absolute inset-0 -z-10 flex items-center justify-center">
                    <div className="w-96 h-96 bg-purple-600 opacity-20 blur-3xl rounded-full" />
                </div>
            </div>
        </div>
    );
}