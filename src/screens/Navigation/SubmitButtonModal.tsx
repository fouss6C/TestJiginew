import { useEffect, useState } from "react"
import { Alert, TouchableOpacity, View } from "react-native"
import SelectOptionModal from "../../components/SelectOptionModal"
import MaterialDesignIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import ButtonOption from '../../assets/data/AddButtonOptions'
import styles from './styles'
import colors from '../../theme/colors'
import { useNavigation } from "@react-navigation/native"
import { RootNavigationProp } from "../../types/Navigation"

const SubmitButtonModal = (props) => {
    const [addModalVisible , setAddModalVisible] = useState(false)
    const navigation = useNavigation<RootNavigationProp>()

    const onAddButtonSelect = (option)=> {
        setAddModalVisible(false)
        switch(option.tag) {
            case 'AddDA':
                return navigation.navigate('DaForm')
            case 'AddBC':
                return navigation.navigate('BcForm')
            case 'AddTransfert':
                return navigation.navigate('TransferForm')
            case 'AddProject':
                return navigation.navigate('ProjectForm')
            case 'AddAct':
                return navigation.navigate('ActForm')
            case 'AddProvider':
                return navigation.navigate('ProviderForm')
            case 'AddAccount':
                return navigation.navigate('AccountForm') 
            default:
              return null
        }   
       // Alert.alert('this is option selected : ', option.tag )
    }
    return (
        <>
            <TouchableOpacity  onPress={()=> {setAddModalVisible(true)}} style={[styles.button, { backgroundColor: colors.primary }]}>
                <MaterialDesignIcon name="plus-circle" color="white"  size = {34}/>
            </TouchableOpacity>
            <View style = {styles.container}>
                <SelectOptionModal
                    isVisible={addModalVisible}
                    options={ButtonOption}
                    onChange = {onAddButtonSelect}
                    onSwipeComplete={() => setAddModalVisible(false)}
                /> 
            </View>
        </>
    )
  }
  export default SubmitButtonModal