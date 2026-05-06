import Link from "next/link";

export function Signature() {
  return (
    <Link
      href="/"
      className="group inline-flex flex-col items-start gap-2 select-none"
    >
      <div className="flex flex-col items-start leading-none">
        <span className="font-serif text-[42px] tracking-[-0.06em] text-black/92 transition-opacity duration-300 group-hover:opacity-80">
          AC
        </span>

        <span className="mt-[2px] text-[11px] tracking-[0.18em] text-black/45">
          arnaudcrestey.com
        </span>
      </div>

      <span className="h-px w-16 bg-black/10 transition-all duration-300 group-hover:w-20 group-hover:bg-black/20" />
    </Link>
  );
}
