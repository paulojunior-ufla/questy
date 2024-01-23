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
            this.conquistou()
            return true
        }
        return false
    }

}

export class AcertouTodasQuestoes extends Conquista {

    constructor() {
        super("fera", "Fera", "Você acertou 100% das questões de um quiz", "assets/images/fera.png")
    }

    ehValida(tentativas: Tentativa[]) {
        tentativas.forEach(t => {
            if (t.numAcertos == t.numQuestoes) {
                this.conquistou()
            }
        })
        return this.possui
    }

}

export class MuitasQuestoes extends Conquista {

    constructor() {
        super("perseverante", "Perseverante", "Você já respondeu mais de 50 questões", "assets/images/perseverante.png")
    }

    ehValida(tentativas: Tentativa[]) {
        let totalQuestoes = 0
        tentativas.forEach(t => {
            totalQuestoes += t.numQuestoes
        })
        if (totalQuestoes > 30) {
            this.conquistou()
            return true
        }
        return false
    }
}
