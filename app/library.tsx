import React, { useState, useRef, useEffect } from "react";
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
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../constants/theme";
import { databaseService } from "../services/databaseService";
import type { Position, BeltLevel, FoundationCategory } from "../data/types/database.types";

// ----- DATA -----
const beltLevels = [
  { id: "white" as BeltLevel, label: "White", color: "#EDEDED" },
  { id: "blue" as BeltLevel, label: "Blue", color: "#1E88E5" },
  { id: "purple" as BeltLevel, label: "Purple", color: "#7E57C2" },
  { id: "brown" as BeltLevel, label: "Brown", color: "#8D6E63" },
  { id: "black" as BeltLevel, label: "Black", color: "#000000" },
];

// Category to icon mapping
const categoryIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  standing: "man-outline",
  top_control: "arrow-up-circle-outline",
  guard: "shield-checkmark-outline",
  bottom_control: "arrow-down-circle-outline",
  leg_entanglement: "git-network-outline",
  advanced_guard: "shield-outline",
  hybrid: "git-compare-outline",
  transition_state: "swap-horizontal-outline",
};

// Category display names
const categoryNames: Record<string, string> = {
  standing: "Standing",
  top_control: "Top Control",
  guard: "Guard",
  bottom_control: "Bottom Control",
  leg_entanglement: "Leg Entanglement",
  advanced_guard: "Advanced Guard",
  hybrid: "Hybrid",
  transition_state: "Transition",
};

// ----- COMPONENT -----
export default function LibraryScreen() {
  const [selectedBeltId, setSelectedBeltId] = useState<BeltLevel | null>(null);
  const [selectedPositionId, setSelectedPositionId] = useState<string | null>(null);
  const [selectedFoundation, setSelectedFoundation] = useState<FoundationCategory | null>(null);
  const [selectedTechniqueId, setSelectedTechniqueId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageWidth, setPageWidth] = useState<number>(0);
  const [positions, setPositions] = useState<Array<{ id: string; name: string; category: string; icon: keyof typeof Ionicons.glyphMap }>>([]);
  const [foundations, setFoundations] = useState<Array<{ id: FoundationCategory; rank: number; display: string }>>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const techniqueCardRefs = useRef<Map<string, View>>(new Map());
  const pageScrollRef = useRef<ScrollView>(null);
  const techniquesViewRef = useRef<View>(null);

  // Dynamic animated scales
  const beltScales = useRef(beltLevels.map(() => new Animated.Value(1))).current;
  const foundationScales = useRef<Animated.Value[]>([]).current;
  const [posScales, setPosScales] = useState<Animated.Value[]>([]);

  // Load foundations & positions from database based on selection
  useEffect(() => {
    const load = () => {
      const foundationList = databaseService.getFoundations();
      setFoundations(foundationList);
      if (foundationScales.length === 0 && foundationList.length > 0) {
        foundationList.forEach(() => foundationScales.push(new Animated.Value(1)));
      }
      if (selectedFoundation) {
        const filteredPositions = databaseService.getPositionsByFoundationAndBelt(selectedFoundation, selectedBeltId || null);
        const list: Array<{ id: string; name: string; category: string; icon: keyof typeof Ionicons.glyphMap }> = [];
        Object.entries(filteredPositions).forEach(([id, position]) => {
          list.push({
            id,
            name: position.learning.display_name,
            category: position.system.category,
            icon: categoryIcons[position.system.category] || "help-circle-outline",
          });
        });
        setPositions(list);
        setCategories([]);
        setPosScales(list.map(() => new Animated.Value(1)));
      } else {
        setPositions([]);
        setCategories([]);
        setPosScales([]);
      }
    };
    load();
  }, [selectedBeltId, selectedFoundation]);

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

  const handlePositionSelect = (posId: string) => {
    const newPositionId = posId === selectedPositionId ? null : posId;
    setSelectedPositionId(newPositionId);
    
    // Scroll to techniques section after a short delay to let it render
    if (newPositionId && scrollViewRef.current) {
      setTimeout(() => {
        if (techniquesViewRef.current && scrollViewRef.current) {
          techniquesViewRef.current.measureLayout(
            scrollViewRef.current as any,
            (x, y) => {
              scrollViewRef.current?.scrollTo({
                y: Math.max(0, y - 20),
                animated: true,
              });
            },
            () => {}
          );
        }
      }, 200);
    }
  };

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    if (pageWidth <= 0) return;
    const page = Math.round(offsetX / pageWidth);
    if (page !== currentPage) setCurrentPage(page);
  };

  return (
    <ScrollView 
      ref={scrollViewRef}
      style={styles.container} 
      showsVerticalScrollIndicator={false}
    >
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
                    { color: isSelected ? (belt.id === "white" ? "#222222" : "#FFF") : "#AEB0B5" },
                  ]}
                >
                  {belt.label}
                </Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>

      {/* Foundation Filter Section */}
      <Text style={styles.sectionLabel}>Foundation Filter</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.beltScroll}
        contentContainerStyle={{ paddingRight: 20 }}
      >
        {foundations.map((f, i) => {
          const isSelected = selectedFoundation === f.id;
          const scaleRef = foundationScales[i];
          return (
            <TouchableWithoutFeedback
              key={f.id}
              onPressIn={(e) => handlePressIn(scaleRef, e)}
              onPressOut={(e) => handlePressOut(scaleRef, e, () => {
                setSelectedFoundation(isSelected ? null : f.id);
                setSelectedPositionId(null);
              })}
            >
              <Animated.View
                style={[
                  styles.foundationChip,
                  {
                    transform: [{ scale: scaleRef }],
                    backgroundColor: isSelected ? '#2E3B4E' : 'rgba(44,44,49,0.82)',
                    borderColor: isSelected ? '#F18805' : 'rgba(255,255,255,0.12)'
                  }
                ]}
              >
                <Ionicons name={isSelected ? 'shield-checkmark' : 'layers-outline'} size={22} color={isSelected ? '#F18805' : '#84DCC6'} />
                <Text
                  style={[
                    styles.foundationLabel,
                    { color: isSelected ? '#F18805' : '#AEB0B5' }
                  ]}
                  numberOfLines={2}
                >
                  {f.display}
                </Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>

      {selectedFoundation && (
        <>
          <Text style={styles.sectionLabel}>Positions in {foundations.find(x => x.id === selectedFoundation)?.display}</Text>
          <View style={styles.positionsGrid}>
            {positions.map((pos, i) => {
              const isSelected = selectedPositionId === pos.id;
              return (
                <TouchableWithoutFeedback
                  key={pos.id}
                  onPressIn={(e) => handlePressIn(posScales[i], e)}
                  onPressOut={(e) => handlePressOut(posScales[i], e, () => handlePositionSelect(pos.id))}
                >
                  <Animated.View
                    style={[
                      styles.positionCard,
                      {
                        transform: [{ scale: posScales[i] }],
                        borderColor: isSelected ? '#F18805' : 'rgba(255,255,255,0.12)'
                      }
                    ]}
                  >
                    <Ionicons name={pos.icon} size={26} color={isSelected ? '#F18805' : '#84DCC6'} />
                    <Text style={[styles.posName, isSelected && styles.posNameSelected]}>
                      {pos.name}
                    </Text>
                  </Animated.View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </>
      )}

      {/* Techniques Section */}
      {selectedPositionId && (() => {
        const position = databaseService.getPosition(selectedPositionId);
        if (!position) return null;

        const beltContent = selectedBeltId 
          ? databaseService.getPositionBeltContent(selectedPositionId, selectedBeltId)
          : position.belt_levels.white; // Default to white belt if no filter

        // Get available techniques for this position at current belt level
        const techniques = databaseService.getTechniquesForPosition(selectedPositionId, selectedBeltId || 'white');

        return (
        <View 
          style={styles.techniquesSection}
          ref={techniquesViewRef}
        >
          <View style={styles.sectionDivider} />
          <Text style={styles.selectedPositionLabel}>
            Selected Position: {position.learning.display_name}
          </Text>
          
          {/* Display Position Information */}
          <View style={styles.positionInfoCard}>
            <Text style={styles.positionDescription}>{position.learning.description}</Text>
            
            {beltContent && beltContent.concepts && beltContent.concepts.length > 0 && (
              <View style={styles.conceptsSection}>
                <Text style={styles.conceptsTitle}>Key Concepts:</Text>
                {beltContent.concepts.map((concept, idx) => (
                  <Text key={idx} style={styles.conceptItem}>• {concept}</Text>
                ))}
              </View>
            )}

            {beltContent && beltContent.key_details && beltContent.key_details.length > 0 && (
              <View style={styles.conceptsSection}>
                <Text style={styles.conceptsTitle}>Key Details:</Text>
                {beltContent.key_details.map((detail, idx) => (
                  <Text key={idx} style={styles.conceptItem}>• {detail}</Text>
                ))}
              </View>
            )}

            {beltContent && beltContent.common_mistakes && beltContent.common_mistakes.length > 0 && (
              <View style={styles.conceptsSection}>
                <Text style={styles.conceptsTitle}>Common Mistakes:</Text>
                {beltContent.common_mistakes.map((mistake, idx) => (
                  <Text key={idx} style={styles.mistakeItem}>• {mistake}</Text>
                ))}
              </View>
            )}

            {beltContent && beltContent.transitions_available && beltContent.transitions_available.length > 0 && (
              <View style={styles.conceptsSection}>
                <Text style={styles.conceptsTitle}>Available Transitions:</Text>
                {beltContent.transitions_available.map((transitionId, idx) => {
                  const transPosition = databaseService.getPosition(transitionId);
                  return transPosition ? (
                    <Text key={idx} style={styles.transitionItem}>
                      → {transPosition.learning.display_name}
                    </Text>
                  ) : null;
                })}
              </View>
            )}
          </View>

          {/* TODO: Display techniques when they are populated in database */}
          {techniques.length > 0 && (
            <>
              <View style={styles.sectionDivider} />
              <Text style={styles.techniquesTitle}>Techniques from this Position</Text>
              <Text style={styles.techniquesComingSoon}>Technique details coming soon...</Text>
            </>
          )}
        </View>
        );
      })()}
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
  foundationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 10,
    borderWidth: 1.5,
    maxWidth: 160,
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  foundationLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 8,
    flexShrink: 1,
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
  techniquesSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: "rgba(132, 220, 198, 0.2)",
    marginBottom: 15,
  },
  selectedPositionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#84DCC6",
    marginBottom: 15,
    textAlign: "center",
  },
  techniqueCard: {
    backgroundColor: "rgba(20, 20, 30, 0.6)",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(132, 220, 198, 0.2)",
  },
  techniqueCardExpanded: {
    backgroundColor: "rgba(44,44,49,0.92)",
    borderColor: "rgba(255,255,255,0.12)",
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    marginBottom: 16,
    minHeight: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 4,
  },
  techniqueCardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  playIcon: {
    marginRight: 12,
  },
  techniqueInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  techniqueName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginRight: 6,
  },
  techniqueType: {
    fontSize: 14,
    fontWeight: "400",
    color: "#AEB0B5",
  },
  expandedContent: {
    flex: 1,
  },
  expandedHeader: {
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  expandedTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  closeButton: {
    padding: 8,
    marginRight: 4,
    marginLeft: -8,
  },
  expandedIcon: {
    marginRight: 8,
  },
  expandedTitleContainer: {
    flex: 1,
  },
  expandedTechniqueName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  expandedTechniqueType: {
    fontSize: 14,
    fontWeight: "400",
    color: "#AEB0B5",
  },
  detailsDivider: {
    height: 1,
    backgroundColor: "rgba(132, 220, 198, 0.15)",
    marginVertical: 16,
  },
  detailsSection: {
    marginBottom: 8,
  },
  detailsSectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#84DCC6",
    marginBottom: 10,
  },
  detailItem: {
    fontSize: 14,
    fontWeight: "400",
    color: "#FFFFFF",
    lineHeight: 22,
    marginBottom: 6,
    paddingLeft: 4,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(132, 220, 198, 0.3)",
  },
  paginationDotActive: {
    backgroundColor: "#84DCC6",
  },
  pagesContainer: {
    flex: 1,
    marginTop: 12,
  },
  pagesWrapper: {
    flexDirection: "row",
  },
  page: {
    paddingRight: 0,
  },
  videoPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(50,52,59,0.92)",
    borderRadius: 12,
    padding: 32,
    marginVertical: 16,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.08)",
    borderStyle: "dashed",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  videoPlaceholderText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.mint,
    marginTop: 14,
    marginBottom: 6,
  },
  videoPlaceholderSubtext: {
    fontSize: 14,
    fontWeight: "400",
    color: "#AEB0B5",
    textAlign: "center",
  },
  positionInfoCard: {
    backgroundColor: "rgba(44,44,49,0.92)",
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(132, 220, 198, 0.2)",
  },
  positionDescription: {
    fontSize: 15,
    fontWeight: "400",
    color: "#FFFFFF",
    lineHeight: 22,
    marginBottom: 16,
  },
  conceptsSection: {
    marginTop: 12,
  },
  conceptsTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#84DCC6",
    marginBottom: 8,
  },
  conceptItem: {
    fontSize: 14,
    fontWeight: "400",
    color: "#FFFFFF",
    lineHeight: 21,
    marginBottom: 5,
    paddingLeft: 4,
  },
  mistakeItem: {
    fontSize: 14,
    fontWeight: "400",
    color: "#FFB4A2",
    lineHeight: 21,
    marginBottom: 5,
    paddingLeft: 4,
  },
  transitionItem: {
    fontSize: 14,
    fontWeight: "400",
    color: "#84DCC6",
    lineHeight: 21,
    marginBottom: 5,
    paddingLeft: 4,
  },
  techniquesTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#84DCC6",
    marginTop: 8,
    marginBottom: 8,
  },
  techniquesComingSoon: {
    fontSize: 14,
    fontWeight: "400",
    color: "#AEB0B5",
    textAlign: "center",
    paddingVertical: 12,
  },
});
