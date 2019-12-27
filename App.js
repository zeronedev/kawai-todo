import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform // 현재 사용하는 플렛폼이 무엇인기 알기위해 사용
} from "react-native";

// 장치 화면 윈도우의 가로, 세로 길이를 가져온다
const { height, width } = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Kawai To Do</Text>
      <View style={styles.card}>
        <TextInput style={styles.input} placeholder={"New To Do"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f23657",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25, // 가져온 장치의 화면의 가로넓이 에서 25작은 크기 만큼
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50,50,50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {}
});
