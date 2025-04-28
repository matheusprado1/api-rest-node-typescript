import type { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.person, (table) => {
      table.bigIncrements('id').primary().index();
      table.string('firstName').index().notNullable();
      table.string('lastName').notNullable();
      table.string('email').unique().notNullable();

      table
        .bigInteger('cityId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.city)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');


      table.comment('Tabela usada para armazenar pessoas do sistema')

    })
    .then(() => {
      console.log(`# Create table ${ETableNames.person}`);
    });
};


export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.person)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.person}`);
    });
};

