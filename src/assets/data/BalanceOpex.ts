// get the data from Table Balance 
// attribute Name 
// usedbal  difference B/W J and J-1 
// currentbal J Bal 
// percent , p rogression Rate J , J-1 
// isUp , this balance is Up or Down  , J vs J-1 

// Rallonge and Taxes are form initialBal , percent stands for %GlobalInitialBal

const Balance = [
    {
      id: 1,
      name: 'Oracle',
      usedBal: '11,390', // Balance in billion
      currentBal: '35,367',
      percent: '0,33%',
      isUp: false,
      date: '05 April 2023 14:00 ' // last updated 
    },
    {
        id: 2,
        name: 'Available',
        usedBal: '11,390',
        currentBal: '40,367',
        percent: '13%',
        isUp: false,
      },
      {
        id: 3,
        name: 'Engaged',
        usedBal: '21,390',
        currentBal: '45,367',
        percent: '10%',
        isUp: false,
      },
      {
        id: 4,
        name: 'allocated',
        currentBal: '30,367',
        percent: '20%',
        isUp: false,
      },
      {
        id: 5,
        name: 'InitialHT', // hors taxe 
        currentBal: '50,367',
        percent: '20%',
        isUp: false,
      },

      {
        id: 6,
        name: 'Rallonges',
        currentBal: '25,30',
        percent: '20%',
        isUp: false,
      },
      {
        id: 7,
        name: 'Taxes',
        currentBal: '20,30',
        percent: '30%',
        isUp: false,
      },
]
export default Balance