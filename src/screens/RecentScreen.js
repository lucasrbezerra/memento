import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, StyleSheet, FlatList, Modal, Text, Alert} from 'react-native';
import {DetailsScreen} from './DetailsScreen';
import {CardRetry} from '../components/Card';
import getRealm from '../database/realm';

export function RecentScreen({query}) {
  const [modalDetailsOpen, setModalDetailsOpen] = useState(false);
  const [item, setItem] = useState();
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState(query);

  const CloseDetails = () => {
    setModalDetailsOpen(false);
  };

  const onOpen = (item) => {
    setModalDetailsOpen(true);
    setItem(item);
  };

  async function loadNotes() {
    const realm = await getRealm();
    const data = realm.objects('Note').filtered(`checked = ${true}`);

    if (search != '') {
      let lowerCaseQuery = search.toLowerCase();
      let newClients = data.filter((data) =>
        data.title.toLowerCase().includes(lowerCaseQuery),
      );
      setFiltered(newClients);
    } else {
      setFiltered(data);
    }
  }

  const handleReload = () => {
    loadNotes();
  };

  useFocusEffect(
    React.useCallback(() => {
      loadNotes();
    }, []),
  );

  return (
    <View style={styles.container}>
      {filtered.length != 0 ? (
        <FlatList
          data={filtered}
          refreshing={false}
          onRefresh={handleReload}
          renderItem={({item, index}) => (
            <CardRetry
              onPress={() => onOpen(item)}
              index={index}
              item={item}
              reload={handleReload}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <View style={{flex: 1}}>
          <Text style={styles.textVoid}>
            Você não possui nenhuma anotação recente!
          </Text>
        </View>
      )}

      <Modal visible={modalDetailsOpen} animationType="fade">
        <DetailsScreen item={item} Close={CloseDetails} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CFC5B2',
  },
  title: {
    color: 'black',
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
  },
  textVoid: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#6B5362',
    marginTop: 190,
    alignSelf: 'center',
  },
});
