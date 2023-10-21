import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View , Image, StyleSheet, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Text from '../Text'
import styles from './styles'
import colors from '../../theme/colors'
import Transaction from '../Transactions/Transaction'

const currentBal2Col = ({
  style = {},
  image = '',
  tagAct = '',
  code = '',
  name = '',
  usedBal = '',
  initialBal = '',
  percent = '',
  currentBal = '',
  statusAct = '',
  onPress = () => {},
  isUp = false,
  transactionType = '-',
  transactionAmount = 'XOF-',
  transactionDate = '-',
  transactionOperator = '-',
  transactionActOwner = '-',
  transactionAct = '-',
  onPressDetails = () => {}
}) => {

  const [statusActWatch] = useState(statusAct)
  const [isExpand , setIsExpand] = useState(false);

  const statusIcon = () => {
    if(statusActWatch == 'idle') {
      return 'lock-outline'
    }else if((statusActWatch == 'open') && isUp) {
      return 'lock-open-plus-outline'
    } else if( (statusActWatch == 'open') && !isUp ) {
      return 'lock-open-minus-outline'
    }else {
      return 'lock-check-outline'
    }
  }
  return (
    <View>
    <TouchableOpacity style={[styles.container, style]} onPress={()=> setIsExpand(v=>!v)}>
      {/* <Image source = {require ("../../assets/image/logo-hand.png") } style={styles.imageStyle} /> */}
      <View style={styles.tagStyle} >
        <Text footnote black  > {tagAct} </Text>
      </View>
      <View style={{ paddingLeft: 8, flex: 1 }}>
        <Text headline1 style={{fontFamily: 'Poppins-Regular'}}>
          {code}
          <Text caption1 light style={{fontFamily: 'Poppins-Regular'}}>
            {' '}
            {name}
          </Text>
        </Text>
          {/* {usedBal} */}
          <View style = {{ flexDirection:'row' , paddingTop:5 }}>
            <Icon name = {statusIcon()} size = { 14 } color= {colors.black} />
            <Text body2 regular style = {{ color : colors.secondary}} >
                {' '}
                {initialBal}
            </Text>
          </View>
      </View>
      <View style={{  }}>
        <Text headline1 style={styles.text}>
          {currentBal}
        </Text>
        <Text footnote green ={isUp} primary ={!isUp} style={styles.text}>
          <Icon name={isUp ? 'arrow-up' : 'arrow-down'} size = {16} /> {percent}
        </Text>
      </View>
    </TouchableOpacity>
     {isExpand && (
        <View
          style={StyleSheet.flatten([
            { paddingBottom: 2 },
            isExpand && {
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            },
          ])}
        >
            
            <View style={[styles.container1, style]}>
                <View>
                <Text subhead light style={styles.title}>
                    {'Transaction'}
                </Text>
                <Text footnote>{transactionType}</Text>
                </View>
                <View style={styles.viewRight}>
                <Text subhead light style={styles.title}>
                    {'Montant'}
                </Text>
                <Text headline1>{transactionAmount}</Text>
                </View>
            </View>

            <View style={[styles.container1, style]}>
                <View>
                <Text subhead light style={styles.title}>
                    {'Date'}
                </Text>
                <Text footnote>{transactionDate}</Text>
                </View>
                <View style = {{ alignItems : 'center'}}> 
                    <Icon name = 'arrow-collapse' size= { 40 } color = { colors.primary} />
                </View>
                <View style={styles.viewRight}>
                <Text subhead light style={styles.title}>
                    {'Operateur'}
                </Text>
                <Text footnote>{transactionOperator}</Text>
                </View>
            </View>
            <View style={[styles.container1, style]}>
                <View>
                <Text subhead light style={styles.title}>
                    {'Compte'}
                </Text>
                <Text headline1>{transactionAct}</Text>
                </View>
                <View style={styles.viewRight}>
                <Text subhead light style={styles.title}>
                    {'Propriétaire'}
                </Text>
                <Text footnote>{transactionActOwner}</Text>
                </View>
            </View>
            <TouchableOpacity onPress = {onPressDetails} style = {{ marginTop : 5 , marginLeft: 'auto'}}> 
                <Text primary light subhead 
                  style = {{ 
                    //textDecorationLine : 'underline'
                  }}
                >
                <Icon name = 'eye-arrow-right-outline' size= { 18 } color = { colors.primary} /> details    
                </Text>
            </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
currentBal2Col.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node,
  tagAct: PropTypes.string,
  code: PropTypes.string,
  name: PropTypes.string,
  usedBal: PropTypes.string,
  initialBal: PropTypes.string,
  percent: PropTypes.string,
  currentBal: PropTypes.string,
  statusAct:PropTypes.string,
  onPress: PropTypes.func,
  transactionType: PropTypes.string,
  transactionAmount: PropTypes.string,
  transactionDate: PropTypes.string,
  transactionOperator: PropTypes.string,
  transactionAct: PropTypes.string,
  transactionActOwner: PropTypes.string,

  onPressDetails: PropTypes.func,
}

export default currentBal2Col