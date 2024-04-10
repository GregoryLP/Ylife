import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';


// import header from './header';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');
    const [events, setEvents] = useState([
    {
      id: 1,
      date: '15 Mars 2023',
      title: 'Soirée des diplômés',
      description: 'En attendant le WED, le BDE invite à une soirée sur une péniche où nous nous occupons de tout !',
      creator: 'BDE',
    },
    {
      id: 2,
      date: '16 Mars 2023',
      title: 'LoL Ynov Cup',
      description: 'Venez participer à la nouvelle édition de la LoL Ynov Cup. Un tournoi organisé par le BDS Esp...',
      creator: 'BDS',
    },
    {
      id: 3,
      date: '23 Mars 2023',
      title: 'Olympiades',
      description: 'Participez à une journée sportive avec les olympiades !',
      creator: 'BDS',
    },
  ]);

  const handleLogout = () => {
    setEmail('');
    setPassword('');
    setError('');
    navigation.navigate('Login');
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Déconnexion</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const navigateToEventDetail = (eventId) => {
    navigation.navigate('event', { eventId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Accueil</Text>
      <View style={styles.filterContainer}>
        <Icon name="filter" size={20} color="#007BFF" style={styles.filterIcon} />  
        <Text style={styles.filterLabel}>Filtre</Text>
        <Picker
          style={styles.filterPicker}
          selectedValue={filter}
          onValueChange={(value) => setFilter(value)}
        >
          <Picker.Item label="Tous" value="all" />
          <Picker.Item label="Alumni" value="Alumni" />
          <Picker.Item label="BDD" value="BDD" />
          <Picker.Item label="BDE" value="BDE" />
          <Picker.Item label="BDJ" value="BDJ" />
          <Picker.Item label="BDS" value="BDS" />
          <Picker.Item label="Labo Ydays" value="Labo Ydays" />
          <Picker.Item label="Pepytes" value="Pepytes" />
          <Picker.Item label="Ynov" value="Ynov" />
        </Picker>
      </View>
      <View style={styles.eventContainer}>
        {events
        .filter((event) => filter === 'all' || event.creator.includes(filter))
        .map((event) => (
          <TouchableOpacity
            key={event.id}
            style={styles.eventCard}
            onPress={() => navigateToEventDetail(event.id)}>
            <Text style={styles.eventDate}>{event.date}</Text>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventCreator}>Créateur: {event.creator}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  eventContainer: {
    flex: 1,
  },
  eventCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  eventDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  eventCreator: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  logoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  buttonText: {
    color: '#007BFF',
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#007BFF',
  },
  filterPicker: {
    height: 40,
    width: 120,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  filterIcon: {
    marginRight: 10,
  },
});

export default HomeScreen;

