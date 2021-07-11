import React, { useState, useEffect } from 'react';
import { Feather as Icon } from "@expo/vector-icons";
import { View, Text, Image, ImageBackground, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface IBGEUFResponse {
  nome: string;
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const Home = () => {
  const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');

  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState('0');

  const naigation = useNavigation();

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then(response => {

        const ufInitials = response.data;

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') return;

    axios
      .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        const cityNames = response.data.map(city => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  function handleSelectUf(uf: string) {
    setSelectedUf(uf);
  }

  function handleSelectCity(city: string) {
    setSelectedCity(city);
  }

  function handleNavigateToPoints() {
    naigation.navigate('Points', {
      selectedUf,
      selectedCity,
    });
  }

  return (
    <ImageBackground
      source={require('../../assets/home-background.png')}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos.</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
      </View>

      <View style={styles.selectContainer}>
        <View style={styles.select}>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={(uf) => handleSelectUf(uf)}
            items={ufs.map(uf => ({ label: `${uf.nome} (${uf.sigla})`, value: uf.sigla }))}
            placeholder={{ label: 'Selecione o estado', value: null, color: '#A0A0B2' }}
          />
        </View>
        <View style={styles.select}>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={(city) => handleSelectCity(city)}
            items={cities.map(city => ({ label: city, value: city }))}
            placeholder={{ label: 'Selecione a cidade', value: null, color: '#A0A0B2' }}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleNavigateToPoints} >
          <View style={styles.buttonIcon} >
            <Text>
              <Icon name="arrow-right" color="#FFF" size={24} />
            </Text>
          </View>
          <Text style={styles.buttonText} >
            Entrar
          </Text>
        </RectButton>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  selectContainer: {
    height: 120,
    justifyContent: "space-between",
    marginBottom: 30,
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {
    borderColor: "#000",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 4,
  },

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#000",
    borderRadius: 8,
    color: 'black',
    borderStyle: "solid",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default Home;