// cards 

<Card03
            icon={'hydraulic-oil-level'}
            title={'solde disponible'}
            price={'123,4'}
            subTitle={' la note disponible ac'}
            percent={'90%'}
            onPress={()=>{}}
/>

// button  , the icon is MaterialDesignIcon 

<Button 
        icon = {<Icon style={{ marginHorizontal: 5 }} name="home" color="white" size={16} />}
        round
> 
thisis 
</Button>

// Text 
<Text header primary > this is text </Text>


// Header Home to put on safeAreaView 

<HeaderHome userName = " fouss cisse " />

// Header Card for shwoing  the most important data to be tracked
<HeaderCard title = "this is " value = "XOF 12345,99"  disabled/>

// Title Lits , for showing the title of the cards on panels 

      <TitleList title={'les Demandes Achats '} textMore={ 'details'} onPress={() => {}} />


// transaction List  , DA list 

<View style = {{ width : '80%' , marginHorizontal : 20 , }} >
          <Transaction
          onPress={() => {}}
          icon={'home'}
          name={'Hello NRJ'}
          date={'21-08-2023'}
          status={'opex'}
          price={'-$67,899.90'}
          isUp={true}
          backgroundIcon={colors.primary}
        />
</View>
