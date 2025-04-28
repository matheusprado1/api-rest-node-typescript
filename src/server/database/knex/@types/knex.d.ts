import { ICity } from '../../models';
import { IPerson } from '../../models';


declare module 'knex/types/tables' {
  interface Tables {
    city: ICity
    person: IPerson
    //user: IUser
  }
}