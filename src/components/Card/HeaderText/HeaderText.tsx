import React from 'react'
import Header from '../Header'
import Text from '../../Text'

function HeaderText({ title = '', props = {} }) {
  return (
    <Header
      renderLeft={() => (
        <Text header bold>
          {title}
        </Text>
      )}
      title={''}
      styleLeft={{
        flex: 1,
      }}
      styleContentLeft={{
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 20,
      }}
      styleContentCenter={{
        flex: 0,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}
      styleRight={{ flex: 0 }}
      {...props}
    />
  );
}
export default HeaderText
