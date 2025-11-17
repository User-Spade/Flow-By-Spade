import React, { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Animated,
  TouchableWithoutFeedback,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";

// ----- DATA -----
const positions = [
  {
    id: "guard",
    name: "Closed Guard",
    icon: "shield-checkmark-outline" as const,
    techniques: [
      { id: "armbar", name: "Armbar", icon: "hand-left-outline" as const },
      { id: "kimura", name: "Kimura", icon: "move-outline" as const },
      { id: "triangle", name: "Triangle", icon: "triangle-outline" as const },
    ],
  },
  {
    id: "mount",
    name: "Mount",
    icon: "ellipse-outline" as const,
    techniques: [
      { id: "americana", name: "Americana", icon: "reorder-four-outline" as const },
      { id: "crosschoke", name: "Cross Choke", icon: "add-outline" as const },
      { id: "armbar-mount", name: "Armbar", icon: "hand-left-outline" as const },
    ],
  },
  {
    id: "sidecontrol",
    name: "Side Control",
    icon: "podium-outline" as const,
    techniques: [
      { id: "kimura-side", name: "Kimura", icon: "move-outline" as const },
      { id: "kneeonbelly", name: "Knee-on-Belly", icon: "swap-vertical-outline" as const },
      { id: "americana-side", name: "Americana", icon: "reorder-four-outline" as const },
    ],
  },
];

// ----- COMPONENT -----
export default function LibraryScreen() {
  const [selectedPositionId, setSelectedPositionId] = useState<string | null>(null);
  const router = useRouter();

  // Dynamic animated scales based on actual data
  const posScales = useRef(
    positions.map(() => new Animated.Value(1))
  ).current;

  const techScales = useRef(
    positions.map((pos) => pos.techniques.map(() => new Animated.Value(1)))
  ).current;

  // Gesture tracking to differentiate swipes from taps
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const SWIPE_THRESHOLD = 10; // pixels

  const handlePressIn = (ref: Animated.Value, e: any) => {
    const touch = e.nativeEvent;
    touchStart.current = { x: touch.pageX, y: touch.pageY };
    
    Animated.spring(ref, {
      toValue: 0.95,
      useNativeDriver: true,
      bounciness: 7,
    }).start();
  };

  const handlePressOut = (ref: Animated.Value, e: any, cb?: () => void) => {
    Animated.spring(ref, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 7,
    }).start();

    if (!touchStart.current) return;

    const touch = e.nativeEvent;
    const deltaX = Math.abs(touch.pageX - touchStart.current.x);
    const deltaY = Math.abs(touch.pageY - touchStart.current.y);

    // Only trigger callback if movement is small (not a swipe)
    if (deltaX < SWIPE_THRESHOLD && deltaY < SWIPE_THRESHOLD) {
      cb && cb();
    }

    touchStart.current = null;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#FFF" />
      </Pressable>
      <Text style={styles.title}>Library</Text>

      {/* Positions row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.rowScroll}
        contentContainerStyle={{ paddingLeft: 17 }}
      >
        {positions.map((pos, i) => {
          const isSelected = selectedPositionId === pos.id;
          return (
            <TouchableWithoutFeedback
              key={pos.id}
              onPressIn={(e) => handlePressIn(posScales[i], e)}
              onPressOut={(e) =>
                handlePressOut(posScales[i], e, () =>
                  setSelectedPositionId(isSelected ? null : pos.id)
                )
              }
            >
              <Animated.View
                style={[
                  styles.positionCard,
                  {
                    transform: [{ scale: posScales[i] }],
                    borderColor: isSelected ? "#F18805" : "rgba(255,255,255,0.11)",
                  },
                ]}
              >
                <View style={styles.posIconWrap}>
                  <Ionicons name={pos.icon} size={34} color="#84DCC6" />
                </View>
                <Text style={[styles.posName, isSelected && styles.posNameSelected]}>
                  {pos.name}
                </Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>

      {/* Techniques row for selected position */}
      {selectedPositionId && (() => {
        const selectedPos = positions.find((p) => p.id === selectedPositionId);
        const posIndex = positions.findIndex((p) => p.id === selectedPositionId);
        
        if (!selectedPos) return null;

        return (
          <View style={styles.techniquesContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.rowScroll}
              contentContainerStyle={{ paddingLeft: 17 }}
            >
              {selectedPos.techniques.map((tech, j) => (
                <TouchableWithoutFeedback
                  key={tech.id}
                  onPressIn={(e) => handlePressIn(techScales[posIndex][j], e)}
                  onPressOut={(e) => handlePressOut(techScales[posIndex][j], e)}
                >
                  <Animated.View
                    style={[
                      styles.techniqueCard,
                      {
                        transform: [{ scale: techScales[posIndex][j] }],
                      },
                    ]}
                  >
                    <View style={styles.techThumb}>
                      <Ionicons name={tech.icon} size={30} color="#AEB0B5" />
                    </View>
                    <Text style={styles.techName}>{tech.name}</Text>
                  </Animated.View>
                </TouchableWithoutFeedback>
              ))}
            </ScrollView>
          </View>
        );
      })()}
    </View>
  );
}

// ----- STYLES -----
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222222",
    paddingTop: 56,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginBottom: 8,
  },
  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    letterSpacing: -0.7,
    marginLeft: 19,
    marginBottom: 24,
  },
  rowScroll: {
    flexGrow: 0,
    minHeight: 1,
  },
  positionCard: {
    backgroundColor: "rgba(44,44,49,0.82)",
    flexDirection: "column",
    alignItems: "center",
    marginRight: 16,
    borderRadius: 24,
    padding: 20,
    paddingTop: 20,
    paddingBottom: 11,
    borderWidth: 1.7,
    minWidth: 118,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 4,
  },
  posIconWrap: {
    backgroundColor: "rgba(132,220,198,0.12)",
    padding: 12,
    borderRadius: 19,
    marginBottom: 9,
  },
  posName: {
    color: "#f2f4f7",
    fontSize: 18,
    fontWeight: "700",
  },
  posNameSelected: {
    color: "#F18805",
  },
  techniquesContainer: {
    marginTop: 26,
    marginBottom: 13,
  },
  techniqueCard: {
    alignItems: "center",
    marginRight: 12,
    backgroundColor: "rgba(44,44,49,0.82)",
    borderRadius: 20,
    padding: 14,
    paddingTop: 14,
    paddingBottom: 13,
    paddingHorizontal: 18,
    borderWidth: 1.2,
    borderColor: "rgba(255,255,255,0.12)",
    flexDirection: "column",
    minWidth: 82,
    minHeight: 90,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 3,
  },
  techThumb: {
    backgroundColor: "rgba(160,160,160,0.12)",
    width: 47,
    height: 47,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 11,
  },
  techName: {
    color: "#f7f9fa",
    fontSize: 15.5,
    fontWeight: "600",
    textAlign: "center",
  },
});
