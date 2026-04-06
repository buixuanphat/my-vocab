import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system/legacy';
import { Asset } from 'expo-asset';
import { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/home';
import Profile from './screens/profile';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-paper';
import MyIcons from './utils/MyIcon';
import Collection from './screens/collection';
import MyColor from './utils/MyColor';


export default function App() {

  const Tab = createBottomTabNavigator()

  const [db, setDb] = useState(null);
  const [word, setWord] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    loadDB();
  }, []);

  async function loadDB() {

    try {

      const dbName = "dictionary.db";

      const asset = Asset.fromModule(require('./assets/dictionary.db'));
      await asset.downloadAsync();

      const dbFolder = `${FileSystem.documentDirectory}SQLite`;
      const dbPath = `${dbFolder}/${dbName}`;

      const fileInfo = await FileSystem.getInfoAsync(dbPath);

      if (!fileInfo.exists) {

        await FileSystem.makeDirectoryAsync(dbFolder, {
          intermediates: true
        });

        await FileSystem.copyAsync({
          from: asset.localUri,
          to: dbPath
        });

        console.log("Đã copy DB");
      }

      const database = await SQLite.openDatabaseAsync(dbName);

      console.log("Mở DB thành công");

      setDb(database);

    } catch (e) {
      console.log("LỖI:", e);
    }

  }

  async function searchWord() {

    if (!db) {
      console.log("DB chưa load");
      return;
    }

    if (word.trim() === "") {
      setResult("Nhập từ trước đã");
      return;
    }

    try {

      const rows = await db.getAllAsync(
        "SELECT en_vi FROM dictionary WHERE [#name] = ?",
        [word]
      );

      if (rows.length > 0) {
        setResult(rows[0].en_vi);
      } else {
        setResult("Không tìm thấy từ");
      }

    } catch (e) {
      console.log("SQL ERROR:", e);
    }

  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: MyColor.ForestGreen,
          tabBarInactiveTintColor: 'gray',
          headerShown: false
        }}
      >
        <Tab.Screen
          name="Trang chủ"
          component={Home}
          options={{
            title: 'Trang chủ',
            tabBarIcon: ({ color, focused }) => {
              return focused ?
                <MyIcons.HomeFilled width={30} height={30} fill={color} /> :
                <MyIcons.Home width={30} height={30} fill={color} />
            },
            tabBarLabelStyle: styles.label
          }}
        />

        <Tab.Screen
          name="Collection" component={Collection}
          options={{
            title: 'Bộ sưu tập',
            tabBarIcon: ({ color, focused }) => {
              return focused ?
                <MyIcons.CardsStackFilled width={30} height={30} fill={color} /> :
                <MyIcons.CardsStack width={30} height={30} fill={color} />
            },
            tabBarLabelStyle: styles.label
          }} />

        <Tab.Screen
          name="Profile" component={Profile}
          options={{
            title: 'Hồ sơ',
            tabBarIcon: ({ color, focused }) => {
              return focused ?
                <MyIcons.UserFilled width={30} height={30} fill={color} /> :
                <MyIcons.User width={30} height={30} fill={color} />
            },
            tabBarLabelStyle: styles.label
          }} />

      </Tab.Navigator>
    </NavigationContainer >


    // <View style={styles.container}>

    //   <Text style={styles.title}>MY DICTIONARY</Text>

    //   <TextInput
    //     style={styles.input}
    //     placeholder="Nhập từ tiếng Anh..."
    //     value={word}
    //     onChangeText={setWord}
    //   />

    //   <Button title="Tra từ" onPress={searchWord} />

    //   <ScrollView style={styles.resultBox}>
    //     <Text style={styles.result}>{result}</Text>
    //   </ScrollView>

    //   <StatusBar style="auto" />

    // </View>
  );
}

const styles = StyleSheet.create({

  label:
  {
    fontSize: 12,
    fontWeight: 600,
  },

  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },

  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },

  resultBox: {
    marginTop: 20
  },

  result: {
    fontSize: 18
  }

});