import FaseButton from "../../components/FaseButton"
import earth from "/images/earth-parents-wiki_ver_1-removebg-preview 1.png"
import meteoro from "/images/fases/meteoro.jpg"
import tornado from "/images/fases/tornado.jpg"
import vulcao from "/images/fases/vulcao.jpg"
import terremoto from "/images/fases/terremoto.jpg"
import tsunami from "/images/fases/tsunami.jpg"


export default function Campanha() {

    
    return (
        <div className="bg-[url('/images/universo.jpg')] w-screen h-screen overflow-hidden
            relative">
            <img draggable="false" src={earth} alt="earth" className="min-w-6xl max-w-6xl
            fixed top-3"/>

            <div className="absolute top-14 left-5/12">
                <FaseButton img_path={meteoro} />
            </div>

            <div className="absolute top-52 left-3/12">
                <FaseButton img_path={tornado} />
            </div>

            <div className="absolute top-[450px] left-4/12">
                <FaseButton img_path={vulcao} />
            </div>

            <div className="absolute top-64 left-[730px]">
                <FaseButton img_path={terremoto} />
            </div>

            <div className="absolute top-[500px] left-6/12">
                <FaseButton img_path={tsunami} />
            </div>
        </div>
    )
}