class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3, tamanho: 1 }] },
        { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
        { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1, tamanho: 2 }] },
        { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
        { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1, tamanho: 3 }] }
      ];
  
      this.animais = {
        LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
        LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
        CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
        MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
        GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
        HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
      };
    }
  
    analisaRecintos(animal, quantidade) {
      // Verificações iniciais
      if (!this.animais[animal]) {
        return { erro: 'Animal inválido' };
      }
      if (quantidade <= 0) {
        return { erro: 'Quantidade inválida' };
      }
  
      const animalInfo = this.animais[animal];
      const recintosViaveis = [];
  
      // Verifica cada recinto
      for (const recinto of this.recintos) {
        let espacoOcupado = recinto.animais.reduce((total, a) => total + (a.quantidade * a.tamanho), 0);
        let espacoExtra = recinto.animais.length > 0 && recinto.animais[0].especie !== animal ? 1 : 0;
        let espacoLivre = recinto.tamanho - espacoOcupado - espacoExtra;
  
        const biomaCompativel = animalInfo.biomas.includes(recinto.bioma);
        const mesmoEspecieOuVazio = recinto.animais.length === 0 || recinto.animais.every(a => a.especie === animal);
  
        if (biomaCompativel && espacoLivre >= (quantidade * animalInfo.tamanho) && mesmoEspecieOuVazio) {
          recintosViaveis.push("Recinto " + recinto.numero + " (espaço livre: " + (espacoLivre - (quantidade * animalInfo.tamanho)) + " total: " + recinto.tamanho + ")");
        }
      }
  
      if (recintosViaveis.length === 0) {
        return { erro: 'Não há recinto viável' };
      }
  
      return { recintosViaveis };
    }
  }
  
  export { RecintosZoo as RecintosZoo };