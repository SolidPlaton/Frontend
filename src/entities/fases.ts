import { fase } from "../types/fase";
import { dodecaedro, hexaedro, icosaedro, octaedro, tetraedro } from "./solidos";

export const fase1:fase = {
    id: 1,
    nome: "Terremoto",
    titulo: "O Terremoto",
    assunto: "geometria",
    curiosidade: "O maior e mais potente terremoto registrado na história foi o ocorrido no Chile, em 1960, com 9.5 de magnitude na escala Richter.",
    img_path: "/images/fases/terremoto.png",
    solido: hexaedro
}

export const fase2:fase = {
    id: 2,
    nome: "Maremoto",
    titulo: "O Maremoto",
    assunto: "razao_proporcao",
    curiosidade: "Tsunamis são grandes ondas oceânicas causadas por perturbações como terremotos, erupções vulcânicas ou deslizamentos de terra submarinos.",
    img_path: "/images/fases/tsunami.png",
    solido: icosaedro
}

export const fase3:fase = {
    id: 3,
    nome: "Vulcão",
    titulo: "O Vulcão",
    assunto: "estatistica",
    curiosidade: "O maior vulcão terrestre é o Mauna Loa, no Havaí, com 4.169 metros de altura e 90 km de largura.",
    img_path: "/images/fases/vulcao.png",
    solido: tetraedro
}

export const fase4:fase = {
    id: 4,
    nome: "Tufão",
    titulo: "O Tufão",
    assunto: "porcentagem",
    curiosidade: "A diferença entre tufões, furacões e ciclones é apenas o local onde eles se formam.",
    img_path: "/images/fases/tufao.png",
    solido: octaedro
}

export const fase5:fase = {
    id: 5,
    nome: "Meteoro",
    titulo: "O Meteoro",
    assunto: "funcao",
    curiosidade: "O brilho intenso de um meteoro é causado pelo calor gerado pelo atrito com a atmosfera terrestre.",
    img_path: "/images/fases/meteoro.png",
    solido: dodecaedro
}