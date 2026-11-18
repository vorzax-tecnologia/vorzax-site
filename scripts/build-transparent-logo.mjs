/**
 * Normaliza o LOGOTIPO OFICIAL existente para fundo transparente, preservando
 * as formas, cores e proporções da imagem de origem. Não redesenha a marca.
 * O WebP tem fundo azul quase preto incorporado; CSS blend-mode sozinho não
 * corrige o arquivo e provoca um retângulo em alguns temas.
 */
import sharp from "sharp";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

const root=join(process.cwd(),"public");
const original=join(root,"vorzax-logo-header.webp");
const target=join(root,"vorzax-logo-clean.png");

const image=sharp(await readFile(original));
const {data,info}=await image.ensureAlpha().raw().toBuffer({resolveWithObject:true});
if(info.channels!==4 || info.width<250 || info.height<70)throw Error("Logo de origem inválido");

const corners=[];
const inset=Math.max(3,Math.floor(Math.min(info.width,info.height)*0.04));
const add=(x,y)=>{
  const i=(y*info.width+x)*4;
  corners.push([data[i],data[i+1],data[i+2]]);
};
for(let y=0;y<inset;y+=2)for(let x=0;x<inset;x+=2){
  add(x,y);add(info.width-1-x,y);add(x,info.height-1-y);add(info.width-1-x,info.height-1-y);
}
function median(c) {
  const a=corners.map(v=>v[c]).sort((a,b)=>a-b);
  return a[Math.floor(a.length/2)];
}
const bg=[median(0),median(1),median(2)];
if(Math.max(...bg)>85)throw Error("Fundo inesperadamente claro no arquivo oficial");
let visible=0;
for(let i=0;i<data.length;i+=4){
  const dist=Math.max(
    Math.abs(data[i]-bg[0]),
    Math.abs(data[i+1]-bg[1]),
    Math.abs(data[i+2]-bg[2])
  );
  // Fundo uniforme desaparece; bordas e brilho recebem antialias suave.
  const opacity=Math.max(0,Math.min(1,(dist-13)/56));
  const a=Math.round(data[i+3]*opacity);
  data[i+3]=a;
  if(a>80)visible++;
}
if(visible/(info.width*info.height)<0.025)throw Error("Máscara excessiva: a marca ficou ilegível");
await sharp(data,{raw:{width:info.width,height:info.height,channels:4}})
  // Aspecto original intacto, com canvas do mesmo tamanho das páginas.
  .resize(539,165,{fit:"contain",background:{r:0,g:0,b:0,alpha:0}})
  .png({compressionLevel:9,palette:false})
  .toFile(target);
console.log("[Vorzax] Logotipo sem fundo produzido a partir do arquivo oficial:",info.width+"x"+info.height);
