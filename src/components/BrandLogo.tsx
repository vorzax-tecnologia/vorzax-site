import Image from "next/image";

/**
 * Um único logotipo para o cabeçalho principal, rodapé e páginas internas.
 * A imagem é a mesma peça da marca; o blend evita que o fundo escuro
 * incorporado ao WebP apareça como um retângulo sobre o cabeçalho.
 */
export function BrandLogo() {
  return (
    <Image
      src="/vorzax-logo-header.webp"
      alt="Vorzax Tecnologia"
      width={539}
      height={165}
      priority
      className="h-auto w-[174px] sm:w-[193px] mix-blend-screen"
    />
  );
}
