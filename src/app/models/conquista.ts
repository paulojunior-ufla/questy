import { Tentativa } from "./tentativa"

export abstract class Conquista {

    constructor(
        private _codigo: string,
        private _nome: string,
        private _desc: string,
        private _img: string,
        private _possui: boolean = false
    ) { }

    get codigo() { return this._codigo }
    get nome() { return this._nome }
    get desc() { return this._desc }
    get img() { return this._img }
    get possui() { return this._possui }
    conquistou() { this._possui = true }

    abstract ehValida(tentativas: Tentativa[]): boolean
}

export class PrimeiroQuizConcluido extends Conquista {

    constructor() {
        super("curioso", "Curioso", "Você finalizou seu primeiro quiz", "assets/images/curioso.png")
    }

    ehValida(tentativas: Tentativa[]) {
        if (tentativas.length > 0) {
            return true
        }
        return false
    }

}

export class AcertouTodasQuestoes extends Conquista {

    constructor() {
        super("inteligente", "inteligente", "Você acertou todas as questões de um quiz", "assets/images/inteligente.png")
    }

    ehValida(tentativas: Tentativa[]) {
        for (let i = 0; i < tentativas.length; i++) {
            let t = tentativas[i]
            if (t.numAcertos == t.numQuestoes) {
                return true
            }
        }
        return false
    }

}

export class AcertouTodasQuestoesVariasVezes extends Conquista {

    constructor() {
        super("mito", "Mito", "Você acertou todas as questões de mais de 10 quizzes", "assets/images/mito.png")
    }

    ehValida(tentativas: Tentativa[]) {
        let totalQuizzes = 0
        for (let i = 0; i < tentativas.length; i++) {
            let t = tentativas[i]
            if (t.numAcertos == t.numQuestoes) {
                totalQuizzes += 1
            }
        }
        return totalQuizzes > 10
    }

}

export class RespondeuVariasQuestoes extends Conquista {

    constructor() {
        super("engajado", "Engajado", "Você já respondeu mais de 50 questões", "assets/images/engajado.png")
    }

    ehValida(tentativas: Tentativa[]) {
        let totalQuestoes = 0
        tentativas.forEach(t => {
            totalQuestoes += t.numQuestoes
        })
        return totalQuestoes > 50
    }
}

export class RespondeuMuitasQuestoes extends Conquista {

    constructor() {
        super("produtivo", "Produtivo", "Você já respondeu mais de 100 questões", "assets/images/produtivo.png")
    }

    ehValida(tentativas: Tentativa[]) {
        let totalQuestoes = 0
        tentativas.forEach(t => {
            totalQuestoes += t.numQuestoes
        })
        return totalQuestoes > 100
    }
}

export class RealizouMaisJogadas extends Conquista {

    constructor() {
        super("perseverante", "perseverante", "Você realizou mais de uma jogada em um quiz", "assets/images/perseverante.png")
    }

    ehValida(tentativas: Tentativa[]) {
        for (let i = 0; i < tentativas.length; i++) {
            let t = tentativas[i]
            if (t.numJogadas > 1) {
                return true
            }
        }
        return false
    }

}
