export function Signature() {
  return (
    <a
      href="https://www.arnaudcrestey.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Ouvrir arnaudcrestey.com"
      className="inline-flex w-fit flex-col items-center text-center no-underline"
      style={{ paddingBottom: "14px" }}
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
        style={{
          display: "block",
          width: "72px",
          height: "1px",
          marginTop: "16px",
          backgroundColor: "#c8a46b",
        }}
      />
    </a>
  );
}
