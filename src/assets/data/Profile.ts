// about is description of user profile 
// id is userID 
// point , new attribute in oragnisation Table 
// performance ( nouveaux attributs dans table performance : Total des realisation , nombre de da , nombre de BC , )
// 
const UserData = [
  {
    id: '1',
    name: 'Jean Paul ',
    poste: 'Ingenieur Telecom',
    email: '@orangemali.com',
    point: '9.4',
    matricule: '080234', // matricule
    groupName: 'serviceXXX',
    about:  
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    performance: [
      { value: '97.01%', title: 'Realisation' },
      { value: '100', title: 'DA' },
      { value: '120', title: 'BC' },
    ],
  },
]
export default UserData
