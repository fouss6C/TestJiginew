import colors from "../../theme/colors"

// filtre de selection des Status des DA , table DA STatus...

// Status list from DaStatus Table 
//InternalApproval , FinancialApproval , PurchaseNegociation, PurchaseOrderApproval , Purchased , Suspended
// the tag value tag column in DaStatus table 
// text is the status.. DaStatus table
// iconColor , is the color attrbutes for each status value , 

// no need to set the name of icon in Da Status Table , set in function..

const DaStatus = [
    {
      id: 1,
      iconName: 'plus-circle',
      iconColor: colors.card,     // color for each status
      tag : 'InternalApproval',  // tag in DAStatus
      text : 'Validation en attente' // status in DA status
    },
    {
      id: 11, //2
      iconName: 'plus-circle',
      iconColor: colors.primary,
      tag : 'InternalApprovalLevelOne',
      text : 'Validation N+1'
    },
    {
      id: 12, //3
      iconName: 'plus-circle',
      iconColor: colors.primary,
      tag : 'InternalApprovalLevelTwo',
      text : 'Validation N+2'
    },
    {
      id: 13, //4
      iconName: 'plus-circle',
      iconColor: colors.primary,
      tag : 'InternalApprovalLevelThree',
      text : 'Validation N+3'
    },
    {
      id: 2, // 5
      iconName: 'minus-circle',
      iconColor: colors.pink,
      tag: 'FinancialApproval',
      text : 'Controle de gestion'
    },
    {
      id: 3, //6
      iconName: 'minus-circle',
      iconColor: colors.pink,
      tag: 'PurchaseNegociation',
      text: 'Negociation Offre'
      
    },
    {
      id: 4, //7
      iconName: 'minus-circle',
      iconColor: colors.secondary,
      tag: 'PurchaseOrderApproval',
      text: 'Validation Bon de commandes'
    },
    {
      id: 5, //8
      iconName: 'minus-circle',
      iconColor: colors.secondary,
      tag: 'Purchased',
      text: ' Notification Ok'
    },
    {
      id: 6, //9
      iconName: 'minus-circle',
      iconColor: colors.secondary,
      tag: 'Suspended',
      text: 'En Suspens'
    },
]
export default DaStatus