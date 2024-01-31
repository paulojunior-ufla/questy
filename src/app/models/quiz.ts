import { Questao } from "./questao";

export type ResumoQuiz = {
    id: number;
    titulo: string;
    imgThumb: string;
    numQuestoes: number;
    categoria: string;
}

export type Quiz = {
    id: number;
    titulo: string;
    imgCapa: string;
    desc: string;
    numQuestoes: number;
    questoes: Questao[];  
}