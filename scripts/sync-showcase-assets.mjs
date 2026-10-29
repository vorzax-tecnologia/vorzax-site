// Importa, durante o build, a marca oficial publicada e três fotografias
// ilustrativas licenciadas para uso comercial no Unsplash.
// Arquivos estáticos ficam no próprio deployment: sem hotlink em produção.
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const output = join(process.cwd(), "public");
const assets = [
  {
    name: "vorzax-logo-header.webp",
    source: "https://www.vorzax.com.br/vorzax-logo-header.webp",
    type: "marca oficial da Vorzax",
  },
  {
    name: "demo-hvac-workspace.webp",
    source: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=960&h=720&fit=crop&fm=webp&q=77",
    type: "fotografia ilustrativa de ambiente comercial",
  },
  {
    name: "demo-accounting-workspace.webp",
    source: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=960&h=720&fit=crop&fm=webp&q=77",
    type: "fotografia ilustrativa de ambiente administrativo",
  },
  {
    name: "demo-architecture-residence.webp",
    source: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=960&h=720&fit=crop&fm=webp&q=79",
    type: "fotografia ilustrativa de projeto arquitetônico",
  },
];

function isWebP(buffer) {
  return buffer.length > 1024 && buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP";
}

await mkdir(output, { recursive: true });

for (const asset of assets) {
  const filepath = join(output, asset.name);
  let current;
  try {
    current = await readFile(filepath);
  } catch {
    current = null;
  }
  // Preferir o arquivo válido já instalado durante desenvolvimento local.
  if (current && isWebP(current)) {
    console.log(`[Vorzax] Asset disponível: ${asset.name}`);
    continue;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 18000);
  let data;
  try {
    const response = await fetch(asset.source, {
      signal: controller.signal,
      headers: { "User-Agent": "Vorzax-Website-Asset-Sync/1.0" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    data = Buffer.from(await response.arrayBuffer());
    if (!isWebP(data)) throw new Error("Imagem WebP inválida ou incompleta");
  } catch (error) {
    throw new Error(`Não foi possível obter ${asset.type} (${asset.name}): ${error.message}`);
  } finally {
    clearTimeout(timeout);
  }

  const temporaryPath = filepath + ".tmp";
  try {
    await writeFile(temporaryPath, data);
    await rename(temporaryPath, filepath);
  } catch (error) {
    await rm(temporaryPath, { force: true });
    throw error;
  }
  console.log(`[Vorzax] Importado ${asset.type}: ${asset.name} (${data.length} bytes)`);
}
