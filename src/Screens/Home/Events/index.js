import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
} from 'react-native';
import {GlobalContext} from '../../../Utils/GlobalContext';
import Icon from 'react-native-vector-icons/Ionicons';

const Events = ({}) => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  const {state} = useContext(GlobalContext);

  const getEvents = async () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', state.token);

    try {
      const res = await fetch(
        'http://3.7.81.243/projects/plie-api/public/api/events-listing',
        {
          method: 'POST',
          headers: headers,
        },
      );
      const response = await res.json();
      if (response.success) {
        setEvents(response.data.events);
      }
    } catch (err) {
      console.log('err in get events -->', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getEvents();
  }, []);

  const renderArticals = ({item}) => {
    return (
      <View style={styles.cardStyle}>
        <View style={styles.imageView}>
          <Image
            source={{uri: item.event_profile_img}}
            style={styles.imageStyle}
          />
        </View>
        <View style={styles.middleContentView}>
          <Text style={styles.eventName}>{item.event_name}</Text>
          {item?.readable_from_date || item?.readable_to_date ? (
            <Text style={styles.eventDate}>
              {item?.readable_from_date} {item?.readable_to_date ? '-' : ''}{' '}
              {item?.readable_to_date}
            </Text>
          ) : null}
          {item?.event_price_from || item?.event_price_to ? (
            <Text style={styles.eventPrice}>
              ${item?.event_price_from} {item?.event_price_to ? '-' : ''} $
              {item?.event_price_to}
            </Text>
          ) : null}
          {item?.keywords?.length > 0 ? (
            <View style={styles.pillContainer}>
              {item?.keywords?.map(item => {
                return (
                  <View style={styles.pill}>
                    <Text>{item}</Text>
                  </View>
                );
              })}
            </View>
          ) : null}
        </View>
        <View style={styles.lastContentView}>
          <View
            style={[styles.arrow, {bottom: Platform.OS === 'ios' ? 70 : 80}]}>
            <Icon name="arrow-forward" size={20} />
          </View>
          <Text style={styles.cityName}>{item?.city}</Text>
          <View style={styles.iconContainer}>
            <Icon name="share-outline" size={15} />
            <Icon
              name={item.isFavorite === 1 ? 'heart' : 'heart-outline'}
              size={15}
            />
          </View>
        </View>
      </View>
    );
  };

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  ) : (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <View style={styles.upperContainer}>
        <Text style={styles.userName}>{state?.user?.usr_fname}</Text>
        <Text style={styles.subTitle}>Are you ready to dance?</Text>
      </View>
      <View style={styles.lowerContainer}>
        <FlatList
          data={events}
          showsVerticalScrollIndicator={false}
          renderItem={(item, index) => renderArticals(item, index)}
        />
      </View>
    </>
  );
};

export default Events;

const styles = StyleSheet.create({
  upperContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 35,
    paddingVertical: 10,
    flex: 0.1,
  },
  userName: {
    fontSize: 26,
    fontWeight: '600',
    lineHeight: 32,
    color: '#0F0F0F',
  },
  subTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: '#0F0F0F',
  },
  lowerContainer: {
    flex: 0.9,
    marginTop: 10,
  },
  cardStyle: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 10,
    marginVertical: 14,
    marginHorizontal: 10,
    borderRadius: 12,
    shadowColor: '#88A6FF',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  imageView: {
    flex: 0.25,
  },
  imageStyle: {
    resizeMode: 'contain',
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  middleContentView: {
    flex: 0.7,
  },
  eventName: {
    flexWrap: 'wrap',
    width: '80%',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    color: '#181A1F',
  },
  eventDate: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 13,
    color: '#34A853',
    paddingTop: 5,
  },
  eventPrice: {
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 12,
    color: '#828282',
    paddingTop: 5,
  },
  pillContainer: {
    flexDirection: 'row',
    paddingTop: 4,
  },
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F5F7FC',
    marginRight: 18,
    borderRadius: 25,
    flexWrap: 'wrap',
  },
  arrow: {
    position: 'absolute',
    left: 28,
  },
  cityName: {
    marginTop: 30,
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 13,
  },
  lastContentView: {
    flex: 0.1,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
});
