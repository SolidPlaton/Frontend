import FaseButton from "../../components/FaseButton"
import earth from "/images/earth-parents-wiki_ver_1-removebg-preview 1.png"
import Layout from "../../components/Layout"
import { fase1, fase2, fase3, fase4, fase5 } from "../../entities/fases"


export default function Campanha() {

    
    return (
        <Layout>
            <img draggable="false" src={earth} alt="earth" className="min-w-6xl max-w-6xl filter opacity-50 select-none
            fixed top-3"/>

            <div className="absolute top-56 left-[730px]">
                <FaseButton fase={fase1} />
            </div>

            <div className="absolute top-[450px] left-[650px]">
                <FaseButton fase={fase2} />
            </div>

            <div className="absolute top-[410px] left-[400px]">
                <FaseButton fase={fase3} />
            </div>

            <div className="absolute top-36 left-[330px]">
                <FaseButton fase={fase4} />
            </div>

            <div className="absolute top-5 left-[550px]">
                <FaseButton fase={fase5} />
            </div>
        </Layout>
    )
}