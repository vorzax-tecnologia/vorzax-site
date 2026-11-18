import Image from "next/image";

/** Logotipo oficial preparado com fundo transparente no build. */
export function BrandLogo() {
  return (
    <Image
      src="/vorzax-logo-clean.png"
      alt="Vorzax Tecnologia"
      width={539}
      height={165}
      priority
      className="h-auto w-[174px] sm:w-[193px]"
    />
  );
}
