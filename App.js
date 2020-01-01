import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform, // 현재 사용하는 플렛폼이 무엇인기 알기위해 사용
  ScrollView
} from "react-native";
import { AppLoading } from "expo";
import ToDo from "./ToDo";

// 장치 화면 윈도우의 가로, 세로 길이를 가져온다
const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos: false // 디스크에서 데이타를 로드했냐
  };

  componentDidMount = () => {
    // 앱이 마운트 되면 실행
    this._loadToDos();
  };

  render() {
    const { newToDo, loadedToDos } = this.state;
    if (!loadedToDos) {
      // 데이터를 로드 하지 안았으면 AppLoading 실행
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Kawai To Do</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To Do"}
            value={newToDo}
            onChangeText={this._controlNewToDo} // 함수호출
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo text={"Hello I'm a To Do"} />
          </ScrollView>
        </View>
      </View>
    );
  }
  // 투두 입력후 처리되는 함수
  _controlNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };
  _loadToDos = () => {
    // 디스크 데이터 로드 했다
    this.setState({
      loadedToDos: true
    });
  };
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
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  // 스크롤뷰 안에서 가운데 위치
  toDos: {
    alignItems: "center"
  }
});
