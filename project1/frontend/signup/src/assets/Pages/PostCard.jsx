const PostCard = () => {
  return (
    <div className="w-full max-w-sm bg-[#FBFAF6] border border-[#1F2937]/10 p-7
                     transition-all duration-300 hover:-translate-y-1
                     hover:shadow-[8px_8px_0_0_#1F2937]">
      {/* Post Title */}
      <h2 className="font-serif text-2xl leading-snug text-[#1F2937] mb-3">
        Designing Quiet Interfaces for Loud Ideas
      </h2>

      <div className="w-10 h-[3px] bg-[#C4573B] mb-4" />

      {/* Post Description */}
      <p className="text-[15px] leading-relaxed text-[#1F2937]/70">
        A field note on why restraint — not decoration — is what makes an
        interface feel considered. Fewer accents, sharper hierarchy, and
        copy that earns its place.
      </p>
    </div>
  );
};

export default PostCard;
