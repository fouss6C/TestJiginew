import colors from '../../theme/colors'

// text  for Status Tag value on  DA status Table

const ProjectStatus = [
    {
      id: 1,
      iconName: 'plus-circle',
      iconColor: colors.primary,
      tag : 'idle',
      text : 'Mode veille'
    },
    {
      id: 2,
      iconName: 'minus-circle',
      iconColor: colors.pink,
      tag: 'open',
      text : 'Ouvert'
    },
    {
      id: 3,
      iconName: 'minus-circle',
      iconColor: colors.pink,
      tag: 'close',
      text: 'Fermé'
      
    },
]
export default ProjectStatus