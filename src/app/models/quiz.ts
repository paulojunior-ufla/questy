import { Questao } from "./questao";

export type ResumoQuiz = {
    id: number;
    titulo: string;
    imgCapa: string;
    numQuestoes: number;
}

export type Quiz = {
    id: number;
    titulo: string;
    imgCapa: string;
    desc: string;
    numQuestoes: number;
    questoes: Questao[];  
}