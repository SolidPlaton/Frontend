import Layout from "../../components/Layout";




export default function Sobre() {

    return (
        <Layout>
            <div className="w-full h-full flex flex-col justify-center items-center gap-y-7">

                <img className="w-32" src="/images/solidos/icosaedro.png" alt="solido" />

                <h2 className="text-white text-3xl font-bold font-inria-sans">Solid Platon</h2>

                <p className="w-2xl text-sky-50">O Solid Platon é uma aplicação desenvolvida como parte de um Trabalho de Conclusão de Curso (TCC) que tem como objetivo integrar o ensino de Matemática para o ENEM com elementos de gamificação. A proposta busca tornar o aprendizado mais atrativo e motivador, utilizando mecânicas de jogos para engajar os estudantes em uma das disciplinas mais desafiadoras e fundamentais do ensino médio. Espera-se que, por meio dessa abordagem lúdica e interativa, os alunos se sintam mais estimulados a persistir em sua jornada de estudos e a alcançar melhores resultados.</p>

                <p className="w-2xl text-sky-50">O Solid Platon oferece um <i>modo campanha</i> em que o jogador embarca em uma jornada em busca dos cinco Sólidos de Platão, que estão desaparecidos. Para recuperar cada um desses sólidos, o estudante deve superar fases compostas por cinco questões de Matemática baseadas no estilo do ENEM. Essa estrutura visa estimular o raciocínio lógico e a resolução de problemas por meio de uma narrativa envolvente, promovendo o engajamento contínuo com o conteúdo da disciplina.</p>
            </div>
            
        </Layout>
    )
}