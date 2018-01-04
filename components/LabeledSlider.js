
import React from 'react';
import { View, Text, Slider } from 'react-native';

export default function LabeledSlider(props) {
  const { step, value, max, onChange, unit } = props;
  return (
    <View>
      <Slider
        step={step}
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
      />
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  );
}
