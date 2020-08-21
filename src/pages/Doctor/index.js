import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {ILNullPhoto} from '../../assets';
import {Gap, HomeProfile, NewsItem} from '../../components';
import {Fire} from '../../config';
import {colors, fonts, getData, showError} from '../../utils';

const Doctor = ({navigation}) => {
  const [news, setNews] = useState([]);
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: '',
    profession: '',
  });

  useEffect(() => {
    getNews();
    navigation.addListener('focus', () => {
      getUserData();
    });
  }, [navigation]);

  const getNews = () => {
    Fire.database()
      .ref('news/')
      .once('value')
      .then((res) => {
        if (res.val()) {
          setNews(res.val());
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const getUserData = () => {
    getData('user').then((res) => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? {uri: res.photo} : ILNullPhoto;
      setProfile(res);
    });
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile
              profile={profile}
              onPress={() => navigation.navigate('UserProfile', profile)}
            />
          </View>
          <Gap height={30} />
          {news.map((item) => {
            return (
              <NewsItem
                key={item.id}
                title={item.title}
                date={item.date}
                image={item.image}
              />
            );
          })}
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  wrapperSection: {paddingHorizontal: 16},
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209,
  },
  category: {flexDirection: 'row'},
  wrapperScroll: {marginHorizontal: -16},
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
});
