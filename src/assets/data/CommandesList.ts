
// infos DA receuillies  a partir de daID
// DA_ID par DaNumber , et ajouter le prestationType dans bc 
// 

const Commandes = [
  {
    id: 1,
    title: 'Upgrade backbone IP', //name BC
    description: 'Proin eget tortor risus. Donec sollicitudin molestie malesuada',
    days: '-150', // deadline
    executionRate: 20, // realisation Rate 
    savingRate: 30 ,
    acceptanceRate: 40 ,
    status: {
      id : 2 , 
      status : 'En cours', 
      tag : 'ongoing'
    },
    isUp:false ,  
    jalon : 'iT0', // jalon
    bcNumber:'244444' ,  // bcNumber 
    initialDeadline: '12-08-2024', //
    createdAt:'12 Apr 2023',
    purchasedAt: '12 Apr 2023',
    createdBy : '11111', // user ID 
    createdByName: 'Jean Paul',
    createdByService: 'SICOV',
    createdByEmail: 'jeanpaul@orangemali.com',
    providedBy : {
      id : 1 ,
      name : 'Huawei Technologies ',
      tag : ' HUAWEI'
    },
    assets: 'installation du maytos m & power on yuii soaiaio asoisoasi spopas pospoa aspospso asuiasus asiuisau asisius saiusius assasu ',
    nextStep: 'integration rx ',
    amountTTC: '367,839,839.90',
    amountHT: '367,839,839.90',
    daNumber : '278898',
    prestationType: 'Fourniture&Service',
    projectID: 'I889880'
  },
  {
    id: 2,
    title: 'Extension Liens Trans FH',
    description: 'Proin eget tortor risus. Donec sollicitudin molestie malesuada',
    days: '-30',
    executionRate: 30,
    savingRate: 30 ,
    acceptanceRate: 40 ,
    status:{
      id : 2 , 
      status : 'En cours', 
      tag : 'ongoing'
    },
    isUp:false , 
    jalon : 'iT1',
    bcNumber:'222222',
    initialDeadline: '12 Apr 2023',
    createdAt:'12 Apr 2023',
    providedBy : {
      id : 1 ,
      name : 'Huawei Technologies ',
      tag : ' HUAWEI'
    },
    purchasedAt: '12 Apr 2023',
    createdBy : '11111', // user ID 
    createdByName: 'Jean Paul',
    createdByService: 'SICOV',
    createdByEmail: 'jeanpaul@orangemali.com',
    assets: 'installation du maytos m & power on ',
    nextStep: 'integration rx ',
    amountTTC: '367839839.90',
    amountHT: '367,839,839.90',
    daNumber : '278898',
    prestationType: 'Fourniture&Service',
    projectID: 'I889880'

  },
  {
    id: 3,
    title: 'Swap Sites 4G RAN ',
    description: 'Proin eget tortor risus. Donec sollicitudin molestie malesuada',
    days: '-100 ',
    executionRate: 60,
    savingRate: 30 ,
    acceptanceRate: 40 ,
    status:{
      id : 2 , 
      status : 'En cours', 
      tag : 'onhold'
    },
    isUp:false , 
    jalon : 'iT2',
    bcNumber:'233333',
    initialDeadline: '12 Apr 2023',
    createdAt:'12 Apr 2023',
    providedBy : {
      id : 1 ,
      name : 'Huawei Technologies ',
      tag : ' HUAWEI'
    },
    purchasedAt: '12 Apr 2023',
    createdBy : '11111', // user ID 
    createdByName: 'Jean Paul',
    createdByService: 'SICOV',
    createdByEmail: 'jeanpaul@orangemali.com',
    assets: 'installation du maytos m & power on ',
    nextStep: 'integration rx ',
    amountTTC: '367839839.90',
    amountHT: '367,839,839.90',
    daNumber : '278898',
    prestationType: 'Fourniture&Service',
    projectID: 'I889880'
  },
  {
    id: 4,
    title: 'Swap Sites 4G RAN ',
    description: 'Proin eget tortor risus. Donec sollicitudin molestie malesuada',
    days: '-210 ',
    executionRate: 90,
    savingRate: 30 ,
    acceptanceRate: 40 ,
    status:{
      id : 3 , 
      status : 'Realisé', 
      tag : 'completed'
    },
    isUp:true , 
    jalon : 'iT3',
    bcNumber:'211111',
    initialDeadline: '12 Apr 2023',
    createdAt:'12 Apr 2023',
    providedBy : {
      id : 1 ,
      name : 'Huawei Technologies ',
      tag : ' HUAWEI'
    },
    purchasedAt: '12 Apr 2023',
    createdBy : '11111', // user ID 
    createdByName: 'Jean Paul',
    createdByService: 'SICOV',
    createdByEmail: 'jeanpaul@orangemali.com',
    assets: 'installation du maytos m & power on yuii soaiaio asoisoasi spopas pospoa aspospso asuiasus asiuisau asisius saiusius assasu ',
    nextStep: 'integration rx ',
    amountTTC: '367839839.90',
    amountHT: '367,839,839.90',
    daNumber : '278898',
    prestationType: 'Fourniture&Service',
    projectID: 'I889880'

  },
  {
    id: 5,
    title: 'Achats FAN  553636  NRJ ',
    description: 'Proin eget tortor risus. Donec sollicitudin molestie malesuada',
    days: '-110 ',
    executionRate: 98,
    savingRate: 30 ,
    acceptanceRate: 40 ,
    status: {
      id : 3 , 
      status : 'Realisé', 
      tag : 'completed'
    },
    isUp:true , 
    jalon : 'iT4',
    bcNumber:'200000',
    initialDeadline: '12-08-2024', // how many  
    createdAt:'12 Apr 2023',
    providedBy : {
      id : 1 ,
      name : 'Huawei Technologies ',
      tag : ' HUAWEI'
    },
    purchasedAt: '12 Apr 2023',
    createdBy : '11111', // user ID 
    createdByName: 'Jean Paul',
    createdByService: 'SICOV',
    createdByEmail: 'jeanpaul@orangemali.com',
    assets: 'installation du maytos m & power on ',
    nextStep: 'integration rx ',
    amountTTC: '367839839.90',
    amountHT: '367,839,839.90',
    daNumber : '278898',
    prestationType: 'Fourniture&Service',
    projectID: 'I889880'

  },
]
export default Commandes