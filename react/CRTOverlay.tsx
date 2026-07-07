/* Fixed scanline overlay — the tube-glass layer over the whole page.
   Mount once, last in the tree. Easy mode hides it purely in CSS:
   html[data-ez="true"] .crt-overlay. */
export default function CRTOverlay() {
  return (
    <div
      aria-hidden
      className="crt-overlay pointer-events-none fixed inset-0 z-[9999]"
      style={{
        background:
          "repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 3px)",
        mixBlendMode: "multiply",
      }}
    />
  );
}
