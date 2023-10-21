import colors from "../../theme/colors"

// Status list from DaStatus Table 
//InternalApproval , Issued , FinancialApproval , PurchaseNegociation, PurchaseOrderApproval , Purchased , Suspended
// the tag value is the status column in DaStatus table 
// text is the tag info of status.. as shwon in the list

const AccountType = [
    {
      id: 1,
      iconName: 'plus-circle',
      iconColor: colors.primary,
      tag: 'Capex',
      text : 'Compte Capex'
    },
    {
      id: 2,
      iconName: 'minus-circle',
      iconColor: colors.pink,
      tag: 'Opex',
      text: 'Compte Opex '
      
    },
]
export default AccountType