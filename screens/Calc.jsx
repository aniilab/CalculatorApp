import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActionSheetIOS,
  Button,
  ScrollView,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import { PieChart } from "react-native-chart-kit";

const Calculator = () => {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [selectedBase, setSelectedBase] = useState("10");
  const [selectedOperation, setSelectedOperation] = useState("+");
  const [result, setResult] = useState("");
  const [selectedResultBase, setSelectedResultBase] = useState("10");
  const [operationStats, setOperationStats] = useState({
    "+": 0,
    "-": 0,
    "*": 0,
    "/": 0,
  });

  const bases = ["2", "8", "10", "16"];
  const calculateResult = () => {
    let num1 = parseInt(number1, parseInt(selectedBase));
    let num2 = parseInt(number2, parseInt(selectedBase));
    let res = 0;
    switch (selectedOperation) {
      case "+":
        res = num1 + num2;
        break;
      case "-":
        res = num1 - num2;
        break;
      case "*":
        res = num1 * num2;
        break;
      case "/":
        res = num1 / num2;
        break;
      default:
        break;
    }
    setResult(res.toString());
    setOperationStats((prevStats) => ({
      ...prevStats,
      [selectedOperation]: prevStats[selectedOperation] + 1,
    }));
  };

  const convertBase = (number) => {
    return parseInt(number, 10).toString(parseInt(selectedResultBase));
  };

  const saveToFile = async () => {
    try {
      const content = {
        number1,
        number2,
        selectedBase,
        selectedOperation,
        result,
        selectedResultBase,
      };
      const fileUri = `${FileSystem.documentDirectory}/calculator_data.json`;
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(content));
      console.log("Data saved to file.");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const loadFromFile = async () => {
    try {
      const fileUri = `${FileSystem.documentDirectory}/calculator_data.json`;
      const content = await FileSystem.readAsStringAsync(fileUri);
      const data = JSON.parse(content);
      setNumber1(data.number1);
      setNumber2(data.number2);
      setSelectedBase(data.selectedBase);
      setSelectedOperation(data.selectedOperation);
      setResult(data.result);
      setSelectedResultBase(data.selectedResultBase);
      console.log("Data loaded from file.");
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const actionSheetInput = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["2", "8", "10", "16", "Cancel"],
        userInterfaceStyle: "light",
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          setSelectedBase("2");
        } else if (buttonIndex === 1) {
          setSelectedBase("8");
        } else if (buttonIndex === 2) {
          setSelectedBase("10");
        } else if (buttonIndex === 3) {
          setSelectedBase("16");
        } else if (buttonIndex === 4) {
          //Закрилось
        }
      }
    );

  const actionSheetOutput = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["2", "8", "10", "16", "Cancel"],
        userInterfaceStyle: "light",
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          setSelectedResultBase("2");
        } else if (buttonIndex === 1) {
          setSelectedResultBase("8");
        } else if (buttonIndex === 2) {
          setSelectedResultBase("10");
        } else if (buttonIndex === 3) {
          setSelectedResultBase("16");
        } else if (buttonIndex === 4) {
          //Закрилось
        }
      }
    );

  const actionSheetOperation = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["+", "-", "*", "/", "Cancel"],
        userInterfaceStyle: "light",
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          setSelectedOperation("+");
        } else if (buttonIndex === 1) {
          setSelectedOperation("-");
        } else if (buttonIndex === 2) {
          setSelectedOperation("*");
        } else if (buttonIndex === 3) {
          setSelectedOperation("/");
        } else if (buttonIndex === 4) {
          //Закрилось
        }
      }
    );

  return (
    <ScrollView style={{ flex: 1, paddingTop: 30 }}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={saveToFile}>
            <Text style={styles.buttonText}>Save to File</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={loadFromFile}>
            <Text style={styles.buttonText}>Load from File</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container1}>
        <Text style={styles.result2}>Base: {selectedBase}</Text>
        <Button onPress={actionSheetInput} color="#2d644d" title="Change" />
      </View>

      <TextInput
        style={styles.input}
        onChangeText={(text) => setNumber1(text)}
        value={number1}
        placeholder={`Enter number in base ${selectedBase}`}
      />

      <View style={styles.containerOperation}>
        <Button onPress={actionSheetOperation} title={selectedOperation} />
      </View>

      <TextInput
        style={styles.input}
        onChangeText={(text) => setNumber2(text)}
        value={number2}
        placeholder={`Enter number in base ${selectedBase}`}
      />

      <View style={styles.container}>
        <TouchableOpacity style={styles.button1} onPress={calculateResult}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.result1}>Result: {result}</Text>

      <View style={styles.container1}>
        <Text style={styles.result2}>Base: {selectedResultBase}</Text>
        <Button onPress={actionSheetOutput} color="#2d644d" title="Change" />
      </View>

      <Text style={styles.result2}>
        Converted Result: {result ? convertBase(result) : ""}
      </Text>
      <View style={styles.container}>
        <PieChart
          data={[
            {
              name: "+",
              population: operationStats["+"],
              color: "#5d8b5c",
              legendFontColor: "#5d8b5c",
              legendFontSize: 16,
            },
            {
              name: "-",
              population: operationStats["-"],
              color: "#003337",
              legendFontColor: "#003337",
              legendFontSize: 16,
            },
            {
              name: "*",
              population: operationStats["*"],
              color: "#ff6347",
              legendFontColor: "#ff6347",
              legendFontSize: 16,
            },
            {
              name: "/",
              population: operationStats["/"],
              color: "#ff9900",
              legendFontColor: "#ff9900",
              legendFontSize: 16,
            },
          ]}
          width={300}
          height={200}
          chartConfig={{
            backgroundGradientFrom: "#1E2923",
            backgroundGradientTo: "#08130D",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#5d8b5c",
    padding: 10,
    borderRadius: 5,
  },
  button1: {
    backgroundColor: "#003337",
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  input: {
    paddingStart: 10,
    height: 40,
    borderColor: "#003337",
    borderWidth: 1,
    marginTop: 1,
    marginBottom: 20,
    width: 300,
    borderRadius: 5,
    alignSelf: "center",
  },
  container1: {
    display: "flex",
    flexDirection: "row",
    alignContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 15,
    marginBottom: 1,
  },
  containerOperation: {
    alignContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  result1: {
    alignSelf: "flex-start",
    marginLeft: 40,
    marginTop: 10,
    color: "#2d644d",
    fontSize: 24,
    fontWeight: "bold",
  },
  result2: {
    alignSelf: "flex-start",
    marginLeft: 40,
    marginTop: 10,
    color: "#003337",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Calculator;
