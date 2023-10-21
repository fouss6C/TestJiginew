import colors from "../../theme/colors"

// Status list from DaStatus Table 
//InternalApproval , Issued , FinancialApproval , PurchaseNegociation, PurchaseOrderApproval , Purchased , Suspended
// the tag value is the status column in DaStatus table 
// text is the tag info of status.. as shwon in the list

const AddOptions = [
    {
      id: 1,
      iconName: 'credit-card-edit-outline', 
      iconColor: colors.primary,
      tag : 'AddDA',
      text : 'Ajouter une demande Achat'
    },
    {
      id: 2,
      iconName: 'credit-card-check-outline', 
      iconColor: colors.pink,
      tag: 'AddBC',
      text : 'Ajouter un bon de commande'
    },
    {
      id: 3,
      iconName: 'arrow-collapse',
      iconColor: colors.secondary,
      tag: 'AddTransfert',
      text: 'Initier un transfert de Budget'
      
    },
    {
      id: 4,
      iconName: 'credit-card-multiple-outline',
      iconColor: colors.green,
      tag: 'AddProject',
      text: 'Ajouter une ligne projet'
    },
    {
        id: 5,
        iconName: 'credit-card-plus-outline',
        iconColor: colors.black,
        tag: 'AddAccount',
        text: 'Ajouter un nouveau compte'
    },
    {
      id: 6,
      iconName: 'home-plus-outline',
      iconColor: colors.violet,
      tag: 'AddProvider',
      text: 'Ajouter un nouveau fournisseur'
  },
]
export default AddOptions