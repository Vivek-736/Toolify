import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <SignUp
        forceRedirectUrl="/dashboard"
        appearance={{
          elements: {
            cardBox: "shadow-xl border border-slate-200/80 rounded-3xl bg-white w-full",
            headerTitle: "text-slate-900 font-bold text-2xl text-center",
            headerSubtitle: "text-slate-500 text-sm text-center",
            socialButtonsBlockButton: "border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-700 font-medium text-sm py-2.5",
            formButtonPrimary: "bg-slate-900 hover:bg-slate-800 rounded-xl text-white font-medium text-sm py-3",
            formFieldInput: "rounded-xl border-slate-200 focus:border-blue-600 focus:ring-blue-600 text-slate-900 text-sm",
            footerActionLink: "text-slate-900 font-bold hover:underline",
          },
        }}
      />
    </div>
  );
}