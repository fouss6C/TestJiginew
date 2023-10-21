import { View, Text } from 'react-native'
import React, { useState } from 'react'
import SelectOptionModal from '../../components/SelectOptionModal'

const AddScreen = () => {

    const [addModalVisible , setAddModalVisible] = useState(false)

    const onAddSelect (option) => {
        setAddModalVisible(false);
        
    }
    
  return (
        <View>
            <Text>AddScreen</Text>
        
        <SelectOptionModal
            isVisible={addModalVisible}
            options={Data}
            onChange = {onAddSelect}
            onSwipeComplete={() => setAddModalVisible(false)}
        />
        </View>
        
  )
}

export default AddScreen