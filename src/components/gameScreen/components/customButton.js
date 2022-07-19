import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

export const CustomButton = ({
  color,
  img,
  onTouch
                           }) => {
  return (
    <TouchableOpacity style={[styles.background, {backgroundColor: color}]} onPress={onTouch}>
       <Image source={img}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'relative',
    top: -15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 1,
    width: 36,
    height: 36,
    shadowColor: '#0a0a0a',
    shadowOffsetY: 20,
    elevation: 8,
    marginHorizontal: 15,
  }
})
