import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";

export const HelpDialog = ({
  theory,
  setShowHelpDialog,
  mainColor
                           }) => {
  return (
    <View style={styles.darkBackground}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: mainColor }]}>
          Help
        </Text>
        <Text style={[styles.theory, { color: mainColor }]}>
          {theory}
        </Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: mainColor }]} onPress={() => setShowHelpDialog(false)}>
          <Text style={styles.buttonText}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  darkBackground: {
    width: Dimensions.get('window').width,
    height: '100%',
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.32)',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: '20%',
    paddingHorizontal: 20,
    paddingTop: 20,
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  theory: {
    fontSize: 12,
    marginBottom: 20,
  },
  button: {
    width: '45%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 50,
    position: 'relative',
    shadowColor: 'rgba(9,9,9,0.49)',
    shadowOffsetY: 20,
    elevation: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
  }
})
