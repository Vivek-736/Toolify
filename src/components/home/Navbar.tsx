"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Navbar() {
  const { user, isLoaded } = useUser();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.header 
      className="fixed top-0 z-50 w-full transition-colors duration-300"
      initial={{ backgroundColor: "rgba(255, 255, 255, 1)", borderBottom: "1px solid transparent" }}
      animate={{ 
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 1)",
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        borderBottom: scrolled ? "1px solid rgba(226, 232, 240, 0.8)" : "1px solid transparent",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 transition hover:opacity-90">
          <Image
            src="/favicon.png"
            alt="Toolify Logo"
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg"
          />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Toolify
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            onClick={(e) => handleSmoothScroll(e, "features")}
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900 cursor-pointer"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => handleSmoothScroll(e, "how-it-works")}
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900 cursor-pointer"
          >
            How it works
          </a>
          <a
            href="https://github.com/Vivek-736"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            GitHub
          </a>
        </nav>

        {/* Action / Auth Button */}
        <div className="flex items-center gap-4">
          {!isLoaded ? (
            <div className="h-10 w-28 animate-pulse rounded-xl bg-slate-100" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button className="cursor-pointer gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700 shadow-sm transition">
                  Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <Link href="/dashboard">
              <Button className="cursor-pointer gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700 shadow-sm transition">
                Start Chat
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  );
}