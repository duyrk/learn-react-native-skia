import { Text, View, StyleSheet, Dimensions } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Canvas, Rect, SweepGradient, vec } from "@shopify/react-native-skia";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
const { width, height } = Dimensions.get("window");
const Index = () => {
  const insets = useSafeAreaInsets();
  const rotation = useSharedValue(0);
  const animatedRotation = useDerivedValue(()=>{
      return [{rotate: Math.PI * rotation.value}]
  },[rotation])
  const centerX = width / 2;
  const centerY = height / 2;
  const centerVec = vec(centerX, centerY);
  const startRotate = () =>{
    rotation.value = withRepeat(withTiming(2, {duration: 4000, easing: Easing.linear}), -1, false)
  }
  useEffect(()=>{
    startRotate()
  },[])
  return (
    <View style={[styles.container]}>
      <Canvas style={styles.container}>
        <Rect x={0} height={0} width={width} height={height} color={"black"}>
          <SweepGradient origin={centerVec} c={centerVec} colors={["white", "grey", "#222222", "black"]} start={0} end={360}
          transform={animatedRotation}/>
        </Rect>
      </Canvas>
      <Text style={[styles.textDay, { top: insets.top + 20, color: "black" }]}>
        DAY
      </Text>
      <Text
        style={[styles.textDay, { bottom: insets.bottom + 20, color: "white" }]}
      >
        NIGHT
      </Text>
    </View>
  );
};

export default Index;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    width: 275,
    height: 275,
  },
  textDay: {
    width: "100%",
    textAlign: "center",
    position: "absolute",
    fontSize: 62,
    fontWeight: "200",
  },
});
