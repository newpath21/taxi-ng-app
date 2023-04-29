//// client/src/app/testing/factories.ts

import * as faker from 'faker'

import { Token, User } from "../services/auth.service";


// export const createFakeUser = (data?: Partial<User>): User => {
//     return Object.assign({
//       id: 'fe096cea-aaed-4171-80a5-6c8fe82ae6d7',
//       username: 'rider@example.com',
//       first_name: 'Test',
//       last_name: 'Rider',
//       group: 'rider',
//       photo: 'rider.jpg'
//     }, data);
//   };

export const createFakeUser = (data?: Partial<User>): User => {
    return Object.assign({
      id: faker.datatype.uuid(),
      username: faker.internet.email(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      group: 'rider',
      photo: faker.image.imageUrl()
    }, data);
  };

  export const createFakeToken = (data?: Object): Token => {
    const header = faker.random.alphaNumeric(36);
    const payload = window.btoa(JSON.stringify(data));
    const signature = faker.random.alphaNumeric(43);
    return {
      access: `${header}.${payload}.${signature}`,
      refresh: faker.random.alphaNumeric(100)
    };
  };