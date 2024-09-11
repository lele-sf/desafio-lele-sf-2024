class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];

        this.animais = {
            LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" }; // 4.2)
        }
    
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida" }; // 5.2)
        }
    
        const infoAnimal = this.animais[animal];
        const recintosViaveis = [];
    
        for (const recinto of this.recintos) {
            if (!infoAnimal.biomas.some(bioma => recinto.bioma.includes(bioma))) {
                continue;
            }
    
            let espacoOcupado = recinto.animais.reduce((total, a) => total + a.quantidade * this.animais[a.especie].tamanho, 0);
            let espacoNecessario = quantidade * infoAnimal.tamanho;
    
            if (recinto.animais.length > 0) {
                const outraEspecie = recinto.animais[0].especie;
                
                // Carnívoros não podem conviver com herbívoros - 2)
                if (infoAnimal.carnivoro || this.animais[outraEspecie].carnivoro) {
                    continue;
                }
    
                // Se forem espécies diferentes, adicionar 1 ao espaço necessário - 6)
                if (outraEspecie !== animal) {
                    espacoNecessario += 1;
                }
            }
    
            // Regra para hipopótamos - 4)
            if (animal === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio' && recinto.animais.length > 0) {
                continue;
            }
    
            // Regra para macacos - 5)
            if (animal === 'MACACO' && recinto.animais.length === 0 && quantidade < 2) {
                continue;
            }            
    
            // Verifica se o espaço total é suficiente - 3.2)
            if (espacoOcupado + espacoNecessario <= recinto.tamanhoTotal) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${recinto.tamanhoTotal - espacoOcupado - espacoNecessario} total: ${recinto.tamanhoTotal})`);
            }
        }
    
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" }; // 6.2)
        }
    
        return { recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };