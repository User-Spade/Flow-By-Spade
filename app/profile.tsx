import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Animated, TouchableWithoutFeedback, ScrollView, StatusBar, View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

const BACKGROUND = "#222222";
const CARD_BG = "rgba(44, 44, 49, 0.76)";
const CARD_BORDER = "rgba(255,255,255,0.085)";
const BLUE = "#0081A7";
const WHITE = "#FFF";
const GLASS_SHADOW = "#000";
const BUTTON_BG = "rgba(44, 44, 49, 0.88)";

export default function ProfileScreen() {
  const router = useRouter();
  const scale = React.useRef(new Animated.Value(1)).current;
  const onPressIn = () => Animated.spring(scale, {
    toValue: 0.97,
    useNativeDriver: true,
    speed: 20,
    bounciness: 6,
  }).start();
  const onPressOut = () => Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
    speed: 18,
    bounciness: 8,
  }).start();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 44 }}>
      <StatusBar barStyle="light-content" />
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color={WHITE} />
      </Pressable>
      <Text style={styles.header}>Profile</Text>
      <View style={styles.center}>
        <View style={styles.avatarWrap}>
          <Ionicons name="person-circle-outline" size={98} color="#AEB0B5" />
        </View>
        <View style={styles.beltLabel}>
          <Ionicons name="ellipse" size={18} color={BLUE} style={{ marginRight: 7 }} />
          <Text style={styles.beltText}>Blue Belt</Text>
        </View>
        <TouchableWithoutFeedback
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <Animated.View
            style={[
              styles.editButton,
              {
                transform: [{ scale }],
                shadowColor: GLASS_SHADOW,
                shadowOpacity: 0.16,
                shadowRadius: 14,
                shadowOffset: { width: 0, height: 6 },
                elevation: 5,
              }
            ]}
          >
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Info</Text>
        <View style={styles.glassField}>
          <Text style={styles.glassLabel}>Name</Text>
          <Text style={styles.glassValue}>John Doe</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 60,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    marginLeft: -8,
  },
  header: {
    fontSize: 32,
    color: WHITE,
    fontWeight: '700',
    marginBottom: 32,
  },
  center: {
    alignItems: 'center',
    marginBottom: 38,
  },
  avatarWrap: {
    backgroundColor: CARD_BG,
    borderRadius: 68,
    width: 112,
    height: 112,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: CARD_BORDER,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 28,
    elevation: 8,
    marginBottom: 18,
  },
  beltLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_BG,
    borderRadius: 14,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 14,
    paddingRight: 19,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: CARD_BORDER,
  },
  beltText: {
    color: BLUE,
    fontSize: 19,
    marginLeft: 4,
    fontWeight: '700',
  },
  editButton: {
    width: 158,
    height: 44,
    borderRadius: 15,
    backgroundColor: BUTTON_BG,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 0.7,
    borderColor: CARD_BORDER,
  },
  editBtnText: {
    color: WHITE,
    fontSize: 16.5,
    fontWeight: '600',
    letterSpacing: 0.04,
  },
  section: {
    marginTop: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    color: WHITE,
    marginBottom: 18,
    fontSize: 20,
    fontWeight: '700',
  },
  glassField: {
    width: '100%',
    backgroundColor: CARD_BG,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    paddingTop: 17,
    paddingBottom: 12,
    paddingLeft: 22,
    paddingRight: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  glassLabel: {
    color: '#b5b7bb',
    fontSize: 16.3,
    fontWeight: '600',
    marginRight: 16,
    width: 70,
  },
  glassValue: {
    color: WHITE,
    fontSize: 17.5,
    fontWeight: '500',
  },
});
