import React, { Component } from "react";
import {
  Provider as PaperProvider,
  TextInput,
  Button,
  DefaultTheme,
  Snackbar,
} from "react-native-paper";
import { StyleSheet, View, Text, ImageBackground, Linking } from "react-native";
import bg from "./assets/image/bg.png";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#4281B3",
    accent: "#f1c40f",
  },
};

class Main extends Component {
  state = {
    nomer: "",
    visible: false,
    msg: "",
  };

  buttonWa = () => {
    let number = this.state.nomer;
    let reg = /\d/g;
    let isText = isNaN(number);

    if (number == "") {
      this.setState({ msg: "Harus di isi !" });
      return this.setState({ visible: true });
    }

    if (isText) {
      this.setState({ msg: "Hanya menerima karakter angka !" });
      return this.setState({ visible: true });
    }

    let splicedNumber = number.slice(0, 2);

    if (splicedNumber == 62) {
      Linking.openURL("whatsapp://send?text=&phone=" + number);
    } else {
      splicedNumber = number.slice(1);
      number = 62 + splicedNumber;
      Linking.openURL("whatsapp://send?text=&phone=" + number);
    }
  };

  closeSnackBar = () => {
    return this.setState({ visible: false });
  };

  render() {
    return (
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <ImageBackground source={bg} style={styles.image}>
            <View style={styles.topSect}>
              <View style={styles.coverTitle}>
                <Text style={styles.wa}>WA.</Text>
                <Text style={styles.me}>me</Text>
              </View>
            </View>
            <View style={styles.bottomSect}>
              <View style={styles.content}>
                <TextInput
                  label="Masukkan nomer telepon"
                  value={this.state.nomer}
                  onChangeText={(text) => this.setState({ nomer: text })}
                  mode="outlined"
                  style={styles.textInput}
                  dense
                  keyboardType={"number-pad"}
                />
                <Button
                  icon="whatsapp"
                  mode="contained"
                  onPress={this.buttonWa}
                  style={styles.buttonKirim}
                >
                  Kirim Pesan
                </Button>
              </View>
            </View>
          </ImageBackground>
          <Snackbar
            duration={1000}
            visible={this.state.visible}
            onDismiss={this.closeSnackBar}
            action={{
              label: "Tutup",
              onPress: () => {
                // Do something
              },
            }}
          >
            {this.state.msg}
          </Snackbar>
        </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  cols: {
    flex: 1,
  },
  topSect: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  coverTitle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  wa: {
    fontSize: 50,
    fontWeight: "bold",
  },
  me: {
    marginBottom: 6,
    fontSize: 24,
    textAlignVertical: "bottom",
  },
  bottomSect: {
    flex: 1,
    paddingHorizontal: 38,
  },
  content: {
    position: "relative",
    top: 80,
  },
  textInput: {
    backgroundColor: "#A2D2FF",
    marginBottom: 20,
  },
  buttonKirim: {
    backgroundColor: "#2A577F",
    borderRadius: 50,
  },
});

export default Main;
