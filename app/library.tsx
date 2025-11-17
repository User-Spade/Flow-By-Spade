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
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../constants/theme";

// ----- DATA -----
const beltLevels = [
  { id: "white", label: "White", color: "#EDEDED" },
  { id: "blue", label: "Blue", color: "#1E88E5" },
  { id: "purple", label: "Purple", color: "#7E57C2" },
  { id: "brown", label: "Brown", color: "#8D6E63" },
  { id: "black", label: "Black", color: "#000000" },
  { id: "red", label: "Red", color: "#D32F2F" },
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

// Sample techniques by position
type Technique = {
  id: string;
  name: string;
  type: string;
  whiteBeltBasics: string[];
  bluePurpleDetails: string[];
  brownBlackDetails: string[];
};

const techniquesData: Record<string, Array<Technique>> = {
  guard: [
    {
      id: "cross-collar-choke",
      name: "Cross Collar Choke",
      type: "Submission",
      whiteBeltBasics: [
        "Simple grip sequence",
        "Posture break fundamentals",
        "Core mistakes to avoid",
      ],
      bluePurpleDetails: [
        "Angle correction",
        "Elbow line control",
      ],
      brownBlackDetails: [
        "Micro adjustments",
        "Pressure application",
      ],
    },
    {
      id: "scissor-sweep",
      name: "Scissor Sweep",
      type: "Sweep",
      whiteBeltBasics: [
        "Hip positioning basics",
        "Leg placement and timing",
        "Balance breaking fundamentals",
      ],
      bluePurpleDetails: [
        "Grip fighting integration",
        "Angle adjustments mid-execution",
      ],
      brownBlackDetails: [
        "Chain sweep combinations",
        "Recovery from failed attempts",
      ],
    },
    {
      id: "armbar-guard",
      name: "Armbar from Guard",
      type: "Submission",
      whiteBeltBasics: [
        "Hip escape mechanics",
        "Leg positioning over head",
        "Arm isolation basics",
      ],
      bluePurpleDetails: [
        "Entry timing refinement",
        "Finishing angle control",
      ],
      brownBlackDetails: [
        "Counter prevention details",
        "Transition to triangle/omoplata",
      ],
    },
    {
      id: "hip-bump-sweep",
      name: "Hip Bump Sweep",
      type: "Sweep",
      whiteBeltBasics: [
        "Sit-up guard fundamentals",
        "Timing the bump",
        "Hand placement basics",
      ],
      bluePurpleDetails: [
        "Fake to other sweeps",
        "Kimura grip integration",
      ],
      brownBlackDetails: [
        "Flow between hip bump and kimura",
        "Advanced angle creation",
      ],
    },
    {
      id: "triangle-choke",
      name: "Triangle Choke",
      type: "Submission",
      whiteBeltBasics: [
        "Leg positioning basics",
        "Angle adjustment fundamentals",
        "Arm trap mechanics",
      ],
      bluePurpleDetails: [
        "Hip angle optimization",
        "Squeeze timing refinement",
      ],
      brownBlackDetails: [
        "Entry variations mastery",
        "Armbar/omoplata transitions",
      ],
    },
    {
      id: "kimura",
      name: "Kimura",
      type: "Submission",
      whiteBeltBasics: [
        "Grip mechanics basics",
        "Figure-four positioning",
        "Breaking posture first",
      ],
      bluePurpleDetails: [
        "Sweep integration",
        "Transitional kimura attacks",
      ],
      brownBlackDetails: [
        "Counter sequences",
        "Back take from kimura grip",
      ],
    },
  ],
  mount: [
    {
      id: "americana",
      name: "Americana",
      type: "Submission",
      whiteBeltBasics: [
        "Weight distribution on mount",
        "Isolating the arm",
        "Figure-four grip basics",
      ],
      bluePurpleDetails: [
        "Preventing bridge escapes",
        "Angle adjustments for finish",
      ],
      brownBlackDetails: [
        "Transition to armbar if defended",
        "Maintaining control under movement",
      ],
    },
    {
      id: "cross-choke-mount",
      name: "Cross Choke",
      type: "Submission",
      whiteBeltBasics: [
        "Collar grip sequence",
        "Elbow positioning",
        "Weight commitment basics",
      ],
      bluePurpleDetails: [
        "Grip depth optimization",
        "Head control integration",
      ],
      brownBlackDetails: [
        "Finishing against defensive frames",
        "S-mount transition for better angle",
      ],
    },
    {
      id: "armbar-mount",
      name: "Armbar from Mount",
      type: "Submission",
      whiteBeltBasics: [
        "Arm isolation fundamentals",
        "Hip positioning for transition",
        "Leg swing mechanics",
      ],
      bluePurpleDetails: [
        "Preventing opponent roll",
        "Maintaining balance during transition",
      ],
      brownBlackDetails: [
        "Switching between armbar sides",
        "Triangle backup if they pull out",
      ],
    },
    {
      id: "s-mount",
      name: "S-Mount Transition",
      type: "Position",
      whiteBeltBasics: [
        "Leg positioning basics",
        "Balance maintenance",
        "When to transition from mount",
      ],
      bluePurpleDetails: [
        "Armbar setup from S-mount",
        "Preventing shrimp escape",
      ],
      brownBlackDetails: [
        "Flow between mount variations",
        "Back exposure creation",
      ],
    },
  ],
  sidecontrol: [
    {
      id: "kimura-side",
      name: "Kimura",
      type: "Submission",
      whiteBeltBasics: [
        "Grip establishment from side",
        "Hip pressure maintenance",
        "Basic finishing mechanics",
      ],
      bluePurpleDetails: [
        "North-south transition",
        "Preventing opponent turn-in",
      ],
      brownBlackDetails: [
        "Back take from kimura grip",
        "Rolling kimura variations",
      ],
    },
    {
      id: "americana-side",
      name: "Americana",
      type: "Submission",
      whiteBeltBasics: [
        "Arm isolation from side control",
        "Weight distribution",
        "Basic finishing angle",
      ],
      bluePurpleDetails: [
        "Switching to armbar if defended",
        "Far side attack integration",
      ],
      brownBlackDetails: [
        "Mount transition for better control",
        "Pressure refinement details",
      ],
    },
    {
      id: "knee-on-belly",
      name: "Knee on Belly",
      type: "Position",
      whiteBeltBasics: [
        "Balance and base fundamentals",
        "Proper knee placement",
        "Grip control basics",
      ],
      bluePurpleDetails: [
        "Switching between mount/side",
        "Baseball bat choke setup",
      ],
      brownBlackDetails: [
        "Armbar from knee on belly",
        "Maintaining against explosive escapes",
      ],
    },
    {
      id: "arm-triangle",
      name: "Arm Triangle",
      type: "Submission",
      whiteBeltBasics: [
        "Head and arm trap basics",
        "Switching to opposite side",
        "Squeezing mechanics",
      ],
      bluePurpleDetails: [
        "Angle optimization for finish",
        "Preventing space creation",
      ],
      brownBlackDetails: [
        "North-south choke variations",
        "Darce choke transitions",
      ],
    },
  ],
  back: [
    {
      id: "rear-naked-choke",
      name: "Rear Naked Choke",
      type: "Submission",
      whiteBeltBasics: [
        "Hook placement fundamentals",
        "Arm positioning under chin",
        "Squeeze mechanics basics",
      ],
      bluePurpleDetails: [
        "Hand fighting to secure choke",
        "Preventing opponent turn",
      ],
      brownBlackDetails: [
        "Short choke variations",
        "Maintaining back mount under defense",
      ],
    },
    {
      id: "bow-arrow-choke",
      name: "Bow and Arrow Choke",
      type: "Submission",
      whiteBeltBasics: [
        "Collar grip basics",
        "Leg positioning for leverage",
        "Body angle fundamentals",
      ],
      bluePurpleDetails: [
        "Grip fighting integration",
        "Finishing angle refinement",
      ],
      brownBlackDetails: [
        "Setting up from back control",
        "Transition if opponent defends",
      ],
    },
    {
      id: "armbar-back",
      name: "Armbar from Back",
      type: "Submission",
      whiteBeltBasics: [
        "Arm isolation from back",
        "Hip positioning basics",
        "Maintaining one hook",
      ],
      bluePurpleDetails: [
        "Preventing opponent stack",
        "Triangle transition backup",
      ],
      brownBlackDetails: [
        "Flow between back attacks",
        "Maintaining dominant position throughout",
      ],
    },
  ],
};

// ----- COMPONENT -----
export default function LibraryScreen() {
  const [selectedBeltId, setSelectedBeltId] = useState<string | null>(null);
  const [selectedPositionId, setSelectedPositionId] = useState<string | null>(null);
  const [selectedTechniqueId, setSelectedTechniqueId] = useState<string | null>(null);
  const [techniquesYPosition, setTechniquesYPosition] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageWidth, setPageWidth] = useState<number>(0);
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const techniqueCardRefs = useRef<Map<string, View>>(new Map());
  const pageScrollRef = useRef<ScrollView>(null);

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

  const handlePositionSelect = (posId: string) => {
    const newPositionId = posId === selectedPositionId ? null : posId;
    setSelectedPositionId(newPositionId);
    
    // Scroll to techniques section after a short delay to let it render
    if (newPositionId && scrollViewRef.current && techniquesYPosition > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          y: techniquesYPosition - 20,
          animated: true,
        });
      }, 100);
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
                  handlePositionSelect(pos.id)
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

      {/* Techniques Section */}
      {selectedPositionId && techniquesData[selectedPositionId] && (
        <View 
          style={styles.techniquesSection}
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            setTechniquesYPosition(layout.y - 20); // Offset by 20 for padding
          }}
        >
          <View style={styles.sectionDivider} />
          <Text style={styles.selectedPositionLabel}>
            Selected Position: {positions.find(p => p.id === selectedPositionId)?.name}
          </Text>
          
          {techniquesData[selectedPositionId].map((technique) => {
            const isExpanded = selectedTechniqueId === technique.id;
            
            return (
              <View
                key={technique.id}
                onLayout={(event) => {
                  const layout = event.nativeEvent.layout;
                  const cardRef = techniqueCardRefs.current.get(technique.id);
                  if (cardRef) {
                    cardRef.measure((x, y, width, height, px, py) => {
                      // Store the position for later use (if needed)
                    });
                  }
                }}
              >
                {/* Collapsed View */}
                {!isExpanded && (
                  <Pressable
                    style={styles.techniqueCard}
                    onPress={() => {
                      setSelectedTechniqueId(technique.id);
                      setCurrentPage(0);
                      
                      // Scroll to center the expanded card on screen (fallback to fit if too tall)
                      setTimeout(() => {
                        const cardView = techniqueCardRefs.current.get(technique.id);
                        if (cardView && scrollViewRef.current) {
                          cardView.measureLayout(
                            scrollViewRef.current as any,
                            (x, y, width, height) => {
                              const windowHeight = Dimensions.get('window').height;
                              const topPad = 12;
                              const bottomPad = 12;
                              const available = windowHeight - topPad - bottomPad;

                              let targetY: number;
                              if (height >= available) {
                                // Too tall to center: align top within padding
                                targetY = Math.max(0, y - topPad);
                              } else {
                                // Center vertically within the available viewport
                                const extra = (available - height) / 2;
                                targetY = Math.max(0, y - topPad - extra);
                              }

                              scrollViewRef.current?.scrollTo({ y: Math.floor(targetY), animated: true });
                            },
                            () => {}
                          );
                        }
                      }, 150);
                    }}
                    ref={(ref) => {
                      if (ref) {
                        techniqueCardRefs.current.set(technique.id, ref as any);
                      }
                    }}
                  >
                  <View style={styles.techniqueCardContent}>
                    <Ionicons name="play" size={16} color="#84DCC6" style={styles.playIcon} />
                    <View style={styles.techniqueInfo}>
                      <Text style={styles.techniqueName}>{technique.name}</Text>
                      <Text style={styles.techniqueType}>({technique.type})</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#AEB0B5" />
                  </View>
                  </Pressable>
                )}

                {/* Expanded View */}
                {isExpanded && (
                  <View
                    style={styles.techniqueCardExpanded}
                    ref={(ref) => {
                      if (ref) {
                        techniqueCardRefs.current.set(technique.id, ref as any);
                      }
                    }}
                  >
                    {/* Fixed Header */}
                    <View style={styles.expandedHeader}>
                      <View style={styles.expandedTitleRow}>
                        <Pressable
                          onPress={() => {
                            setSelectedTechniqueId(null);
                            setCurrentPage(0);
                          }}
                          style={styles.closeButton}
                        >
                          <Ionicons name="chevron-down" size={20} color="#84DCC6" />
                        </Pressable>
                        <View style={styles.expandedTitleContainer}>
                          <Text style={styles.expandedTechniqueName}>{technique.name}</Text>
                          <Text style={styles.expandedTechniqueType}>({technique.type})</Text>
                        </View>
                      </View>
                      
                      {/* Pagination Dots */}
                      <View style={styles.paginationContainer}>
                        <View style={[styles.paginationDot, currentPage === 0 && styles.paginationDotActive]} />
                        <View style={[styles.paginationDot, currentPage === 1 && styles.paginationDotActive]} />
                      </View>
                    </View>

                    {/* Swipeable Pages Container */}
                    <ScrollView
                      ref={pageScrollRef}
                      horizontal
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                      onScroll={handleScroll}
                      scrollEventThrottle={16}
                      onLayout={(e) => setPageWidth(e.nativeEvent.layout.width)}
                      style={styles.pagesContainer}
                      contentContainerStyle={styles.pagesWrapper}
                    >
                        {/* Page 1: Video Placeholder */}
                        <View style={[styles.page, { width: pageWidth || undefined }]}>
                          <View style={styles.videoPlaceholder}>
                            <Ionicons name="play-circle" size={64} color="#84DCC6" />
                            <Text style={styles.videoPlaceholderText}>Video Coming Soon</Text>
                            <Text style={styles.videoPlaceholderSubtext}>
                              Technique demonstration will be available here
                            </Text>
                          </View>
                        </View>

                        {/* Page 2: Description */}
                        <View style={[styles.page, { width: pageWidth || undefined }]}>
                          <View style={styles.detailsDivider} />

                          {/* White Belt Basics */}
                          <View style={styles.detailsSection}>
                            <Text style={styles.detailsSectionTitle}>White Belt Basics</Text>
                            {technique.whiteBeltBasics.map((detail, idx) => (
                              <Text key={idx} style={styles.detailItem}>• {detail}</Text>
                            ))}
                          </View>

                          {/* Blue/Purple Details */}
                          {(selectedBeltId === 'blue' || selectedBeltId === 'purple' || 
                            selectedBeltId === 'brown' || selectedBeltId === 'black' || 
                            selectedBeltId === 'red' || !selectedBeltId) && (
                            <>
                              <View style={styles.detailsDivider} />
                              <View style={styles.detailsSection}>
                                <Text style={styles.detailsSectionTitle}>Blue/Purple Details</Text>
                                {technique.bluePurpleDetails.map((detail, idx) => (
                                  <Text key={idx} style={styles.detailItem}>• {detail}</Text>
                                ))}
                              </View>
                            </>
                          )}

                          {/* Brown/Black Details */}
                          {(selectedBeltId === 'brown' || selectedBeltId === 'black' || 
                            selectedBeltId === 'red' || !selectedBeltId) && (
                            <>
                              <View style={styles.detailsDivider} />
                              <View style={styles.detailsSection}>
                                <Text style={styles.detailsSectionTitle}>Brown/Black Details</Text>
                                {technique.brownBlackDetails.map((detail, idx) => (
                                  <Text key={idx} style={styles.detailItem}>• {detail}</Text>
                                ))}
                              </View>
                            </>
                          )}
                        </View>
                    </ScrollView>
                  </View>
                )}
              </View>
            );
          })}
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
});
