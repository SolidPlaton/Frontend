import FaseButton from "../../components/FaseButton"
import earth from "/images/earth-parents-wiki_ver_1-removebg-preview 1.png"
import meteoro from "/images/fases/meteoro.png"
import tufao from "/images/fases/tufao.png"
import vulcao from "/images/fases/vulcao.png"
import terremoto from "/images/fases/terremoto.png"
import tsunami from "/images/fases/tsunami.png"
import Layout from "../../components/Layout"


export default function Campanha() {

    
    return (
        <Layout>
            <img draggable="false" src={earth} alt="earth" className="min-w-6xl max-w-6xl filter opacity-50 select-none
            fixed top-3"/>

            <div className="absolute top-56 left-[730px]">
                <FaseButton img_path={terremoto} fase_id={1} 
                fase_nome="O Terremoto"
                curiosidade="O maior e mais potente terremoto registrado na história foi o ocorrido no Chile, em 1960, com 9.5 de magnitude na escala Richter." />
            </div>

            <div className="absolute top-[450px] left-[650px]">
                <FaseButton img_path={tsunami} fase_id={2} 
                fase_nome="O Tsunami"
                curiosidade="Tsunamis são grandes ondas oceânicas causadas por perturbações como terremotos, erupções vulcânicas ou deslizamentos de terra submarinos." />
            </div>

            <div className="absolute top-[410px] left-[400px]">
                <FaseButton img_path={vulcao} fase_id={3} 
                fase_nome="O Vulcão"
                curiosidade="O maior vulcão terrestre é o Mauna Loa, no Havaí, com 4.169 metros de altura e 90 km de largura." />
            </div>

            <div className="absolute top-36 left-[330px]">
                <FaseButton img_path={tufao} fase_id={4} 
                fase_nome="O Tufão"
                curiosidade="A diferença entre tufões, furacões e ciclones é apenas o local onde eles se formam." />
            </div>

            <div className="absolute top-5 left-[550px]">
                <FaseButton img_path={meteoro} fase_id={5} 
                fase_nome="O Meteoro"
                curiosidade="O brilho intenso de um meteoro é causado pelo calor gerado pelo atrito com a atmosfera terrestre." />
            </div>
        </Layout>
    )
}