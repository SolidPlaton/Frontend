import earth from "/images/earth-parents-wiki_ver_1-removebg-preview 1.png"


export default function Campanha() {

    
    return (
        <div className="bg-[url('/images/universo.jpg')] w-screen h-screen overflow-hidden
            relative">
            <img draggable="false" src={earth} alt="earth" className="min-w-6xl max-w-6xl
            fixed top-3"/>
        </div>
    )
}