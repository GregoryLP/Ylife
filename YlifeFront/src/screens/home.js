import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from "react-native-gesture-handler";

const HomeScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');
    const [events, setEvents] = useState([]);

    // Récupérer les événements depuis l'API
    useEffect(() => {
        const handlePrintEvent = async () => {
            try {
                const response = await fetch(`http://10.92.2.40:3000/events/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEvents(data); // Assurez-vous que vous affectez 'data' ici
                console.log(data, "event fetched successfully!");
            } catch (error) {
                console.error('Error fetching event', error);
            }
        };
        handlePrintEvent();
    }, []);

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

    const handleViewEvent = () => {
        navigation.navigate('viewEvent');
    };

    const handleHome = () => {
        navigation.navigate('Home');
    };

    const handleProfile = () => {
        navigation.navigate('Profile');
    };

    return (
        <View style={styles.containerViewEvent}>
            <ScrollView contentContainerStyle={styles.eventContainer}>
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
                                key={event.idEvent}
                                style={styles.eventCard}
                                onPress={() => navigateToEventDetail(event.idEvent)}
                            >
                                <Text style={styles.eventDate}>{event.dateEvent}</Text>
                                <Text style={styles.eventTitle}>{event.title}</Text>
                                {/* <Text style={styles.eventCreator}>Créateur: {event.creator}</Text> */}
                            </TouchableOpacity>
                        ))}
                </View>
            </ScrollView>
            <View style={styles.bottomNavBar}>
                <TouchableOpacity onPress={handleHome}>
                    <Icon name="home" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="calendar" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleViewEvent}>
                    <Icon name="heart" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleProfile}>
                    <Icon name="user" size={30} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerViewEvent: {
        flex: 1,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    eventContainer: {
        padding: 10,
        flexGrow: 1,
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
    bottomNavBar: {
        height: 60, // ajustez la hauteur selon vos besoins
        backgroundColor: 'lightblue', // couleur de fond de la barre de navigation
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});

export default HomeScreen;
