
        import React from "react";
        import { Ionicons, Feather } from "@expo/vector-icons";
        import { Animated, TouchableWithoutFeedback, ScrollView, View, Text, TextInput, StatusBar, StyleSheet, Pressable } from "react-native";
        import { useRouter } from "expo-router";

        // Color constants (for reference only)
        // const BACKGROUND = "#222222";
        // const CARD_BG = "rgba(44, 44, 49, 0.77)";
        // const CARD_BORDER = "rgba(255,255,255,0.10)";
        // const SEARCH_BG = "rgba(50,52,59,0.90)";
        // const WHITE = "#FFF";
        // const FILTER_BG = "rgba(32,34,40,0.92)";
        // const ACCENT = "#F18805";
        // const PLACEHOLDER_IMG = "rgba(138,138,146,0.22)";

        const techniqueData = [
          {
            id: "1",
            name: "Closed Guard",
            description: "Classic positional hold from bottom.",
          },
          {
            id: "2",
            name: "Kimura",
            description: "Shoulder lock submission from guard or side.",
          },
          {
            id: "3",
            name: "Armbar from Guard",
            description: "Submission using hips and leverage.",
          },
        ];

        export default function LibraryScreen() {
          const router = useRouter();
          const scales = techniqueData.map(() => React.useRef(new Animated.Value(1)).current);

          const onPressIn = (i) => {
            Animated.spring(scales[i], {
              toValue: 0.96,
              useNativeDriver: true,
              speed: 20,
              bounciness: 6,
            }).start();
          };
          const onPressOut = (i) => {
            Animated.spring(scales[i], {
              toValue: 1,
              useNativeDriver: true,
              speed: 22,
              bounciness: 9,
            }).start();
          };

          return (
            <View style={styles.container}>
              <StatusBar barStyle="light-content" />
              <Pressable style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={28} color="#FFF" />
              </Pressable>
              <Text style={styles.header}>Library</Text>
              <View style={styles.searchBarContainer}>
                <Ionicons name="search-outline" size={20} color="#AEB0B5" style={{ marginLeft: 16, marginRight: 8 }} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search techniques"
                  placeholderTextColor="#AEB0B5"
                  editable={false}
                  pointerEvents="none"
                />
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={{ alignItems: 'center' }}>
                <View style={styles.filterChip}>
                  <Feather name="command" size={15} color="#FFF" style={{ marginRight: 7 }} />
                  <Text style={styles.filterChipText}>Category</Text>
                </View>
                <View style={styles.filterChip}>
                  <Feather name="award" size={15} color="#FFF" style={{ marginRight: 7 }} />
                  <Text style={styles.filterChipText}>Belt Level</Text>
                </View>
              </ScrollView>
              <ScrollView showsVerticalScrollIndicator={false} style={styles.techniquesScroll} contentContainerStyle={{ paddingBottom: 48 }}>
                {techniqueData.map((tech, i) => (
                  <TouchableWithoutFeedback
                    key={tech.id}
                    onPressIn={() => onPressIn(i)}
                    onPressOut={() => onPressOut(i)}
                  >
                    <Animated.View
                      style={[
                        styles.techniqueCard,
                        {
                          transform: [{ scale: scales[i] }],
                          shadowOpacity: scales[i].interpolate
                            ? scales[i].interpolate({ inputRange: [0.96, 1], outputRange: [0.13, 0.22] })
                            : 0.23,
                        },
                      ]}
                    >
                      <View style={styles.thumbGlass}>
                        <Ionicons name="image-outline" size={32} color="#9496A1" />
                      </View>
                      <View style={styles.techContent}>
                        <Text style={styles.techTitle}>{tech.name}</Text>
                        <Text style={styles.techDesc} numberOfLines={1}>{tech.description}</Text>
                      </View>
                    </Animated.View>
                  </TouchableWithoutFeedback>
                ))}
              </ScrollView>
            </View>
          );
        }

        const styles = StyleSheet.create({
          container: {
            flex: 1,
            backgroundColor: '#222222',
            paddingLeft: 18,
            paddingRight: 18,
            paddingTop: 53,
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
            color: '#FFF',
            fontWeight: 'bold',
            marginBottom: 22,
            letterSpacing: -0.2,
          },
          searchBarContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(50,52,59,0.90)',
            borderRadius: 22,
            paddingLeft: 6,
            paddingRight: 6,
            height: 44,
            marginBottom: 21,
            borderWidth: 1,
            borderColor: '#3f4147', // fallback solid color
          },
          searchInput: {
            color: '#FFF',
            fontSize: 17,
            paddingLeft: 4,
            flex: 1,
          },
          filterScroll: {
            flexGrow: 0,
            marginBottom: 16,
            marginLeft: -3,
          },
          filterChip: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#23242a', // fallback solid color
            borderRadius: 16,
            paddingTop: 7,
            paddingBottom: 7,
            paddingLeft: 13,
            paddingRight: 18,
            marginRight: 11,
            borderWidth: 0.7,
            borderColor: '#35363b', // fallback solid color
            minWidth: 42,
          },
          filterChipText: {
            color: '#FFF',
            fontSize: 15,
            fontWeight: '600',
          },
          techniquesScroll: {
            flexGrow: 1,
          },
          techniqueCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#2c2c31', // fallback solid color
            borderRadius: 18,
            borderWidth: 1,
            borderColor: '#35363b', // fallback solid color
            marginBottom: 18,
            height: 84,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 13,
            elevation: 4,
            paddingLeft: 9,
            paddingRight: 16,
          },
          thumbGlass: {
            width: 60,
            height: 60,
            backgroundColor: '#8a8a92', // fallback solid color
            borderRadius: 17,
            marginRight: 18,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0.9,
            borderColor: '#b4b6bc', // fallback solid color
          },
          techContent: {
            flex: 1,
            justifyContent: 'center',
          },
          techTitle: {
            color: '#FFF',
            fontSize: 20,
            fontWeight: '700',
            marginBottom: 4,
          },
          techDesc: {
            color: '#b4b6bc',
            fontSize: 15,
            fontWeight: '400',
            letterSpacing: 0.1,
          },
        });
