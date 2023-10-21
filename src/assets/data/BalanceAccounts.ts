
/* 
Tables Account ( liste des comptes systemes et soldes )
Balance d'un compte correspond au total des montants projets affliés a ce compte, 
ou simplement solde = montant initial provisionné - montant consommé

percent = % consommé / % intial provisionne ( calcul a faire )

*/
// code stands for account code 
// initial Bal stands for initial balance of the account 
// current Bal is the current balnce 
// used bal is used amount 
// tag stands for the Tag of account in account Table 
// status is idle , open , close 
// isUp depends on transfer , account evolution + or - , bool 

const  AccountMain = [
    {
      id: 1,
      tag: 'CS', // O stands for Opex 
      code: '202378',
      name: 'Deploiement Backbone',
      usedBal: 'KX11,390',
      initialBal: '73,80 B',
      percent: '0,33%',
      currentBal: 'KX35,367',
      isUp: false,
      status: 'idle',
      type: 'Opex'
    },
    {
      id: 2,
      tag: 'PS',
      code: '2024890',
      name: 'Amelioration QOS',
      usedBal: 'KX590',
      initialBal: '20,20 B',
      percent: '0,83%',
      currentBal: 'KX25,467',
      isUp: true,
      status: 'open',
      type: 'Capex'
    },
    {
      id: 3,
      tag: 'NJ', 
      code: '896390',
      name: 'Extension Reseau',
      usedBal: 'KX0.110',
      initialBal: '71,30 B',
      percent: '1,99%',
      currentBal: 'KX2,00',
      isUp: false,
      status: 'open',
      type: 'Capex'
    },
    {
      id: 4,
      tag: 'NJ',
      code: '2458990',
      name: 'Swap Obsolescence',
      usedBal: 'KX1.00',
      initialBal: '70,10 B',
      percent: '0,99%',
      currentBal: 'KX15,123',
      isUp: false,
      status: 'close',
      type: 'Capex'
    },
    {
      id: 5,
      tag : 'IP',
      code: 'I889977',
      name: 'Achats Sapres ',
      usedBal: 'KX158,79',
      initialBal: '69,20 B',
      percent: '8,99%',
      currentBal: 'KX158,798',
      isUp: true,
      status : 'open',
      type: 'Capex'
    },
    {
      id: 6,
      tag: 'TS',
      code: 'IP297288',
      name: 'Deploiment Reseau Fixe ',
      usedBal: 'KX113,90',
      initialBal: '68,30 B',
      percent: '8,99%',
      currentBal: 'KX899,555',
      isUp: false,
      status: 'open',
      type: 'Capex'
    },
  ]
  export default AccountMain