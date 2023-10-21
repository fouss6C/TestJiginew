import colors from '../../theme/colors'

// text  for Status Tag value on  DA status Table

const bcStatus = [
    {
      id: 1,
      iconName: 'plus-circle',
      iconColor: colors.primary,
      tag: 'ongoing',
      text : 'En cours'
    },
    {
      id: 2,
      iconName: 'minus-circle',
      iconColor: colors.secondary,
      tag: 'onhold',
      text : 'En suspens'
    },
    {
        id: 3,
        iconName: 'minus-circle',
        iconColor: colors.secondary,
        tag: 'completed',
        text : 'Realisé'
    },
]
export default bcStatus