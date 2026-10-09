import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg">
        <div className="text-[120px] md:text-[160px] font-black leading-none bg-gradient-to-br from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
          ৪০৪
        </div>
        <div className="text-6xl md:text-7xl mb-6">🔍</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-error">
          পেজটি পাওয়া যায়নি
        </h1>
        <p className="text-base-content/60 text-lg mb-10 leading-relaxed">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি বিদ্যমান নেই বা মুছে ফেলা হয়েছে।
          অনুগ্রহপূর্বক হোম পেজে ফিরে যান।
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn btn-primary btn-lg gap-2"
          >
            <span>🏠</span>
            হোম পেজে ফিরে যান
          </Link>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
            className="btn btn-outline btn-lg gap-2"
          >
            <span>←</span>
            পূর্ববর্তী পেজে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
