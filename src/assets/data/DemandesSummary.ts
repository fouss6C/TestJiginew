import colors from '../../theme/colors'

// les stats DA apr status ( InternalApproval% , financialApproval , etc..)
// population , is number of DA in status x 
// tag is the status tag attribute , to be used for assessment 
// legendFontColor is unique color ID 
//name is status attrubute in DAStatus table 


const dmdSummary = [
    {
        name: 'Interne',
        description: 'Validation Interne',
        tag : 'InternalApproval', // levelOne  , lebelTwo , levelThree sont aussi comptés ici 
        population: 50,
        color: colors.primary,    // tu peux mettre le code couleur ici , 
        legendFontColor: '#7F7F7F',
    },
    {
        name: 'Finance',
        description: 'Controle de gestion',
        tag : 'FinancialApproval',
        population: 20,
        color: colors.pink,
        legendFontColor: '#7F7F7F',
    },
    {
        name: 'Achats',
        description: 'Negociation Achats',
        tag : 'PurchaseNegociation',
        population: 10,
        color: colors.secondary,
        legendFontColor: '#7F7F7F',
    },
    {
        name: 'Commandes',
        description: 'Bons de commandes',
        tag : 'PurchaseOrderApproval',
        population: 10,
        color: colors.grey,
        legendFontColor: '#7F7F7F',
    },
    {
        name: 'Notifié',
        description: 'Deja Notifié',
        tag : 'Purchased',
        population: 10,
        color: colors.green,
        legendFontColor: '#7F7F7F',
    },
    {
        name: 'Suspendue',
        description: 'Suspendue',
        tag : 'Suspended',
        population: 2,
        color: colors.black,
        legendFontColor: '#7F7F7F',
    },
  ]
  export default dmdSummary