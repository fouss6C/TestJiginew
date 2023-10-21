import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View, FlatList, RefreshControl } from 'react-native'
import Modal from 'react-native-modal'
import colors from '../../theme/colors'
import Text from '../../components/Text'
import IconFont from 'react-native-vector-icons/FontAwesome5'
import styles from './styles'
import TextInput from '../../components/TextInput'
import { haveChildren } from '../../utils/utils'
import EmptyList from '../../components/EmptyList'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SearchOptionModal = (props) => {
  const { optionChoosed, options, onChange, ...attrs } = props
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState(options)
  const [refreshing] = useState(false)
  const insets = useSafeAreaInsets()


  const onSaveCategory = ( option ) => {
    onChange(option)
  }

  const filterCategory = (text) => {
    setCategory(text)
    if (text) {
      setCategories(options.filter((item) => 
      haveChildren(item.tag, text) || haveChildren(item.text, text)
      ))
    } else {
      setCategories(options)
    }
  }
  
  return (
    <Modal swipeDirection={['down']} style={styles.bottomModal} {...attrs}>
      <View style={[
        {
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          // Paddings to handle safe area
          //paddingTop: insets.top,
          //paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          maxHeight : '90%',
          backgroundColor: colors.white

        }]}>
        <View style={styles.contentSwipeDown}>
          <View style={styles.lineSwipeDown} />
        </View>
        <View style = {[ styles.container ]}>
          <View style = {{ marginBottom : 10 ,  }} > 
          <TextInput
              onChangeText={filterCategory}
              placeholder={"Rechercher une demande Achat"}
              value={category}
              iconLeft = { <IconFont name = 'search' color = { colors.gray} size = {24} />}
              icon={
                <TouchableOpacity onPress={() => filterCategory('')}>
                  <IconFont name="times" size={18} color={colors.gray} />
                </TouchableOpacity>
              }
          />
          </View>
            <FlatList
              contentContainerStyle={{}}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={true}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                  onRefresh={() => {}}
                />
              }
              ListEmptyComponent={({item}) => (<EmptyList  item = {category}/>) }
              data={categories}
              keyExtractor= {(item) => item.id}
              renderItem={({ item , index }) => (
                <>
                  <TouchableOpacity 
                    style = {{ 
                      flexDirection : 'row' , 
                      paddingVertical : 7 ,
                      borderBottomColor : colors.border,
                      borderBottomWidth : 0.5 ,

                     }}
                    onPress={() => onSaveCategory(item) }
                  >
                    <Text body2 bold >
                        {item.tag + ' '} 
                    </Text>
                    <Text subhead>
                        {item.text}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            />
        </View>
      </View>
    </Modal>
  )
}

SearchOptionModal.defaultProps = {
  optionChoosed: {},
  options: [],
  onPress: () => {},
  onChange: () => {},
}

SearchOptionModal.propTypes = {
  optionChoosed: PropTypes.object,
  options: PropTypes.array,
  onPress: PropTypes.func,
};

export default SearchOptionModal