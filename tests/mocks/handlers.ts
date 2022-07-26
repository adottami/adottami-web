import { rest } from 'msw';

export const handlers = [
  // Handles a GET /user request
  rest.get('http://localhost:3333/publications', async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 'a2c7680f-480f-48fc-a104-736c935a4ec5',
          name: 'Lila',
          description: 'Adoravel',
          category: 'Dog',
          gender: 'Female',
          breed: 'Husky',
          weightInGrams: 20000,
          ageInYears: 5,
          zipCode: '54814043',
          city: 'Campina Grande',
          state: 'Paraiba',
          isArchived: false,
          characteristics: [],
          images: [
            {
              id: '65c3dcbe-2690-437b-bb96-e8487e123284',
              createdAt: '2022-07-26T02:10:17.615Z',
              url: 'C:\\Users\\emanu\\OneDrive\\Documentos\\Engenharia de Software\\Engenharia de Software\\adottami-backend\\tmp\\storage\\65c3dcbe-2690-437b-bb96-e8487e123284',
            },
          ],
          author: {
            id: '7fc7d77b-83ee-441e-8434-5dc79528b784',
            name: 'Emanuel Araujo de Moura',
            email: 'emanuelaraujo_14@hotmail.com',
            phoneNumber: '83981641347',
          },
        },
        {
          id: 'df135607-21f0-409e-80ec-c7ea5042da54',
          name: 'Nunu',
          description: 'Adoravel',
          category: 'Cat',
          gender: 'Male',
          breed: 'Siames',
          weightInGrams: 20000,
          ageInYears: 5,
          zipCode: '54814-043',
          city: 'Campina Grande',
          state: 'Paraiba',
          isArchived: false,
          characteristics: [],
          images: [
            {
              id: 'd4c40182-a468-4f0b-b2e3-2655985b7b2f.jpg',
              createdAt: '2022-07-26T03:31:57.751Z',
              url: 'C:\\Users\\emanu\\OneDrive\\Documentos\\Engenharia de Software\\Engenharia de Software\\adottami-backend\\tmp\\storage\\d4c40182-a468-4f0b-b2e3-2655985b7b2f.jpg',
            },
          ],
          author: {
            id: '7fc7d77b-83ee-441e-8434-5dc79528b784',
            name: 'Emanuel Araujo de Moura',
            email: 'emanuelaraujo_14@hotmail.com',
            phoneNumber: '83981641347',
          },
        },
        {
          id: '208a5f99-8a33-45a6-b7a1-f9ee1d2f7b14',
          name: 'Leleco',
          description: 'Adoravel',
          category: 'Bird',
          gender: 'Male',
          breed: 'Canary',
          weightInGrams: 1000,
          ageInYears: 4,
          zipCode: '54814-043',
          city: 'Campina Grande',
          state: 'Paraiba',
          isArchived: false,
          characteristics: [],
          images: [
            {
              id: 'a8da0dce-bf46-4a79-abb2-d56c300f292f.jpg',
              createdAt: '2022-07-26T04:33:20.344Z',
              url: 'C:\\Users\\emanu\\OneDrive\\Documentos\\est\\est\\adottami-backend\\tmp\\storage\\a8da0dce-bf46-4a79-abb2-d56c300f292f.jpg',
            },
          ],
          author: {
            id: '7fc7d77b-83ee-441e-8434-5dc79528b784',
            name: 'Emanuel Araujo de Moura',
            email: 'emanuelaraujo_14@hotmail.com',
            phoneNumber: '83981641347',
          },
        },
        {
          id: '7419a1a6-d82b-4295-9f1b-736a2de4320b',
          name: 'Augusto',
          description: 'Adoravel',
          category: 'Dog',
          gender: 'Male',
          breed: 'German Shepherd',
          weightInGrams: 1000,
          ageInYears: 4,
          zipCode: '54814-043',
          city: 'Campina Grande',
          state: 'Paraiba',
          isArchived: false,
          characteristics: [],
          images: [
            {
              id: 'de166e10-f156-4360-a2f9-b5fa4b230921.jpg',
              createdAt: '2022-07-26T03:33:34.928Z',
              url: 'C:\\Users\\emanu\\OneDrive\\Documentos\\Engenharia de Software\\Engenharia de Software\\adottami-backend\\tmp\\storage\\de166e10-f156-4360-a2f9-b5fa4b230921.jpg',
            },
          ],
          author: {
            id: '7fc7d77b-83ee-441e-8434-5dc79528b784',
            name: 'Emanuel Araujo de Moura',
            email: 'emanuelaraujo14_@hotmail.com',
            phoneNumber: '83981641347',
          },
        },
      ]),
    );
  }),
];
