// src/data/mockData.js

export const mockCircles = [
  {
    id: '1',
    name: 'Sibling',
    type: 'family',
    members: [
      { id: '1', name: 'Boyd Phiri', phone: '+260 9892737281', relation: 'Brother' },
      { id: '2', name: 'Samuel Moyo', phone: '+260 9892737281', relation: 'Brother' },
      { id: '3', name: 'Beatrice Kay', phone: '+260 9892737281', relation: 'Sister' },
    ],
  },
  {
    id: '2',
    name: 'Friends',
    type: 'friends',
    members: Array(8).fill().map((_, i) => ({
      id: `${i + 4}`,
      name: `Friend ${i + 1}`,
      phone: '+260 9892737281',
      relation: 'Friend',
    })),
  },
];

export const mockSOSRecords = [
  {
    id: '1',
    title: 'Record 1',
    date: '14 Sep, 2024',
    location: 'Libala Stage 3, Lusaka',
  },
  {
    id: '2',
    title: 'Record 2',
    date: '14 Sep, 2024',
    location: 'Lusaka',
  },
];
