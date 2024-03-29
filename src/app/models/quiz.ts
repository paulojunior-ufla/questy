import { Questao } from "./questao";

export type ResumoQuiz = {
    id: number;
    titulo: string;
    imgCapa: string;
    numQuestoes: number;
    categoria: string;
}

export type Quiz = {
    id: number;
    titulo: string;
    imgCapa: string;
    showCapa: boolean;
    desc: string;
    numQuestoes: number;
    questoes: Questao[];  
}