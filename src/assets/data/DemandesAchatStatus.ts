import colors from '../../theme/colors'

// text  for Status Tag value on  DA status Table

const DaStatus = [
    {
      id: 1,
      iconName: 'plus-circle',
      iconColor: colors.primary,
      tag : 'InternalApproval',
      text : 'Validation Interne'
    },
    {
      id: 2,
      iconName: 'minus-circle',
      iconColor: colors.pink,
      tag: 'FinancialApproval',
      text : 'Controle de gestion'
    },
    {
      id: 3,
      iconName: 'minus-circle',
      iconColor: colors.pink,
      tag: 'PurchaseNegociation',
      text: 'Negociation Offre'
      
    },
    {
      id: 4,
      iconName: 'minus-circle',
      iconColor: colors.secondary,
      tag: 'PurchaseOrderApproval',
      text: 'Validation Bon de commandes'
    },
    {
      id: 5,
      iconName: 'minus-circle',
      iconColor: colors.secondary,
      tag: 'Purchased',
      text: ' Notification Ok'
    },
    {
      id: 6,
      iconName: 'minus-circle',
      iconColor: colors.secondary,
      tag: 'Suspended',
      text: 'En Suspens'
    },
]
export default DaStatus