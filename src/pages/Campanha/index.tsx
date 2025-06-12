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
            <img draggable="false" src={earth} alt="earth" className="min-w-6xl max-w-6xl
            fixed top-3"/>

            <div className="absolute top-64 left-[730px]">
                <FaseButton img_path={terremoto} fase_id={1} />
            </div>

            <div className="absolute top-[500px] left-[650px]">
                <FaseButton img_path={tsunami} fase_id={2} />
            </div>

            <div className="absolute top-[450px] left-[400px]">
                <FaseButton img_path={vulcao} fase_id={3} />
            </div>

            <div className="absolute top-36 left-[330px]">
                <FaseButton img_path={tufao} fase_id={4} />
            </div>

            <div className="absolute top-5 left-[550px]">
                <FaseButton img_path={meteoro} fase_id={5} />
            </div>
        </Layout>
    )
}