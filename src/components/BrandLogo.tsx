import Image from "next/image";

/** Logotipo oficial preparado com fundo transparente no build. */
export function BrandLogo({ priority = true }: { priority?: boolean } = {}) {
  return (
    <Image
      src="/vorzax-logo-clean.png"
      alt="Vorzax Tecnologia"
      width={539}
      height={165}
      priority={priority}
      sizes="(max-width: 639px) 174px, 193px"
      className="h-auto w-[174px] sm:w-[193px]"
    />
  );
}
