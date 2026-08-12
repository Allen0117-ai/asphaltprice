import Image from "next/image";
import Link from "next/link";

export function AsphaltFormulaFigure() {
  return (
    <figure className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <Image
        src="/asphalt-tonnage-formula.svg"
        alt="Asphalt tonnage formula showing area multiplied by thickness and density, divided by 2,000, then adjusted for waste"
        width={1200}
        height={630}
        sizes="(max-width: 768px) 100vw, 900px"
        className="h-auto w-full"
      />
      <figcaption className="border-t border-zinc-200 px-4 py-3 text-sm leading-6 text-zinc-600">
        The 145 lb/ft³ density is a planning assumption, not a mix-ticket value. Read the{" "}
        <Link href="/methodology" className="font-medium text-amber-800 underline underline-offset-4">
          formula notes and primary sources
        </Link>
        .
      </figcaption>
    </figure>
  );
}
