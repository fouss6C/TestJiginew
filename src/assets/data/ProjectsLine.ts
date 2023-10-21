
// code stands for account code 
// initial Bal stands for initial balance of the account 
// currentb Bal is the current baalnce 
// used bal is used amount 
// tagAct stands for the Tag of account in account Table 
// status is idle , open , close 
// isUp depends on transfer , account evolution + or - , bool 

const  ProjectLine = [
    {
      id: 1,
      projectID: 'IU63527',
      tagAct: 'CS', // O stands for Opex 
      typeAct : 'Capex',
      codeAct: '202378',
      name: 'Deploiement Backbone',
      usedBal: 'KX11,390',
      initialBal: '73,80 B',
      percent: '0,33%',
      currentBal: 'KX35,367',
      isUp: false,
      statusAct: 'idle',
      transactionType: 'Transfer IN',
      transactionAmount: '20,000',
      transactionDate: '21 Sept 2023 08AM',
      transactionOperator : 'Admin'
    },
    {
      id: 2,
      projectID: 'IP635987',
      tagAct: 'PS',
      typeAct : 'Opex',
      codeAct: '2024890',
      name: 'Amelioration QOS',
      usedBal: 'KX590',
      initialBal: '20,20 B',
      percent: '0,83%',
      currentBal: 'KX25,467',
      isUp: true,
      statusAct: 'open',
      transactionType: 'Transfer OUT',
      transactionAmount: 'K20,000',
      transactionDate: '21 Sept 2023 08AM',
      transactionOperator : 'Admin'
    },
    {
      id: 3,
      projectID: 'OI63527',
      tagAct: 'NJ', 
      typeAct : 'Capex',
      codeAct: '896390',
      name: 'Extension Reseau',
      usedBal: 'KX0.110',
      initialBal: '71,30 B',
      percent: '1,99%',
      currentBal: 'KX2,00',
      isUp: false,
      statusAct: 'open',
      transactionType: 'Transfer IN',
      transactionAmount: 'K28,000',
      transactionDate: '21 Sept 2023 08AM',
      transactionOperator : 'Admin'
    },
    {
      id: 4,
      projectID: 'MI63527',
      tagAct: 'NJ',
      typeAct : 'Capex',
      codeAct: '2458990',
      name: 'Swap Obsolescence',
      usedBal: 'KX1.00',
      initialBal: '70,10 B',
      percent: '0,99%',
      currentBal: 'KX15,123',
      isUp: false,
      statusAct: 'close',
      transactionType: 'Transfer OUT',
      transactionAmount: '25,000',
      transactionDate: '21 Sept 2023 08AM',
      transactionOperator : 'Admin'
    },
    {
      id: 5,
      projectID: 'IU63527',
      tagAct : 'IP',
      typeAct : 'Opex',
      codeAct: 'I889977',
      name: 'Achats Sapres ',
      usedBal: 'KX158,79',
      initialBal: '69,20 B',
      percent: '8,99%',
      currentBal: 'KX158,798',
      isUp: true,
      statusAct : 'open',
      transactionType: 'Transfer IN',
      transactionAmount: '23,000',
      transactionDate: '21 Sept 2023 08AM',
      transactionOperator : 'Admin'
    },
    {
      id: 6,
      projectID: 'IO63527',
      tagAct: 'TS',
      typeAct : 'Capex',
      codeAct: 'IP297288',
      name: 'Deploiment Reseau Fixe ',
      usedBal: 'KX113,90',
      initialBal: '68,30 B',
      percent: '8,99%',
      currentBal: 'KX899,555',
      isUp: false,
      statusAct: 'open',
      transactionType: 'Transfer OUT',
      transactionAmount: '10,000',
      transactionDate: '21 Sept 2023 08AM',
      transactionOperator : 'Admin'
    },
  ]
  export default ProjectLine