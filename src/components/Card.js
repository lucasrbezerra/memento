import React, {useState, memo} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import {CheckBox} from 'react-native-elements';
import getRealm from '../database/realm';
import LinearGradient from 'react-native-linear-gradient';

export function Card({item, index, onPress, reload}) {
  const [checked, setChecked] = useState(item.checked);

  async function handleCheck(item) {
    try {
      const realm = await getRealm();
      let updateCheck = realm.objects('Note').filtered(`id = "${item.id}"`);

      realm.write(() => {
        updateCheck[0].checked = !updateCheck[0].checked;
      });
      setChecked(updateCheck[0].checked);
      setTimeout(() => {
        reload();
      }, 500);
    } catch (e) {
      Alert.alert(`${e}`);
    }
  }

  async function handleFavorite(item) {
    try {
      const realm = await getRealm();
      let updateFavorite = realm.objects('Note').filtered(`id = "${item.id}"`);

      realm.write(() => {
        updateFavorite[0].favorite = !updateFavorite[0].favorite;
      });

      reload();
    } catch (e) {
      Alert.alert(`${e}`);
    }
  }

  return (
    <View>
      {index % 2 == 0 ? (
        <PrimaryCard
          item={item}
          onPress={onPress}
          handleCheck={handleCheck}
          checked={checked}
          handleFavorite={handleFavorite}
        />
      ) : (
        <SecundaryCard
          item={item}
          onPress={onPress}
          handleCheck={handleCheck}
          checked={checked}
          handleFavorite={handleFavorite}
        />
      )}
    </View>
  );
}

const PrimaryCard = ({item, onPress, handleCheck, checked, handleFavorite}) => (
  <View style={styles.container}>
    <View style={styles.checkboxPrimary}>
      <CheckBox
        key={item}
        center
        size={30}
        checkedIcon="check-circle"
        checkedColor="green"
        uncheckedIcon="circle-o"
        uncheckedColor="#6B5362"
        checked={checked}
        onPress={() => handleCheck(item)}
      />
    </View>
    {item.checked == true ? (
      <TouchableOpacity onPress={onPress} style={{flex: 1}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#543846', '#6B5363', '#543846']}
          style={styles.subcardPrimaryChecked}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text numberOfLines={1} style={styles.titleChecked}>
              {item.title}
            </Text>
            <Text numberOfLines={1} style={styles.subtitleChecked}>
              {item.description}
            </Text>
          </View>
          <CheckBox
            containerStyle={{justifyContent: 'center', alignItems: 'center'}}
            key={item}
            size={25}
            checkedIcon="star"
            checkedColor="#D8D2C0"
            uncheckedIcon="star-o"
            uncheckedColor="#D8D2C0"
            checked={item.favorite}
            onPress={() => handleFavorite(item)}
          />
        </LinearGradient>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={onPress} style={{flex: 1}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#543846', '#6B5363', '#543846']}
          style={styles.subcardPrimaryNoChecked}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text numberOfLines={1} style={styles.titleNoChecked}>
              {item.title}
            </Text>
            <Text numberOfLines={1} style={styles.subtitleNoChecked}>
              {item.description}
            </Text>
          </View>
          <CheckBox
            containerStyle={{justifyContent: 'center', alignItems: 'center'}}
            key={item}
            size={25}
            checkedIcon="star"
            checkedColor="#D8D2C0"
            uncheckedIcon="star-o"
            uncheckedColor="#D8D2C0"
            checked={item.favorite}
            onPress={() => handleFavorite(item)}
          />
        </LinearGradient>
      </TouchableOpacity>
    )}
  </View>
);

const SecundaryCard = ({item, onPress, handleCheck, checked, handleFavorite}) => (
  <View style={styles.container}>
    {item.checked == true ? (
      <TouchableOpacity onPress={onPress} style={{flex: 1}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#543846', '#6B5363', '#543846']}
          style={styles.subcardSecundaryChecked}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text numberOfLines={1} style={styles.titleChecked}>
              {item.title}
            </Text>
            <Text numberOfLines={1} style={styles.subtitleChecked}>
              {item.description}
            </Text>
          </View>
          <CheckBox
            containerStyle={{justifyContent: 'center', alignItems: 'center'}}
            key={item}
            size={25}
            checkedIcon="star"
            checkedColor="#D8D2C0"
            uncheckedIcon="star-o"
            uncheckedColor="#D8D2C0"
            checked={item.favorite}
            onPress={() => handleFavorite(item)}
          />
        </LinearGradient>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={onPress} style={{flex: 1}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#543846', '#6B5363', '#543846']}
          style={styles.subcardSecundaryNoChecked}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text numberOfLines={1} style={styles.titleNoChecked}>
              {item.title}
            </Text>
            <Text numberOfLines={1} style={styles.subtitleNoChecked}>
              {item.description}
            </Text>
          </View>
          <CheckBox
            containerStyle={{justifyContent: 'center', alignItems: 'center'}}
            key={item}
            size={25}
            checkedIcon="star"
            checkedColor="#D8D2C0"
            uncheckedIcon="star-o"
            uncheckedColor="#D8D2C0"
            checked={item.favorite}
            onPress={() => handleFavorite(item)}
          />
        </LinearGradient>
      </TouchableOpacity>
    )}
    <View style={styles.checkboxSecundary}>
      <CheckBox
        key={item}
        center
        size={30}
        checkedIcon="check-circle"
        checkedColor="green"
        uncheckedIcon="circle-o"
        uncheckedColor="#6B5362"
        checked={checked}
        onPress={() => handleCheck(item)}
      />
    </View>
  </View>
);

export function CardRetry({item, index, onPress, reload}) {
  async function handleRetry(item) {
    try {
      const realm = await getRealm();
      let updateCheck = realm.objects('Note').filtered(`id = "${item.id}"`);

      realm.write(() => {
        if (updateCheck[0].checked == false) {
          Alert.alert('Já está nas anotações ativas!');
        } else {
          updateCheck[0].checked = false;
        }
      });

      setTimeout(() => {
        reload();
      }, 200);
    } catch (e) {
      Alert.alert(`${e}`);
    }
  }

  async function handleFavorite(item) {
    try {
      const realm = await getRealm();
      let updateFavorite = realm.objects('Note').filtered(`id = "${item.id}"`);

      realm.write(() => {
        updateFavorite[0].favorite = !updateFavorite[0].favorite;
      });
      setTimeout(() => {
        reload();
      }, 500);
    } catch (e) {
      Alert.alert(`${e}`);
    }
  }

  return (
    <View>
      {index % 2 == 0 ? (
        <PrimaryCardRetry
          item={item}
          onPress={onPress}
          handleRetry={handleRetry}
          handleFavorite={handleFavorite}
        />
      ) : (
        <SecundaryCardRetry
          item={item}
          onPress={onPress}
          handleRetry={handleRetry}
          handleFavorite={handleFavorite}
        />
      )}
    </View>
  );
}

const PrimaryCardRetry = ({
  item,
  onPress,
  handleRetry,
  favorite,
  handleFavorite,
}) => (
  <View style={styles.container}>
    <View style={styles.checkboxPrimary}>
      <CheckBox
        key={item}
        center
        size={30}
        checkedIcon="undo"
        checkedColor="#6B5362"
        checked={true}
        onPress={() => handleRetry(item)}
      />
    </View>

    <TouchableOpacity onPress={onPress} style={{flex: 1}}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#543846', '#6B5363', '#543846']}
        style={styles.subcardPrimaryNoChecked}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text numberOfLines={1} style={styles.titleNoChecked}>
            {item.title}
          </Text>
          <Text numberOfLines={1} style={styles.subtitleNoChecked}>
            {item.description}
          </Text>
        </View>
        <CheckBox
          containerStyle={{justifyContent: 'center', alignItems: 'center'}}
          key={item}
          size={25}
          checkedIcon="star"
          checkedColor="#D8D2C0"
          uncheckedIcon="star-o"
          uncheckedColor="#D8D2C0"
          checked={item.favorite}
          onPress={() => handleFavorite(item)}
        />
      </LinearGradient>
    </TouchableOpacity>
  </View>
);

const SecundaryCardRetry = ({
  item,
  onPress,
  handleRetry,
  favorite,
  handleFavorite,
}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress} style={{flex: 1}}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#543846', '#6B5363', '#543846']}
        style={styles.subcardSecundaryNoChecked}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text numberOfLines={1} style={styles.titleNoChecked}>
            {item.title}
          </Text>
          <Text numberOfLines={1} style={styles.subtitleNoChecked}>
            {item.description}
          </Text>
        </View>
        <CheckBox
          containerStyle={{justifyContent: 'center', alignItems: 'center'}}
          key={item}
          size={25}
          checkedIcon="star"
          checkedColor="#D8D2C0"
          uncheckedIcon="star-o"
          uncheckedColor="#D8D2C0"
          checked={item.favorite}
          onPress={() => handleFavorite(item)}
        />
      </LinearGradient>
    </TouchableOpacity>
    <View style={styles.checkboxPrimary}>
      <CheckBox
        key={item}
        center
        size={30}
        checkedIcon="undo"
        checkedColor="#6B5362"
        checked={true}
        onPress={() => handleRetry(item)}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  subcardPrimaryChecked: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#6B5362',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: 'green',
    marginRight: 16,
    elevation: 5,
  },
  subcardPrimaryNoChecked: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#6B5362',
    borderRadius: 8,
    padding: 8,
    marginRight: 16,
    elevation: 5,
  },
  subcardSecundaryChecked: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#6B5362',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: 'green',
    marginLeft: 16,
    elevation: 5,
  },
  subcardSecundaryNoChecked: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#6B5362',
    borderRadius: 8,
    padding: 8,
    marginLeft: 16,
    elevation: 5,
  },
  titleChecked: {
    color: '#37C77F',
    fontFamily: 'Nunito-Black',
    fontSize: 16,
    marginBottom: 4,
    marginLeft: 4,
  },
  titleNoChecked: {
    color: '#CFC9B8',
    fontFamily: 'Nunito-Black',
    fontSize: 16,
    marginBottom: 4,
    marginLeft: 4,
  },
  subtitleChecked: {
    color: '#37C77F',
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    marginLeft: 4,
  },
  subtitleNoChecked: {
    color: '#CFC9B8',
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    marginLeft: 4,
  },
});

