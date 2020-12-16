import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SearchBar} from 'react-native-elements';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {NoteScreen} from './src/screens/NoteScreen';
import {RecentScreen} from './src/screens/RecentScreen';
import {FavoriteScreen} from './src/screens/FavoriteScreen';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const [iconSearch, setIconSearch] = useState(false);
  const [query, setQuery] = useState('');

  const NoteComponent = () => {
    return <NoteScreen query={query}/>;
  };

  const RecentComponent = () => {
    return <RecentScreen query={query}/>;
  };

  const FavoriteComponent = () => {
    return <FavoriteScreen query={query}/>;
  };

  return (
    <NavigationContainer>
      <View>
        {iconSearch == false ? (
          <View style={styles.container}>
            <Text style={styles.title}>Memento</Text>
            <Icon
              name="search"
              size={30}
              color="#D8D2C0"
              onPress={() => setIconSearch(true)}
            />
          </View>
        ) : (
          <View style={styles.container}>
            <Icon
              name="arrow-back"
              size={30}
              color="#D8D2C0"
              onPress={() => setIconSearch(false)}
            />
            <SearchBar
              placeholder="Buscar título..."
              placeholderTextColor="grey"
              platform="android"
              value={query}
              onChangeText={setQuery}
              searchIcon={false}
              cancelIcon={false}
              containerStyle={styles.searchBar}
              inputStyle={{
                color: '#543846',
                fontFamily: 'Nunito-Bold',
                fontSize: 14,
                marginStart: 8,
              }}
            />
          </View>
        )}
      </View>
      <Tab.Navigator
        initialRouteName="Note"
        tabBarOptions={{
          activeTintColor: '#ffffff',
          inactiveTintColor: '#D8D2C0',
          pressColor: '#D8D2C0',
          indicatorStyle: {backgroundColor: '#ffffff'},
          labelStyle: {fontSize: 12, fontFamily: 'Nunito-Black'},
          style: {backgroundColor: '#543846', elevation: 0},
          title: 'Header',
        }}>
        <Tab.Screen
          name="Note"
          component={NoteComponent}
          options={{tabBarLabel: 'Anotações'}}
        />
        <Tab.Screen
          name="Recent"
          component={RecentComponent}
          options={{tabBarLabel: 'Recentes'}}
        />
        <Tab.Screen
          name="Favorite"
          component={FavoriteComponent}
          options={{tabBarLabel: 'Favoritos'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#543846',
    padding: 10,
  },
  title: {
    fontFamily: 'Nunito-Black',
    color: '#D8D2C0',
    fontSize: 28,
    marginLeft: 8,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#EBF2F5',
    marginLeft: 16,
    marginRight: 8,
    height: hp('6.8%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 10
  },
});