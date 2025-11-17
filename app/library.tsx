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
const beltLevels = [
  { id: "white", label: "W", color: "#EDEDED" },
  { id: "blue", label: "Bl", color: "#1E88E5" },
  { id: "purple", label: "Pu", color: "#7E57C2" },
  { id: "brown", label: "Br", color: "#8D6E63" },
  { id: "black", label: "Bk", color: "#000000" },
  { id: "red", label: "R", color: "#D32F2F" },
];

const positions = [
  { id: "standing", name: "Standing", icon: "man-outline" as const },
  { id: "guard", name: "Guard", icon: "shield-checkmark-outline" as const },
  { id: "halfguard", name: "Half Guard", icon: "git-compare-outline" as const },
  { id: "mount", name: "Mount", icon: "ellipse-outline" as const },
  { id: "sidecontrol", name: "Side Control", icon: "podium-outline" as const },
  { id: "back", name: "Back", icon: "arrow-back-circle-outline" as const },
  { id: "turtle", name: "Turtle", icon: "radio-button-off-outline" as const },
  { id: "legs", name: "Legs", icon: "git-network-outline" as const },
];

// ----- COMPONENT -----
export default function LibraryScreen() {
  const [selectedBeltId, setSelectedBeltId] = useState<string | null>(null);
  const [selectedPositionId, setSelectedPositionId] = useState<string | null>(null);
  const router = useRouter();

  // Dynamic animated scales
  const beltScales = useRef(beltLevels.map(() => new Animated.Value(1))).current;
  const posScales = useRef(positions.map(() => new Animated.Value(1))).current;

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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" />
      
      {/* Back Button */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#FFF" />
      </Pressable>

      {/* Header */}
      <Text style={styles.title}>Library</Text>
      <Text style={styles.subtitle}>Explore techniques & positions freely</Text>

      {/* Search Button */}
      <Pressable style={styles.searchButton}>
        <Ionicons name="search-outline" size={22} color="#AEB0B5" />
        <Text style={styles.searchPlaceholder}>Search techniques</Text>
      </Pressable>

      {/* Belt Filter Section */}
      <Text style={styles.sectionLabel}>Belt Filter</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.beltScroll}
        contentContainerStyle={{ paddingRight: 20 }}
      >
        {beltLevels.map((belt, i) => {
          const isSelected = selectedBeltId === belt.id;
          return (
            <TouchableWithoutFeedback
              key={belt.id}
              onPressIn={(e) => handlePressIn(beltScales[i], e)}
              onPressOut={(e) =>
                handlePressOut(beltScales[i], e, () =>
                  setSelectedBeltId(isSelected ? null : belt.id)
                )
              }
            >
              <Animated.View
                style={[
                  styles.beltChip,
                  {
                    transform: [{ scale: beltScales[i] }],
                    backgroundColor: isSelected ? belt.color : "rgba(44,44,49,0.82)",
                    borderColor: isSelected ? belt.color : "rgba(255,255,255,0.12)",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.beltLabel,
                    { color: isSelected ? (belt.id === "black" ? "#FFF" : "#FFF") : "#AEB0B5" },
                  ]}
                >
                  {belt.label}
                </Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>

      {/* Positions Section */}
      <Text style={styles.sectionLabel}>Positions</Text>
      <View style={styles.positionsGrid}>
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
                    borderColor: isSelected ? "#F18805" : "rgba(255,255,255,0.12)",
                  },
                ]}
              >
                <Ionicons name={pos.icon} size={26} color={isSelected ? "#F18805" : "#84DCC6"} />
                <Text style={[styles.posName, isSelected && styles.posNameSelected]}>
                  {pos.name}
                </Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>

      {/* Placeholder for techniques (to be shown when position selected) */}
      {selectedPositionId && (
        <View style={styles.techniquesPlaceholder}>
          <Text style={styles.placeholderText}>
            Techniques for {positions.find(p => p.id === selectedPositionId)?.name} will appear here
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

// ----- STYLES -----
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222222",
    paddingTop: 56,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -8,
    marginBottom: 8,
  },
  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    letterSpacing: -0.7,
    marginBottom: 8,
  },
  subtitle: {
    color: "#AEB0B5",
    fontSize: 16,
    marginBottom: 20,
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(50,52,59,0.92)",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  searchPlaceholder: {
    color: "#AEB0B5",
    fontSize: 16,
    marginLeft: 10,
  },
  sectionLabel: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 14,
    marginTop: 4,
  },
  beltScroll: {
    flexGrow: 0,
    marginBottom: 28,
  },
  beltChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 10,
    borderWidth: 1.5,
    minWidth: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  beltLabel: {
    fontSize: 16,
    fontWeight: "700",
  },
  positionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  positionCard: {
    width: "48%",
    backgroundColor: "rgba(44,44,49,0.82)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 4,
  },
  posName: {
    color: "#f2f4f7",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 10,
    flex: 1,
  },
  posNameSelected: {
    color: "#F18805",
  },
  techniquesPlaceholder: {
    backgroundColor: "rgba(44,44,49,0.5)",
    borderRadius: 16,
    padding: 24,
    marginTop: 10,
    marginBottom: 40,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderStyle: "dashed",
  },
  placeholderText: {
    color: "#AEB0B5",
    fontSize: 15,
    textAlign: "center",
  },
});
