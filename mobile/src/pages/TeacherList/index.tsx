import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, AsyncStorage } from 'react-native';
import { Feather} from '@expo/vector-icons';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList() {
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [favorites, setfavorites] = useState<number[]>([]);


    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(res => {
            if(res) {
                const favoritedTeachers = JSON.parse(res);
                const favoritedTeachersId = favoritedTeachers.map((teacher: Teacher) => teacher.id);
                setfavorites(favoritedTeachersId);
            }
        })
    }

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible);
    }

    async function handleFiltersSubmit() {
        loadFavorites();
        const res = await api.get('classes', {
            params:{
                subject,
                week_day,
                time
            }
        });

        setTeachers(res.data);
        setIsFiltersVisible(false);
    }

    return (
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name='filter' size={20} color='#fff'/>
                    </BorderlessButton>
                )}
            >
                {isFiltersVisible && (<View style={styles.searchForm}>
                    <Text style={styles.label}>Matéria</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Qual a matéria" 
                        placeholderTextColor='#c1bccc'
                        onChangeText={text => setSubject(text)}
                    />

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da semana</Text>
                            <TextInput 
                                style={styles.input} 
                                placeholder="Qual o dia" 
                                placeholderTextColor='#c1bccc' 
                                onChangeText={text => setWeekDay(text)}
                            />
                        </View>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                            <TextInput 
                                style={styles.input} 
                                placeholder="Qual o horário" 
                                placeholderTextColor='#c1bccc' 
                                onChangeText={text => setTime(text)}
                            />
                        </View>
                    </View>

                    <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                        <Text style={styles.submitButtonText}>Filtrar</Text>
                    </RectButton>
                </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
            >
                {
                    teachers.map((teacher: Teacher) => 
                        <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)}/>)
                }
            </ScrollView>
        </View>
    );
}

export default TeacherList;