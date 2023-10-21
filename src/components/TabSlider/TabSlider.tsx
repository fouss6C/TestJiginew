import React from 'react'
import { Dimensions, View } from 'react-native'
import { TabBar, TabView } from 'react-native-tab-view'
import Text from '../Text'
import styles from './styles'
import colors from '../../theme/colors'

const initialLayout = { width: Dimensions.get('window').width };

const TabSlider = (props) => {

    
  const renderTabBar = (propsTab) => (
    <TabBar
      {...propsTab}
      renderIndicator={() => null}
      scrollEnabled
      style={[styles.tabbar, { backgroundColor: colors.primary }, props?.tabBarProps?.style]}
      tabStyle={styles.tab}
      activeColor={colors.white}
      inactiveColor={colors.gray}
      renderLabel={({ route, focused }) => {
        return (
          <View
            style={[
              styles.viewLabel,
              {
                borderBottomColor: focused ? colors.primary : 'transparent',
              },
            ]}
          >
            <Text style={{ width: '100%' }} subhead bold={focused} gray ={!focused}>
              {route.title}
            </Text>
          </View>
        );
      }}
    />
  );

  return <TabView scrollEnabled={true} initialLayout={initialLayout} renderTabBar={renderTabBar} {...props} />;
}

export default TabSlider
