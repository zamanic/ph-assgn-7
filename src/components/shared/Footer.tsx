/**
 * Footer — exact Penpot spec §5.6
 * Outer: 1440 × 69 full-width, top 1px base-300 #E1E8E1 border, bg base-100 #FAFCFA.
 * Inner: centered 1152 × 68, padding 24/16 (top-right-bottom-left as spec),
 *   justify-content: space-between; single row of 2 text nodes.
 * Left side:  "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।" 14/400, #1D271F 100%
 * Right side: "সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।" 14/400, #1D271F 100%
 *   → Design explicitly has NO logo, NO additional quick links in Footer.
 */
const Footer = () => {
  return (
    <footer
      className="w-full bg-[#FAFCFA]"
      style={{ borderTop: "1px solid #E1E8E1", minHeight: 69 }}
    >
      <div
        className="mx-auto max-w-[1152px] px-4 w-full"
        style={{
          minHeight: 68,
          padding: "24px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          rowGap: 12,
        }}
      >
        <p
          className="m-0 text-[#1D271F]"
          style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.4286 }}
        >
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p
          className="m-0 text-[#1D271F]"
          style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.4286 }}
        >
          © ২০২৬ · সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
