/*  this is Balance information for Oracle , global , capex , opex  */
/* 
id 1 , for Oracle info  usedBal , currentBal ,  percent % of usage , isUp balance is increasing or decreasing , last calcualtion date, 

id 2 ,  for available Balance ( total des soldes de tous les projets ) , availableBalCapex ( solde projectType capex ) , availableBalOpex ( solde projectType Opex )
usedBal ( solde date de depart - solde date d'aujourdhui ) , currentBal ( solde Date du jour ) , percent % ( usedBal / InitialAvailableBal) , isUp ( balance increases or decreases )

id 3 , engagedBal ( total des soldes amountTTC  DA ) 

id 4 , allocated ( soldes alloués dans table allocatedbalance  du jour ) , aussi en capex et en Opex 

le pourcentage sur les 3 balance ( intial , rallonges , taxes ) --> % sur le montant Allocated , ex: (Total intial/total allocated)x100 
id 5 ,  la composante initialbalance sans les rallonges et les taxes ) 

id 6 ,  Rallonges  , aussi sur les capex et les opex

id 7 , total des Taxes , en capex et en opex 
*/

/*  3 tables sont consultées :  Balance , allocatedBalance ,  */

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
        currentBalCapex: '20,367',
        percentCapex: '13%',
        isUpCapex: false,
        currentBalOpex: '10,367',
        percentOpex: '10%',
        isUpOpex: false,

      },
      {
        id: 3,
        name: 'Engaged',
        usedBal: '11,390',
        currentBal: '45,367',
        percent: '10%',
        isUp: false,
        currentBalCapex: '30,367',
        percentCapex: '20%',
        isUpCapex: false,
        currentBalOpex: '15,367',
        percentOpex: '5%',
        isUpOpex: true,

      },
      {
        id: 4,
        name: 'allocated',
        usedBal: '11,390',
        currentBal: '35,367',
        percent: '100%', 
        isUp: false,
        currentBalCapex: '30,367',
        percentCapex: '20%',
        isUpCapex: false,
        currentBalOpex: '5,367',
        percentOpex: '5%',
        isUpOpex: true,
      },
      {
        id: 5,
        name: 'InitialHT', // hors taxe 
        usedBal: '11,390',
        currentBal: '70,367',
        percent: '60%', 
        isUp: false,
        currentBalCapex: '50,367',
        percentCapex: '20%',
        isUpCapex: false,
        currentBalOpex: '20,367',
        percentOpex: '5%',
        isUpOpex: true,
      },

      {
        id: 6,
        name: 'Rallonges',
        usedBal: '11,390',
        currentBal: '35,367',
        percent: '20%', 
        isUp: false,
        currentBalCapex: '25,30',
        percentCapex: '20%',
        isUpCapex: false,
        currentBalOpex: '10,00',
        percentOpex: '0%',
        isUpOpex: false,

      },
      {
        id: 7,
        name: 'Taxes',
        usedBal: '11,390',
        currentBal: '35,367',
        percent: '10%', 
        isUp: false,
        currentBalCapex: '20,30',
        percentCapex: '30%',
        isUpCapex: false,
        currentBalOpex: '15,00',
        percentOpex: '10%',
        isUpOpex: false,
      },
]
export default Balance