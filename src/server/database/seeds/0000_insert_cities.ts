import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';



export const seed = async (knex: Knex) => {

  const [{ count }] = await knex(ETableNames.city).count<[{ count: number }]>('* as count');
  if (!Number.isInteger(count) || Number(count) > 0) return;


  const citiesToInsert = citiesTrianguloMineiro.map(cityName => ({ name: cityName }));
  await knex(ETableNames.city).insert(citiesToInsert);
};

const citiesTrianguloMineiro = [
  'Abadia dos Dourados',
  'Água Comprida',
  'Araguari',
  'Arapuá',
  'Araporã',
  'Araxá',
  'Cachoeira Dourada',
  'Campina Verde',
  'Campo Florido',
  'Canápolis',
  'Capinópolis',
  'Carmo do Paranaíba',
  'Carneirinho',
  'Cascalho Rico',
  'Centralina',
  'Comendador Gomes',
  'Conceição das Alagoas',
  'Conquista',
  'Delta',
  'Douradoquara',
  'Estrela do Sul',
  'Fronteira',
  'Frutal',
  'Grupiara',
  'Guimarânia',
  'Gurinhatã',
  'Ibiá',
  'Indianópolis',
  'Ipiaçu',
  'Iraí de Minas',
  'Ituiutaba',
  'Iturama',
  'Limeira do Oeste',
  'Matutina',
  'Monte Alegre de Minas',
  'Monte Carmelo',
  'Nova Ponte',
  'Patos de Minas',
  'Patrocínio',
  'Pedrinópolis',
  'Pirajuba',
  'Planura',
  'Prata',
  'Rio Paranaíba',
  'Romaria',
  'Sacramento',
  'Santa Juliana',
  'Santa Vitória',
  'São Francisco de Sales',
  'São Gotardo',
  'Serra do Salitre',
  'Tiros',
  'Tupaciguara',
  'Uberaba',
  'Uberlândia',
  'União de Minas',
  'Vazante',
  'Veríssimo'
];