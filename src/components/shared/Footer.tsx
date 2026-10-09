import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-base-100 border-t border-base-300 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর লোগো"
              width={36}
              height={36}
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-primary">বাজার দর</span>
              <p className="text-sm text-base-content/70">
                প্রয়োজনীয় পণ্যের দাম এক নজরে।
              </p>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-base-content/70 max-w-md">
              সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
            </p>
            <div className="flex gap-4 justify-center md:justify-end mt-3 text-sm text-base-content/60">
              <Link href="/about" className="hover:text-primary transition-colors">
                আমাদের সম্পর্কে
              </Link>
              <Link href="/contact" className="hover:text-primary transition-colors">
                যোগাযোগ
              </Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">
                গোপনীয়তা নীতি
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-base-300 text-center text-xs text-base-content/50">
          © {new Date().getFullYear()} বাজার দর। সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
};

export default Footer;
