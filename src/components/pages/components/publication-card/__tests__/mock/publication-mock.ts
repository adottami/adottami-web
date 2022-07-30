import Publication from '@/models/publication/publication';

export const publicationMaleMock = new Publication({
  name: 'Thor',
  gender: 'Macho',
  city: 'Campina Grande',
  state: 'Catolé',
  id: '1-1-1-1',
  images: [
    {
      id: '1',
      url: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      id: '2',
      url: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      id: '3',
      url: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      id: '4',
      url: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
  ],
  author: { email: 'eu@eu.com', id: '1', name: 'eu', phoneNumber: '99999999999' },
  breed: '01/06/2022',
  ageInYears: 1,
  category: 'qualquer',
  characteristics: [{ id: '1', name: 'teste' }],
  description: 'Um animal qualquer',
  isArchived: false,
  weightInGrams: 1200,
  zipCode: '1111',
  createdAt: new Date('2022-07-30'),
});

export const publicationFemaleMock = new Publication({
  name: 'Moly',
  gender: 'Fêmea',
  city: 'Campina Grande',
  state: 'Catolé',
  id: '2-1-1-1',
  images: [
    {
      id: '1',
      url: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      id: '2',
      url: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
  ],
  author: { email: 'eu@eu.com', id: '1', name: 'eu', phoneNumber: '99999999999' },
  breed: '01/06/2022',
  ageInYears: 1,
  category: 'qualquer',
  characteristics: [{ id: '1', name: 'teste' }],
  description: 'Um animal qualquer',
  isArchived: true,
  weightInGrams: 1200,
  zipCode: '1111',
  createdAt: new Date('2022-07-30'),
});
