export function Signature() {
  return (
    <a
      href="https://www.arnaudcrestey.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Ouvrir arnaudcrestey.com"
      className="inline-flex w-fit shrink-0 flex-col items-center justify-center overflow-visible text-center no-underline"
    >
      <span
        className="font-serif text-black"
        style={{
          fontSize: "64px",
          lineHeight: "0.86",
          letterSpacing: "-0.16em",
        }}
      >
        AC
      </span>

      <span
        className="font-serif text-black"
        style={{
          marginTop: "12px",
          fontSize: "18px",
          lineHeight: "1",
        }}
      >
        arnaudcrestey.com
      </span>

      <span
        aria-hidden="true"
        className="mt-4 block h-px w-[72px] shrink-0 bg-[#c8a46b]"
      />
    </a>
  );
}
