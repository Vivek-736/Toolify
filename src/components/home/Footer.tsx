import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-slate-300 bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-100">
          {/* Left Column: Brand & Tagline */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <Image src="/favicon.png" alt="Toolify Logo" width={32} height={32} className="h-8 w-8 rounded-lg" />
              <span className="text-xl font-bold text-slate-900">Toolify</span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
              Your all-in-one AI assistant. <br />
              One chat. Every answer.
            </p>
          </div>

          {/* Right Columns: Links */}
          <div className="md:col-span-6 grid grid-cols-3 gap-6 text-sm">
            {/* Product */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900">Product</h4>
              <ul className="space-y-2 text-slate-500">
                <li><a href="#features" className="hover:text-slate-900 transition">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-slate-900 transition">How it works</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900">Resources</h4>
              <ul className="space-y-2 text-slate-500">
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition">GitHub</a></li>
                <li><a href="#" className="hover:text-slate-900 transition">Documentation</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900">Legal</h4>
              <ul className="space-y-2 text-slate-500">
                <li><a href="#" className="hover:text-slate-900 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-slate-900 transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 -mb-8 text-center text-xs font-medium text-slate-500">
          Made with <span className="text-pink-500">❤️</span> by Vivek
        </div>
      </div>
    </footer>
  );
}