import colors from '../../theme/colors'

// text  for Status Tag value on  DA validationLevel Table
// after level 3 validation , the DA can pass to FinancialApproval

const DaValidationStatus = [
    {
      id: 1,
      iconName: 'plus-circle',
      iconColor: colors.primary,
      tag : 'InternalApprovalLevelOne',
      text : 'Validation Interne Niveau 1'
    },
    {
      id: 2,
      iconName: 'minus-circle',
      iconColor: colors.pink,
      tag: 'InternalApprovalLevelTwo',
      text : 'Validation Interne Niveau 2'
    },
    {
      id: 3,
      iconName: 'minus-circle',
      iconColor: colors.pink,
      tag: 'InternalApprovalLevelThree',
      text: 'Validation Interne Niveau 3'
      
    },
]
export default DaValidationStatus