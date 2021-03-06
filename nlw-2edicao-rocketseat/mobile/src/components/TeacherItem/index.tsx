import React, { useState } from 'react'
import { Image, Text, View, Linking } from 'react-native'
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';
import api from '../../services/api';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;    
  name: string;
  subject: string;    
  whatsapp: string;  
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const  TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited })=> {

  const message = `Olá, ${teacher.name}, estou entrando em contato pois gostaria de ter aulas de ${teacher.subject} com o valor de ${teacher.cost}`;

   function handleLinkToWhatsapp() {

      api.post('connections', {
        user_id: teacher.id,
      })
      
      Linking.openURL(`whatsapp://send?text=${message}&phone=${teacher.whatsapp}`)
   }

   const[isFavorited, setIsFavorited] = useState(favorited);


   async function handleToggleFavorite() {

    const favorites = await AsyncStorage.getItem('favorites');

    let favoritesArray = [];

        if (favorites) {
                         favoritesArray = JSON.parse(favorites);
                       }
      
      if(isFavorited) {
        //remove favorites
        const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
          return teacherItem.id === teacher.id;
        });

        favoritesArray.splice(favoriteIndex, 1);

        setIsFavorited(false);

      } else {
        //add favorites  

        favoritesArray.push(teacher);

        setIsFavorited(true);        
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
   }

   return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{ uri: teacher.avatar }}
          />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        {teacher.bio}
      </Text>  

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/Hora {' '}
          <Text style={styles.priceValue}>{teacher.cost}</Text>
        </Text>  

        <View style={styles.buttonsContainer}>
          <RectButton 
          onPress={handleToggleFavorite}
          style={[
            styles.favoriteButton,
            isFavorited ? styles.favorited : {},
            ]}>

            { isFavorited
             ? <Image source={unfavoriteIcon}/> 
             : <Image source={heartOutlineIcon}/>}
          </RectButton>

          <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
            <Image source={whatsappIcon}/>
            <Text style={styles.contactButtonText}>Whatsapp</Text>
          </RectButton>
        </View>
      </View>    
    </View>
  )
}

export default TeacherItem
