import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import RNPickerSelect from 'react-native-picker-select';


const CreateEvent = () => {
    // TODO: Finir le back et que tout fonctionne et que cela ajoute un évènement
    // TODO: faire le front
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [places, setPlaces] = useState('');
    const [date, setDate] = useState('');
    const [price, setPrice] = useState(0);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [urlPrice, setUrlPrice] = useState('');

    const [selectedOption, setSelectedOption] = useState('');

    const handleCreateEvent = async () => {
        try{
            const response = await fetch(`http://10.92.2.40:3000/events/addEvent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    photo_video: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
                    date: date,
                    location: location,
                    tags: selectedTags,
                    places: places,
                    price: price,
                    urlPrice: urlPrice,
                }),
            });
            if (!response.ok) {
                throw new Error('Network was not ok');
            }
            const data = await response.json();
            navigation.navigate('spaceCreator');
            console.log(data,"Event registered succesfully!");
        } catch (error) {
            console.error('Error checking data:', error, data);
        }
    };


    useEffect(() => {
        const handleAlltags = async () => {
            try{
                const response = await fetch(`http://10.92.2.40:3000/tags/`);
                if (!response.ok) {
                    throw new Error('Network was not ok');
                }
                const data = await response.json();
                setTags(data);
                console.log(data, "Tags fetched succesfully!");
            } catch (error) {
                console.error('Error fetching tags', error);
            }
        };
        handleAlltags();
    }, []);

    const handleSelectOption = option => {
        setSelectedOption(option);
    };

    const handleTagChange = (value) => {
        if (selectedTags.includes(value)) {
            setSelectedTags(selectedTags.filter(tag => tag !== value));
        } else {
            setSelectedTags([...selectedTags, value]);
        }
    };

    return (
        <ScrollView>
            <View style={styles.Createcontainer}>
                <Text>Créer un évènement</Text>
                <View style={styles.CreateEvent}>
                    <Text style={styles.CreateEventTitle}>Titre de l'évènement</Text>
                    <TextInput style={styles.CreateEventInput} 
                        placeholder="Titre de l'évènement" 
                        onChangeText={text => setTitle(text)}
                        value={title}/>
                    <Text style={styles.CreateEventDescription}>Description de l'évènement</Text>
                    <TextInput style={styles.CreateEventInput} 
                        placeholder="Description de l'évènement" 
                        onChangeText={text => setDescription(text)}
                        value={description}/>
                    <Text style={styles.CreateEventLocation}>Lieu de l'évènement</Text>
                    <TextInput style={styles.CreateEventInput} 
                        placeholder="Lieu de l'évènement" 
                        onChangeText={text=> setLocation(text)}
                        value={location}/>
                    <Text>Nombre de places</Text>
                    
                    <TextInput style={styles.CreateEventInput} 
                        placeholder="Nombre de places" 
                        onChangeText={text => setPlaces(parseInt(text))}
                        value={places.toString()}/>
                    <Text style={styles.CreateEventDate}>Date de l'évènement</Text>
                    <TextInput style={styles.CreateEventInput} 
                        placeholder="Date de l'évènement" 
                        onChangeText={text => setDate(text)}
                        value={date}/>
                        {tags.length > 0 ? (
                    <RNPickerSelect
                        style={styles.CreateEventInput}
                        onValueChange={handleTagChange}
                        items={tags.filter(tag => tag.idTag).map(tag => ({
                            label: tag.nomTag,
                            value: tag.idTag,
                        }))}
                        placeholder={{ label: 'Sélectionner un tag', value: null }}
                        value={selectedTags}
                    />
            ) : (
                <Text>Loading...</Text>
            )}
                    <Text>L'évènement est-il payant</Text>
                    <View style={styles.radioButtonContainer}>
                    <TouchableOpacity
                    style={[
                        styles.radioButton,
                        { backgroundColor: selectedOption === 'Oui' ? '#007BFF' : '#fff' },
                    ]}
                    onPress={() => handleSelectOption('Oui')}
                    >
                    <Text style={{ color: selectedOption === 'Oui' ? '#fff' : '#000' }}>Oui</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[
                        styles.radioButton,
                        { backgroundColor: selectedOption === 'Non' ? '#007BFF' : '#fff' },
                    ]}
                    onPress={() => handleSelectOption('Non')}
                    >
                    <Text style={{ color: selectedOption === 'Non' ? '#fff' : '#000' }}>Non</Text>
                    </TouchableOpacity>
                    </View>
                        {selectedOption === 'Oui' && (
                            <>
                            <TextInput
                            placeholder="Montant"
                            style={styles.input}
                            onChangeText={text => setPrice(parseInt(text))}
                            value={price} />
                            <Text style={styles.conatinerUrl}>Lien du paiement</Text>
                            <TextInput 
                                placeholder="Lien de paiement"
                                style={styles.input}
                                onChangeText={text => setUrlPrice(text)}
                                value={urlPrice.toString()}/>
                            </>                      
                    )}
                </View>
                <TouchableOpacity style={styles.registerButton} onPress={handleCreateEvent}>
                    <Text style={styles.buttonText}>Soumettre et confirmer</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    Createcontainer: {
        flex: 1,
        padding: 20,
    },
    CreateEvent: {
        padding: 20,
        flexGrow: 1,
    },
    CreateEventTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    CreateEventDescription: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    CreateEventLocation: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    CreateEventDate: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    CreateEventInput: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
    },
    radioButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    radioButton: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#007BFF',
    },
    input: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
    },
});

export default CreateEvent;