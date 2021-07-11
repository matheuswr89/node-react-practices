import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { BorderlessButton, RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from 'date-fns-tz';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';


function TeacherList() {

  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [subject, setSubject] = useState('');
  let [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id;
        })

        setFavorites(favoritedTeachersIds);
      }
    });
  }

  useFocusEffect(() => {
    loadFavorites();
  })


  function handleToggleFiltersVisible() {
    setIsFilterVisible(!isFilterVisible)
  }

  async function handleFiltersSubmit() {
    loadFavorites();
    if (week_day.includes('Domingo'))
      week_day = '0';
    if (week_day.includes('Segunda'))
      week_day = '1';
    if (week_day.includes('Terça'))
      week_day = '2';
    if (week_day.includes('Quarta'))
      week_day = '3';
    if (week_day.includes('Quinta'))
      week_day = '4';
    if (week_day.includes('Sexta'))
      week_day = '5';
    if (week_day.includes('Sabado'))
      week_day = '6';
    console.log(week_day)
    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    });

    setIsFilterVisible(false);
    setTeachers(response.data);
  }
  console.log(teachers)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: Date) => {
    const timeOps = format(date, 'HH:mm', {
      timeZone: 'America/Sao_Paulo',
    });
    setTime(timeOps);
    hideDatePicker();
  };
  return (
    <View style={styles.container}>

      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        }
      >
        {isFilterVisible && (

          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              value={subject}
              onChangeText={(text) => setSubject(text)}
              placeholderTextColor="#c1bccc"
              style={styles.input}
              placeholder="Qual a matéria?"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  value={week_day}
                  onChangeText={(text) => setWeekDay(text)}
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Qual o dia?"
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <RectButton style={styles.input}
                  onPress={showDatePicker}>
                  {!time ? <Text style={{ color: '#c1bccc' }}>Qual horário?</Text> : <Text>{time}</Text>}
                </RectButton>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="time"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
            </View>

            <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)} />;
        })}

      </ScrollView>
    </View>
  );
}
export default TeacherList;