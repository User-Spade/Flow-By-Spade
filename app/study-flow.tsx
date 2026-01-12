import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StatusBar, Pressable, Animated } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useBelt } from '../contexts/BeltContext';
import type { BeltLevel } from '../constants/theme';
import { databaseService } from '../services/databaseService';
import databaseJson from '../data/bjj-database.json';
import type { FoundationCategory } from '../data/types/database.types';

const glowKeyframes = `
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(212, 165, 165, 0.7); }
    50% { box-shadow: 0 0 0 8px rgba(212, 165, 165, 0); }
  }
`;

const COLORS = {
  bg: '#222222',
  card: '#2C2C2C',
  text: '#FFFFFF',
  muted: 'rgba(255, 255, 255, 0.6)',
  accentPrimary: '#F18805',
  accentSecondary: '#0081A7',
  mint: '#84DCC6',
  paleRose: '#D4A5A5',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
};

type Quality = 'best' | 'ok' | 'risky' | 'bad';
type Belt = 'white' | 'blue' | 'purple' | 'brown' | 'black';
type ActionCategory = 'Advancement' | 'Regression' | 'Submission';

interface DbTechnique {
  id: string;
  label: string;
  fromPositionId: string;
  toPositionId: string;
  Nature: ActionCategory;
  note: string;
  minBelt: Belt;
  ReactiveResponses?: Array<{
    id: string;
    label: string;
    toPositionId: string;
    outcomeClass: string;
    perspective: string;
    note: string;
    minBelt: Belt;
  }>;
}

const beltRank: Record<Belt, number> = {
  white: 1,
  blue: 2,
  purple: 3,
  brown: 4,
  black: 5,
};

interface Position {
  id: string;
  name: string;
  description?: string;
}

interface Transition {
  id: string;
  fromPositionId: string;
  toPositionId: string;
  label: string;
  quality: Quality;
  note: string;
  minBelt: Belt;
  isTerminal?: boolean;
  opponentResponses?: Array<{
    label: string;
    toPositionId: string;
    quality: Quality;
    note: string;
  }>;
}

interface FlowStep {
  id: string;
  fromPositionId: string;
  toPositionId: string;
  transitionId: string;
  quality: Quality;
  note: string;
  label: string;
  actor: 'you' | 'opponent';
}

// Positions data
const POSITIONS: Position[] = [
  { id: 'closed_guard_bottom', name: 'Closed Guard (Bottom)' },
  { id: 'mount_top', name: 'Mount (Top)' },
  { id: 's_mount_top', name: 'S-Mount (Top)' },
  { id: 'armbar_finish', name: 'Armbar Finish' },
  { id: 'submission', name: 'Submission' },
  { id: 'escape', name: 'Escape' },
];

// Transitions data
const TRANSITIONS: Transition[] = [
  {
    id: 'hip_bump_sweep',
    fromPositionId: 'closed_guard_bottom',
    toPositionId: 'mount_top',
    label: 'Hip Bump Sweep',
    quality: 'best',
    note: 'High success rate from this position',
    minBelt: 'white',
    opponentResponses: [
      {
        label: 'Post arm to block',
        toPositionId: 'closed_guard_bottom',
        quality: 'ok',
        note: 'Opponent posts arm and re-guards',
      },
      {
        label: 'Shrimp escape',
        toPositionId: 'escape',
        quality: 'risky',
        note: 'Opponent escapes to feet',
      },
    ],
  },
  {
    id: 'closed_guard_armbar',
    fromPositionId: 'closed_guard_bottom',
    toPositionId: 'armbar_finish',
    label: 'Closed Guard Armbar',
    quality: 'ok',
    note: 'Solid but requires good setup',
    minBelt: 'white',
    opponentResponses: [
      {
        label: 'Stack pass',
        toPositionId: 'escape',
        quality: 'best',
        note: 'Opponent stacks and passes guard',
      },
      {
        label: 'Defend and re-guard',
        toPositionId: 'closed_guard_bottom',
        quality: 'ok',
        note: 'Opponent defends the armbar setup',
      },
    ],
  },
  {
    id: 'cross_collar_choke',
    fromPositionId: 'mount_top',
    toPositionId: 'submission',
    label: 'Cross Collar Choke',
    quality: 'best',
    note: 'Textbook finish, use it!',
    minBelt: 'white',
    isTerminal: true,
  },
  {
    id: 's_mount_transition',
    fromPositionId: 'mount_top',
    toPositionId: 's_mount_top',
    label: 'S-Mount Transition',
    quality: 'ok',
    note: 'Defensive but opens more options',
    minBelt: 'white',
  },
  {
    id: 'armbar_finish_move',
    fromPositionId: 's_mount_top',
    toPositionId: 'submission',
    label: 'Armbar Finish',
    quality: 'best',
    note: 'Strong finish from here',
    minBelt: 'white',
    isTerminal: true,
  },
  {
    id: 'far_side_armbar',
    fromPositionId: 's_mount_top',
    toPositionId: 'submission',
    label: 'Far-Side Armbar',
    quality: 'risky',
    note: 'Can be escaped by experienced opponents',
    minBelt: 'brown',
    isTerminal: true,
  },
  {
    id: 'defend_escape',
    fromPositionId: 'armbar_finish',
    toPositionId: 'escape',
    label: 'Defend Escape',
    quality: 'ok',
    note: 'End the flow by defending',
    minBelt: 'white',
    isTerminal: true,
  },
];

// Helper functions
function getPosition(id: string): Position | undefined {
  return POSITIONS.find((p) => p.id === id);
}

function getTransitionsFromPosition(positionId: string): Transition[] {
  // First try hardcoded transitions (for backwards compatibility)
  const hardcodedTransitions = TRANSITIONS.filter((t) => t.fromPositionId === positionId);
  if (hardcodedTransitions.length > 0) {
    return hardcodedTransitions;
  }
  
  // Fallback to database transitions
  const dbPositions = databaseService.getTransitionsFrom(positionId);
  return dbPositions.map((toPos): Transition => ({
    id: `${positionId}_to_${toPos.system.position_id}`,
    fromPositionId: positionId,
    toPositionId: toPos.system.position_id,
    label: toPos.learning.display_name,
    quality: 'ok', // Default quality for now
    note: '',
    minBelt: toPos.system.min_belt as Belt,
  }));
}

function mapOutcomeToQuality(outcomeClass: string): Quality {
  switch (outcomeClass) {
    case 'Win': return 'risky'; // Win for opponent = bad for user
    case 'Loss': return 'best'; // Loss for opponent = good for user
    case 'Neutral':
    default:
      return 'ok';
  }
}

function mapOutcomeToColor(outcomeClass: string): string {
  switch (outcomeClass) {
    case 'Win': return COLORS.error; // Red for opponent win
    case 'Loss': return COLORS.success; // Green for opponent loss
    case 'Neutral':
    default:
      return COLORS.warning; // Orange for neutral
  }
}

function getTechniquesFromDatabase(positionId: string, category: ActionCategory, beltLevel: Belt): DbTechnique[] {
  try {
    const db = databaseJson as any;
    if (!db || !db.techniques) {
      console.warn('Database or techniques not found');
      return [];
    }
    
    // Get the foundation for this position
    const foundation = databaseService.getFoundationForPosition(positionId);
    if (!foundation) return [];
    
    // Map foundation to technique key
    const foundationKeyMap: Record<string, string> = {
      'neutral': 'neutral',
      'guard_top': 'Guard (Top)',
      'guard_bottom': 'Guard (Bottom)',
      'side_control_top': 'Side Control (Top)',
      'side_control_bottom': 'Side Control (Bottom)',
      'full_mount_top': 'Mount (Top)',
      'full_mount_bottom': 'Mount (Bottom)',
      'rear_mount_top': 'Back (Top)',
      'rear_mount_bottom': 'Back (Bottom)',
      'turtle_top': 'Turtle (Top)',
      'turtle_bottom': 'Turtle (Bottom)',
      'knee_on_belly_top': 'Knee-On-Belly (Top)',
      'knee_on_belly_bottom': 'Knee-On-Belly (Bottom)',
    };
    
    const techniqueKey = foundationKeyMap[foundation] || foundation;
    const techniques = db.techniques[techniqueKey] || [];
    
    // Filter by category, belt level, and position
    const beltRankOrder = { white: 1, blue: 2, purple: 3, brown: 4, black: 5 };
    const currentBeltRank = beltRankOrder[beltLevel];
    
    return techniques.filter((tech: DbTechnique) => {
      const techBeltRank = beltRankOrder[tech.minBelt] || 1;
      return tech.Nature === category && 
             tech.fromPositionId === positionId &&
             techBeltRank <= currentBeltRank;
    });
  } catch (e) {
    console.error('Error getting techniques:', e);
    return [];
  }
}

function getQualityEmoji(quality: Quality): string {
  switch (quality) {
    case 'best': return '✅';
    case 'ok': return '⭕';
    case 'risky': return '⚠';
    case 'bad': return '❌';
  }
}

function getQualityMessage(quality: Quality): string {
  switch (quality) {
    case 'best': return 'Strong choice';
    case 'ok': return 'Solid but not optimal';
    case 'risky': return 'Risky at your level';
    case 'bad': return 'Bad choice, review this';
  }
}

function getQualityColor(quality: Quality): string {
  switch (quality) {
    case 'best': return COLORS.success;
    case 'ok': return COLORS.mint;
    case 'risky': return COLORS.warning;
    case 'bad': return COLORS.error;
  }
}

function StudyFlow() {
  const router = useRouter();
  const { belt: profileBelt } = useBelt();
  const scrollRef = useRef<ScrollView>(null);
  const foundationScrollRef = useRef<ScrollView>(null);
  const beltScrollRef = useRef<ScrollView>(null);
  const [flowSteps, setFlowSteps] = useState<FlowStep[]>([]);
  const [currentPositionId, setCurrentPositionId] = useState('closed_guard_bottom');
  const [pathExpanded, setPathExpanded] = useState(false);
  const [pressedNext, setPressedNext] = useState<string | null>(null);
  const [selectedBelt, setSelectedBelt] = useState<Belt | null>(null);
  const [selectedFoundation, setSelectedFoundation] = useState<FoundationCategory>('neutral');
  const [selectedStartPositionId, setSelectedStartPositionId] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [turn, setTurn] = useState<'you' | 'opponent'>('you');
  const [foundations, setFoundations] = useState<Array<{ id: FoundationCategory; display: string }>>([]);
  const [selectedCategory, setSelectedCategory] = useState<ActionCategory | null>(null);
  const pulseAnim = useRef(new Animated.Value(0)).current;

  // Sync selectedBelt with profile belt
  useEffect(() => {
    const profileBeltLower = (profileBelt?.toLowerCase() || 'white') as Belt;
    setSelectedBelt(profileBeltLower);
  }, [profileBelt]);

  // Auto-scroll to selected belt on load
  useEffect(() => {
    if (selectedBelt && beltScrollRef.current) {
      const belts: Belt[] = ['white', 'blue', 'purple', 'brown', 'black'];
      const beltIndex = belts.indexOf(selectedBelt);
      if (beltIndex !== -1) {
        setTimeout(() => {
          beltScrollRef.current?.scrollTo({ y: beltIndex * 80, animated: false });
        }, 100);
      }
    }
  }, [selectedBelt]);

  // Load foundations on mount
  useEffect(() => {
    const foundationsList = databaseService.getFoundations();
    setFoundations(foundationsList);
  }, []);

  // Handle belt carousel snap to center
  const handleBeltScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
  };

  const handleBeltScrollEnd = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    const itemHeight = 80;
    const centerIndex = Math.round(y / itemHeight);
    const snapY = centerIndex * itemHeight;
    
    if (Math.abs(y - snapY) > 5) {
      beltScrollRef.current?.scrollTo({ y: snapY, animated: true });
    }

    // Update selected belt based on center item
    const belts: Belt[] = ['white', 'blue', 'purple', 'brown', 'black'];
    if (centerIndex < belts.length) {
      setSelectedBelt(belts[centerIndex]);
    }
  };

  // Rewind one step: remove last flow step and restore prior state
  const handleRewind = () => {
    setFlowSteps((prev) => {
      if (!prev || prev.length === 0) {
        return prev;
      }
      const next = prev.slice(0, -1);
      const newCurrentPositionId =
        next.length > 0 ? next[next.length - 1].toPositionId : (selectedStartPositionId || 'closed_guard_bottom');
      setCurrentPositionId(newCurrentPositionId);
      const newTurn: 'you' | 'opponent' =
        next.length === 0 ? 'you' : (next[next.length - 1].actor === 'you' ? 'opponent' : 'you');
      setTurn(newTurn);
      setSelectedCategory(null);
      return next;
    });
  };

  // Handle 

  // Auto-scroll to neutral foundation on load
  useEffect(() => {
    if (foundations.length > 0 && foundationScrollRef.current) {
      const neutralIndex = foundations.findIndex(f => f.id === 'neutral');
      if (neutralIndex !== -1) {
        setTimeout(() => {
          foundationScrollRef.current?.scrollTo({ y: neutralIndex * 80, animated: false });
        }, 100);
      }
    }
  }, [foundations]);

  // Handle foundation carousel snap to center
  const handleFoundationScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
  };

  const handleFoundationScrollEnd = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    const itemHeight = 80; // Height of each foundation button + margin
    const centerIndex = Math.round(y / itemHeight);
    const snapY = centerIndex * itemHeight;
    
    if (Math.abs(y - snapY) > 5) {
      foundationScrollRef.current?.scrollTo({ y: snapY, animated: true });
    }

    // Update selected foundation based on center item
    if (centerIndex < foundations.length) {
      setSelectedFoundation(foundations[centerIndex].id);
    }
  };

  // For legacy transitions we keep local positions, but display uses DB
  const currentPosition = getPosition(currentPositionId);
  const currentDbPosition = databaseService.getPosition(currentPositionId);
  const allAvailableTransitions = getTransitionsFromPosition(currentPositionId);
  const availableTransitions =
    selectedBelt && hasStarted
      ? allAvailableTransitions.filter((t) => beltRank[t.minBelt] <= beltRank[selectedBelt])
      : allAvailableTransitions;
  const isFlowEnded = currentPosition?.id === 'submission' || currentPosition?.id === 'escape';

  // Build DB-backed start positions for selected belt + foundation
  const dbStartPositions = React.useMemo(() => {
    if (!selectedFoundation || !selectedBelt) return [] as { id: string; name: string }[];
    const byFoundation = databaseService.getPositionsByFoundationAndBelt(selectedFoundation, selectedBelt);
    const items = Object.entries(byFoundation)
      .filter(([id]) => databaseService.getOutgoingTechniques(id).length > 0)
      .map(([id, pos]) => ({ id, name: pos.learning.display_name }));
    items.sort((a, b) => a.name.localeCompare(b.name));
    return items;
  }, [selectedFoundation, selectedBelt]);

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
  }, [flowSteps.length]);

  const handleTransitionPress = (transition: Transition) => {
    setPressedNext(transition.id);
    const newStep: FlowStep = {
      id: `step-${Date.now()}`,
      fromPositionId: currentPositionId,
      toPositionId: transition.toPositionId,
      transitionId: transition.id,
      quality: transition.quality,
      note: transition.note,
      label: transition.label,
      actor: 'you',
    };
    setFlowSteps((prev) => [...prev, newStep]);
    setCurrentPositionId(transition.toPositionId);
    setTimeout(() => setPressedNext(null), 220);

    // Handle turn transition
    if (transition.isTerminal) {
      // Flow ends, stay on end state
    } else if (transition.opponentResponses && transition.opponentResponses.length > 0) {
      setTurn('opponent');
    } else {
      setTurn('you');
    }
  };

  const handleOpponentResponse = (response: { label: string; toPositionId: string; quality: Quality; note: string }) => {
    setPressedNext(response.label);
    const newStep: FlowStep = {
      id: `step-${Date.now()}`,
      fromPositionId: currentPositionId,
      toPositionId: response.toPositionId,
      transitionId: `opponent-response-${Date.now()}`,
      quality: response.quality,
      note: response.note,
      label: response.label,
      actor: 'opponent',
    };
    setFlowSteps((prev) => [...prev, newStep]);
    setCurrentPositionId(response.toPositionId);
    setTimeout(() => setPressedNext(null), 220);

    // Check if terminal
    if (response.toPositionId === 'submission' || response.toPositionId === 'escape') {
      // Flow ends
    } else {
      setTurn('you');
    }
  };

  const handleReset = () => {
    setPressedNext(null);
    setFlowSteps([]);
    setCurrentPositionId('closed_guard_bottom');
    setPathExpanded(false);
    setHasStarted(false);
    setTurn('you');
    setSelectedCategory(null);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleStartFlow = () => {
    if (selectedBelt && selectedStartPositionId) {
      setFlowSteps([]);
      setCurrentPositionId(selectedStartPositionId);
      setHasStarted(true);
      setPathExpanded(false);
      setTurn('you');
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  const handleTechniquePress = (technique: DbTechnique) => {
    setPressedNext(technique.id);
    const newStep: FlowStep = {
      id: `step-${Date.now()}`,
      fromPositionId: currentPositionId,
      toPositionId: technique.toPositionId,
      transitionId: technique.id,
      quality: 'ok', // Technique is an attempt, quality depends on opponent response
      note: technique.note,
      label: technique.label,
      actor: 'you',
    };
    setFlowSteps((prev) => [...prev, newStep]);
    setSelectedCategory(null);
    setTimeout(() => setPressedNext(null), 220);

    // Switch to opponent turn if technique has reactive responses
    if (technique.ReactiveResponses && technique.ReactiveResponses.length > 0) {
      setTurn('opponent');
    } else {
      // No responses, stay your turn
      setTurn('you');
    }
  };

  const handleOpponentResponseFromTechnique = (response: NonNullable<DbTechnique['ReactiveResponses']>[0]) => {
    if (!response) return;
    
    const quality = mapOutcomeToQuality(response.outcomeClass);
    setPressedNext(response.id);
    const newStep: FlowStep = {
      id: `step-${Date.now()}`,
      fromPositionId: currentPositionId,
      toPositionId: response.toPositionId,
      transitionId: response.id,
      quality: quality,
      note: response.note,
      label: response.label,
      actor: 'opponent',
    };
    setFlowSteps((prev) => [...prev, newStep]);
    setCurrentPositionId(response.toPositionId);
    setTimeout(() => setPressedNext(null), 220);

    // Always return to user turn after opponent responds
    setTurn('you');

    // Scroll to show the new position
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 250);
  };

  // Auto-expand path when flow ends
  useEffect(() => {
    if (isFlowEnded) {
      setPathExpanded(true);
    }
  }, [isFlowEnded]);

  // Ensure scroll is at top when in setup mode
  useEffect(() => {
    if (!hasStarted) {
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        scrollRef.current?.scrollTo({ y: 0, animated: false });
      }, 0);
    }
  }, [hasStarted]);

  // Scroll to top on initial mount if in setup
  useEffect(() => {
    if (!hasStarted) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({ y: 0, animated: false });
      }, 0);
    }
  }, []);

  // Pulse animation for opponent turn
  useEffect(() => {
    if (turn === 'opponent') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: false,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(0);
    }
  }, [turn]);

  // Calculate summary stats
  const qualityStats = {
    best: flowSteps.filter((s) => s.quality === 'best').length,
    ok: flowSteps.filter((s) => s.quality === 'ok').length,
    risky: flowSteps.filter((s) => s.quality === 'risky').length,
    bad: flowSteps.filter((s) => s.quality === 'bad').length,
  };

  // FLOW SETUP UI - shown before hasStarted is true
  if (!hasStarted) {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <BackButton onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color={COLORS.text} />
        </BackButton>

        <Header>
          <Title>Study Flow</Title>
        </Header>

        <ScrollArea
          ref={scrollRef}
          contentContainerStyle={{ paddingBottom: 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* FLOW SETUP */}
          <SetupSection>
            <SetupTitle>Choose your belt level</SetupTitle>
            <BeltCarouselContainer>
              <ScrollView
                ref={beltScrollRef}
                scrollEventThrottle={16}
                onScroll={handleBeltScroll}
                onMomentumScrollEnd={handleBeltScrollEnd}
                snapToInterval={80}
                decelerationRate="fast"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 60 }}
              >
                {(['white', 'blue', 'purple', 'brown', 'black'] as Belt[]).map((belt, index) => {
                  const isCenter = selectedBelt === belt;
                  return (
                    <BeltCarouselItem key={belt} isCenter={isCenter}>
                      <BeltButton
                        isCenter={isCenter}
                        onPress={() => {
                          const targetY = index * 80;
                          beltScrollRef.current?.scrollTo({ y: targetY, animated: true });
                          setSelectedBelt(belt);
                        }}
                      >
                        <BeltButtonText isCenter={isCenter}>
                          {belt.charAt(0).toUpperCase() + belt.slice(1)}
                        </BeltButtonText>
                      </BeltButton>
                    </BeltCarouselItem>
                  );
                })}
              </ScrollView>
              <LinearGradient
                colors={['#222222', 'rgba(34, 34, 34, 0)']}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: 60,
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  pointerEvents: 'none'
                }}
              />
              <LinearGradient
                colors={['rgba(34, 34, 34, 0)', '#222222']}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: 60,
                  bottom: 0,
                  left: 0,
                  zIndex: 1,
                  pointerEvents: 'none'
                }}
              />
            </BeltCarouselContainer>

            <SetupTitle style={{ marginTop: 24 }}>Choose foundation</SetupTitle>
            <FoundationCarouselContainer>
              <ScrollView
                ref={foundationScrollRef}
                scrollEventThrottle={16}
                onScroll={handleFoundationScroll}
                onMomentumScrollEnd={handleFoundationScrollEnd}
                snapToInterval={80}
                decelerationRate="fast"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 60 }}
              >
                {foundations.map((foundation, index) => {
                  const isCenter = selectedFoundation === foundation.id;
                  return (
                    <FoundationCarouselItem key={foundation.id} isCenter={isCenter}>
                      <FoundationButton
                        isCenter={isCenter}
                        onPress={() => {
                          const targetY = index * 80;
                          foundationScrollRef.current?.scrollTo({ y: targetY, animated: true });
                          setSelectedFoundation(foundation.id);
                        }}
                      >
                        <FoundationButtonText isCenter={isCenter}>
                          {foundation.display}
                        </FoundationButtonText>
                      </FoundationButton>
                    </FoundationCarouselItem>
                  );
                })}
              </ScrollView>
              <LinearGradient
                colors={['#222222', 'rgba(34, 34, 34, 0)']}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: 60,
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  pointerEvents: 'none'
                }}
              />
              <LinearGradient
                colors={['rgba(34, 34, 34, 0)', '#222222']}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: 60,
                  bottom: 0,
                  left: 0,
                  zIndex: 1,
                  pointerEvents: 'none'
                }}
              />
            </FoundationCarouselContainer>

            <SetupTitle style={{ marginTop: 24 }}>Choose starting position</SetupTitle>
            <StartPositionList>
              {dbStartPositions.length === 0 ? (
                <StartPositionText isSelected={false}>
                  No positions for this belt + foundation
                </StartPositionText>
              ) : (
                dbStartPositions.map((position) => (
                  <StartPositionButton
                    key={position.id}
                    isSelected={selectedStartPositionId === position.id}
                    onPress={() => setSelectedStartPositionId(position.id)}
                  >
                    <StartPositionText isSelected={selectedStartPositionId === position.id}>
                      {position.name}
                    </StartPositionText>
                  </StartPositionButton>
                ))
              )}
            </StartPositionList>

            <StartFlowButtonWrapper>
              <StartFlowButton
                onPress={handleStartFlow}
                disabled={!selectedBelt || !selectedStartPositionId}
              >
                <StartFlowButtonText disabled={!selectedBelt || !selectedStartPositionId}>
                  Start Flow
                </StartFlowButtonText>
              </StartFlowButton>
            </StartFlowButtonWrapper>
          </SetupSection>
        </ScrollArea>
      </Container>
    );
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <BackButton onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color={COLORS.text} />
      </BackButton>

      <Header>
        <Title>Study Flow</Title>
      </Header>

      <ScrollArea
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* PATH SO FAR - Collapsible Section */}
        {flowSteps.length > 0 && (
          <PathSection>
            <PathHeader onPress={() => setPathExpanded(!pathExpanded)}>
              <PathTitle>
                {pathExpanded ? 'Path so far' : `Path so far: ${flowSteps.length} steps – tap to expand`}
              </PathTitle>
              <CollapseIcon>
                <Ionicons
                  name={pathExpanded ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={COLORS.muted}
                />
              </CollapseIcon>
            </PathHeader>

            {pathExpanded && (
              <PathContent>
                <PathStartPosition>
                  <PathStepNumber>Start:</PathStepNumber> {getPosition('closed_guard_bottom')?.name}
                </PathStartPosition>
                {flowSteps.map((step, index) => {
                  const fromPos = getPosition(step.fromPositionId);
                  const toPos = getPosition(step.toPositionId);

                  return (
                    <PathStepContainer key={step.id} isOpponentStep={step.actor === 'opponent'}>
                      <PathStepHeader>
                        <PathStepNumber>{step.actor === 'opponent' ? 'Opponent — ' : ''}Step {index + 1}:</PathStepNumber>
                      </PathStepHeader>
                      <PathDetailLine>
                        <PathDetailLabel>From:</PathDetailLabel>
                        <PathPositionName>{fromPos?.name}</PathPositionName>
                      </PathDetailLine>
                      <PathDetailLine>
                        <PathDetailLabel>{step.actor === 'opponent' ? 'They did:' : 'You chose:'}</PathDetailLabel>
                        <PathMoveName>{step.label}</PathMoveName>
                      </PathDetailLine>
                      <PathDetailLine>
                        <PathDetailLabel>Now in:</PathDetailLabel>
                        <PathPositionName>{toPos?.name}</PathPositionName>
                      </PathDetailLine>
                      <PathEvaluationLine quality={step.quality}>
                        <PathEvaluationText>
                          {getQualityEmoji(step.quality)} {getQualityMessage(step.quality)}
                        </PathEvaluationText>
                      </PathEvaluationLine>
                      {index < flowSteps.length - 1 && <PathArrowDown>↓</PathArrowDown>}
                    </PathStepContainer>
                  );
                })}
              </PathContent>
            )}
          </PathSection>
        )}

        {/* YOU ARE HERE - Current Position Card */}
        <YouAreHereSection isOpponentTurn={turn === 'opponent'}>
          <YouAreHereLabel isOpponentTurn={turn === 'opponent'}>
            {turn === 'you' ? "Your turn — choose your move" : "Opponent's turn — their response"}
          </YouAreHereLabel>
          <CurrentCard isOpponentTurn={turn === 'opponent'}>
            <CurrentPositionText isOpponentTurn={turn === 'opponent'}>{currentDbPosition?.learning.display_name || currentPosition?.name}</CurrentPositionText>
            {flowSteps.length > 0 && flowSteps[flowSteps.length - 1].quality && (
              <QualityBadge quality={flowSteps[flowSteps.length - 1].quality}>
                <QualityEmoji>{getQualityEmoji(flowSteps[flowSteps.length - 1].quality)}</QualityEmoji>
                <QualityText>{getQualityMessage(flowSteps[flowSteps.length - 1].quality)}</QualityText>
              </QualityBadge>
            )}
            {flowSteps.length > 0 && flowSteps[flowSteps.length - 1].note && (
              <NoteText>{flowSteps[flowSteps.length - 1].note}</NoteText>
            )}
          </CurrentCard>
        </YouAreHereSection>

        {/* CATEGORY SELECTION OR TECHNIQUES */}
        {!isFlowEnded && turn === 'you' && availableTransitions.length > 0 && (
          <YourNextMovesSection>
            {!selectedCategory ? (
              <>
                <NextMovesLabel>Choose your action</NextMovesLabel>
                <CategoryButtonsContainer>
                  <CategoryButtonRow>
                    <CategoryButton
                      onPress={() => setSelectedCategory('Advancement')}
                      isSelected={false}
                    >
                      <CategoryButtonText isSelected={false}>
                        Advance
                      </CategoryButtonText>
                    </CategoryButton>
                    <CategoryButton
                      onPress={() => setSelectedCategory('Regression')}
                      isSelected={false}
                    >
                      <CategoryButtonText isSelected={false}>
                        Regress
                      </CategoryButtonText>
                    </CategoryButton>
                  </CategoryButtonRow>
                  <CategoryButtonRow>
                    <CategoryButton
                      onPress={() => setSelectedCategory('Submission')}
                      isSelected={false}
                    >
                      <CategoryButtonText isSelected={false}>
                        Submit
                      </CategoryButtonText>
                    </CategoryButton>
                    <CategoryButton
                      onPress={handleRewind}
                      isSelected={false}
                      disabled={flowSteps.length === 0}
                    >
                      <CategoryButtonText isSelected={false}>
                        Rewind
                      </CategoryButtonText>
                    </CategoryButton>
                  </CategoryButtonRow>
                </CategoryButtonsContainer>
              </>
            ) : (
              <>
                <CategoryBackButton onPress={() => setSelectedCategory(null)}>
                  <Ionicons name="arrow-back" size={20} color={COLORS.text} />
                  <BackButtonText>Back to categories</BackButtonText>
                </CategoryBackButton>
                <NextMovesLabel>
                  {selectedCategory === 'Advancement' ? 'Advancing moves' : 
                   selectedCategory === 'Regression' ? 'Defensive moves' : 
                   'Submission attempts'}
                </NextMovesLabel>
                {(() => {
                  const techniques = getTechniquesFromDatabase(currentPositionId, selectedCategory, selectedBelt || 'white');
                  if (techniques.length === 0) {
                    return (
                      <NoTechniquesMessage>
                        No {selectedCategory.toLowerCase()} techniques available at this belt level from this position.
                      </NoTechniquesMessage>
                    );
                  }
                  return techniques.map((technique) => (
                    <OptionCard
                      key={technique.id}
                      onPress={() => handleTechniquePress(technique)}
                      isPressed={pressedNext === technique.id}
                    >
                      <OptionLabelText>{technique.label}</OptionLabelText>
                      {technique.note && <OptionNote>{technique.note}</OptionNote>}
                    </OptionCard>
                  ));
                })()}
              </>
            )}
          </YourNextMovesSection>
        )}


        {/* OPPONENT RESPONSES */}
        {!isFlowEnded && turn === 'opponent' && flowSteps.length > 0 && (
          <YourNextMovesSection>
            <NextMovesLabel>Opponent responds — choose their reaction</NextMovesLabel>
            <CategoryButton
              onPress={handleRewind}
              isSelected={false}
              isCentered
              style={{ marginBottom: 16 }}
            >
              <CategoryButtonText isSelected={false}>Rewind</CategoryButtonText>
            </CategoryButton>
            {(() => {
              const lastUserMove = flowSteps
                .slice()
                .reverse()
                .find((s) => s.actor === 'you');
              if (!lastUserMove) return null;

              // First check if it's a database technique with ReactiveResponses
              const dbResponses = (() => {
                try {
                  const db = databaseJson as any;
                  if (!db.techniques) return null;
                  
                  // Use the position WHERE the technique was executed from, not current position
                  const foundation = databaseService.getFoundationForPosition(lastUserMove.fromPositionId);
                  if (!foundation) return null;
                  
                  const foundationKeyMap: Record<string, string> = {
                    'neutral': 'neutral',
                    'guard_top': 'Guard (Top)',
                    'guard_bottom': 'Guard (Bottom)',
                    'side_control_top': 'Side Control (Top)',
                    'side_control_bottom': 'Side Control (Bottom)',
                    'full_mount_top': 'Mount (Top)',
                    'full_mount_bottom': 'Mount (Bottom)',
                    'rear_mount_top': 'Back (Top)',
                    'rear_mount_bottom': 'Back (Bottom)',
                    'turtle_top': 'Turtle (Top)',
                    'turtle_bottom': 'Turtle (Bottom)',
                    'knee_on_belly_top': 'Knee-On-Belly (Top)',
                    'knee_on_belly_bottom': 'Knee-On-Belly (Bottom)',
                  };
                  
                  const techniqueKey = foundationKeyMap[foundation] || foundation;
                  const techniques = db.techniques[techniqueKey] || [];
                  
                  const technique = techniques.find((t: DbTechnique) => t.id === lastUserMove.transitionId);
                  return technique?.ReactiveResponses || null;
                } catch (e) {
                  return null;
                }
              })();

              if (dbResponses) {
                return dbResponses.map((response: NonNullable<DbTechnique['ReactiveResponses']>[0]) => {
                  const outcomeColor = mapOutcomeToColor(response.outcomeClass);
                  const responsePosition = databaseService.getPosition(response.toPositionId);
                  const positionName = responsePosition?.learning.display_name || 'Unknown Position';
                  return (
                    <OptionCard
                      key={response.id}
                      onPress={() => handleOpponentResponseFromTechnique(response)}
                      isPressed={pressedNext === response.id}
                    >
                      <OptionLabelText>{response.label}</OptionLabelText>
                      <OutcomeLabel outcomeClass={response.outcomeClass}>
                        {response.outcomeClass === 'Win' ? '⚠ Opponent wins this exchange' :
                         response.outcomeClass === 'Loss' ? '✅ You win this exchange' :
                         '⭕ Stalemate – neutral position'}
                      </OutcomeLabel>
                      <PositionLabel>→ {positionName}</PositionLabel>
                      {response.note && <OptionNote>{response.note}</OptionNote>}
                    </OptionCard>
                  );
                });
              }

              // Fallback to hardcoded transitions for legacy support
              const transition = TRANSITIONS.find((t) => t.id === lastUserMove.transitionId);
              if (!transition || !transition.opponentResponses) return null;
              return transition.opponentResponses.map((response, idx) => {
                const responsePos = getPosition(response.toPositionId);
                const posName = responsePos?.name || 'Unknown Position';
                return (
                  <OptionCard
                    key={`opponent-${idx}`}
                    onPress={() => handleOpponentResponse(response)}
                    isPressed={pressedNext === response.label}
                    isOpponentOption={true}
                  >
                    <OptionLabelText isOpponentOption={true}>Opponent: {response.label}</OptionLabelText>
                    <PositionLabel>→ {posName}</PositionLabel>
                  </OptionCard>
                );
              });
            })()}
          </YourNextMovesSection>
        )}

        {/* END OF FLOW SUMMARY */}
        {isFlowEnded && (
          <EndFlowSummary>
            <SummaryTitle>Flow complete!</SummaryTitle>
            <SummaryStatRow>
              <SummaryLabel>Total steps:</SummaryLabel>
              <SummaryValue>{flowSteps.length}</SummaryValue>
            </SummaryStatRow>
            <SummaryStatRow>
              <SummaryLabel>✅ Strong choices:</SummaryLabel>
              <SummaryValue>{qualityStats.best}</SummaryValue>
            </SummaryStatRow>
            <SummaryStatRow>
              <SummaryLabel>⭕ Solid moves:</SummaryLabel>
              <SummaryValue>{qualityStats.ok}</SummaryValue>
            </SummaryStatRow>
            <SummaryStatRow>
              <SummaryLabel>⚠ Risky moves:</SummaryLabel>
              <SummaryValue>{qualityStats.risky}</SummaryValue>
            </SummaryStatRow>
            <SummaryStatRow>
              <SummaryLabel>❌ Bad moves:</SummaryLabel>
              <SummaryValue>{qualityStats.bad}</SummaryValue>
            </SummaryStatRow>
          </EndFlowSummary>
        )}
      </ScrollArea>

      <ResetArea>
        <ResetButton onPress={handleReset}>
          <Ionicons name="refresh" size={20} color={COLORS.text} />
          <ResetButtonText>Reset Flow</ResetButtonText>
        </ResetButton>
      </ResetArea>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background: ${COLORS.bg};
  padding: 20px;
`;

const BackButton = styled.Pressable`
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const Header = styled.View`
  margin-top: 12px;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 28px;
  color: ${COLORS.text};
  font-weight: 700;
`;

const ScrollArea = styled.ScrollView`
  flex: 1;
`;

/* PATH SO FAR SECTION */
const PathSection = styled.View`
  background: ${COLORS.card};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
`;

const PathHeader = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const PathTitle = styled.Text`
  font-size: 16px;
  color: ${COLORS.text};
  font-weight: 600;
`;

const CollapseIcon = styled.View`
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

const PathContent = styled.View`
  margin-top: 12px;
`;

const PathStartPosition = styled.Text`
  font-size: 14px;
  color: ${COLORS.text};
  font-weight: 600;
  margin-bottom: 16px;
  padding: 12px;
  background: ${COLORS.card};
  border-radius: 8px;
`;

const PathStepContainer = styled.View<{ isOpponentStep?: boolean }>`
  margin-bottom: 20px;
  padding: 16px;
  background: ${(props: any) => props.isOpponentStep ? 'rgba(212, 165, 165, 0.08)' : COLORS.card};
  border-radius: 12px;
  border: 1px solid ${(props: any) => props.isOpponentStep ? 'rgba(212, 165, 165, 0.2)' : 'rgba(255, 255, 255, 0.08)'};
`;

const PathStepHeader = styled.View`
  margin-bottom: 12px;
`;

const PathStepNumber = styled.Text`
  font-weight: 700;
  color: ${COLORS.accentPrimary};
  font-size: 14px;
`;

const PathDetailLine = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const PathDetailLabel = styled.Text`
  font-size: 13px;
  color: ${COLORS.muted};
  font-weight: 600;
  margin-right: 8px;
  min-width: 80px;
`;

const PathPositionName = styled.Text`
  font-size: 13px;
  color: ${COLORS.text};
  font-weight: 600;
  flex: 1;
`;

const PathMoveName = styled.Text`
  font-size: 13px;
  color: ${COLORS.accentSecondary};
  font-weight: 600;
  flex: 1;
`;

const PathEvaluationLine = styled.View<{ quality: Quality }>`
  margin-top: 12px;
  padding: 10px;
  background: ${(props: any) => getQualityColor(props.quality)}15;
  border: 1px solid ${(props: any) => getQualityColor(props.quality)}44;
  border-radius: 8px;
`;

const PathEvaluationText = styled.Text`
  font-size: 12px;
  color: ${COLORS.text};
  font-weight: 600;
`;

const PathArrowDown = styled.Text`
  font-size: 16px;
  color: ${COLORS.muted};
  text-align: center;
  margin-top: 8px;
  opacity: 0.5;
`;

const PathFinalPosition = styled.Text`
  font-size: 14px;
  color: ${COLORS.text};
  font-weight: 600;
  margin-top: 8px;
  padding: 12px;
  background: ${COLORS.card};
  border-radius: 8px;
`;

const PathLabel = styled.Text`
  font-size: 13px;
  color: ${COLORS.muted};
  flex: 1;
`;

const PathMove = styled.Text`
  font-size: 13px;
  color: ${COLORS.accentPrimary};
  font-weight: 600;
`;

const PathArrow = styled.Text`
  font-size: 13px;
  color: ${COLORS.muted};
`;

const PathEval = styled.Text`
  font-size: 14px;
`;

const PathStep = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

/* YOU ARE HERE SECTION */
const YouAreHereSection = styled.View<{ isOpponentTurn?: boolean }>`
  margin-bottom: 24px;
  padding: ${(props: any) => (props.isOpponentTurn ? '16px' : '0px')};
  border-radius: ${(props: any) => (props.isOpponentTurn ? '12px' : '0px')};
  background: ${(props: any) => (props.isOpponentTurn ? 'rgba(212, 165, 165, 0.06)' : 'transparent')};
  border: ${(props: any) => (props.isOpponentTurn ? `1px solid rgba(212, 165, 165, 0.2)` : 'none')};
`;

const YouAreHereLabel = styled.Text<{ isOpponentTurn?: boolean }>`
  font-size: 12px;
  color: ${(props: any) => (props.isOpponentTurn ? COLORS.paleRose : COLORS.muted)};
  margin-bottom: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const CurrentCard = styled.View<{ isOpponentTurn?: boolean }>`
  background: ${(props: any) => (props.isOpponentTurn ? 'rgba(212, 165, 165, 0.08)' : COLORS.card)};
  border: 2px solid ${(props: any) => (props.isOpponentTurn ? COLORS.paleRose : COLORS.accentPrimary + '44')};
  border-radius: 16px;
  padding: 28px;
  margin-bottom: 32px;
  ${(props: any) => (props.isOpponentTurn ? `animation: glow 2.5s infinite;` : '')};
`;

const CurrentPositionText = styled.Text<{ isOpponentTurn?: boolean }>`
  font-size: 28px;
  color: ${(props: any) => (props.isOpponentTurn ? COLORS.paleRose : COLORS.text)};
  font-weight: 700;
  margin-bottom: 16px;
`;

const QualityBadge = styled.View<{ quality: Quality }>`
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  background: ${(props: any) => getQualityColor(props.quality)}22;
  border: 1px solid ${(props: any) => getQualityColor(props.quality)}44;
  align-self: flex-start;
`;

const QualityEmoji = styled.Text`
  font-size: 16px;
`;

const QualityText = styled.Text`
  font-size: 13px;
  color: ${COLORS.text};
  font-weight: 600;
  margin-left: 8px;
`;

const NoteText = styled.Text`
  font-size: 14px;
  color: ${COLORS.muted};
  line-height: 20px;
`;

/* YOUR NEXT MOVES SECTION */
const YourNextMovesSection = styled.View`
  margin-bottom: 24px;
  margin-top: 8px;
`;

const NextMovesLabel = styled.Text`
  font-size: 12px;
  color: ${COLORS.muted};
  margin-bottom: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const OptionCard = styled(Pressable)<{ isPressed: boolean; isOpponentOption?: boolean }>`
  background: ${(props: any) => (props.isOpponentOption ? 'rgba(212, 165, 165, 0.1)' : COLORS.card)};
  border: 2px solid ${(props: any) => (props.isOpponentOption ? COLORS.paleRose : 'rgba(255, 255, 255, 0.1)')};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  opacity: ${(props: any) => (props.isPressed ? 0.6 : 1)};
  ${(props: any) => (props.isOpponentOption ? `animation: glow 2s infinite;` : '')};
`;

const OptionLabelText = styled.Text<{ isOpponentOption?: boolean }>`
  font-size: 16px;
  color: ${(props: any) => (props.isOpponentOption ? COLORS.paleRose : COLORS.text)};
  font-weight: ${(props: any) => (props.isOpponentOption ? '700' : '600')};
`;

const OptionMetaRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const QualityIndicator = styled.Text<{ quality: Quality }>`
  font-size: 14px;
  margin-right: 8px;
`;

const OptionNote = styled.Text`
  font-size: 13px;
  color: ${COLORS.muted};
  flex: 1;
  margin-top: 8px;
`;

const PositionLabel = styled.Text`
  font-size: 12px;
  color: ${COLORS.mint};
  font-weight: 600;
  margin-top: 6px;
`;

const CategoryBackButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
  padding: 8px;
`;

const BackButtonText = styled.Text`
  font-size: 14px;
  color: ${COLORS.text};
  margin-left: 8px;
  font-weight: 600;
`;

const NoTechniquesMessage = styled.Text`
  font-size: 14px;
  color: ${COLORS.muted};
  text-align: center;
  padding: 20px;
  font-style: italic;
`;

const OutcomeLabel = styled.Text<{ outcomeClass: string }>`
  font-size: 12px;
  color: ${(props: any) => {
    if (props.outcomeClass === 'Win') return COLORS.error;
    if (props.outcomeClass === 'Loss') return COLORS.success;
    return COLORS.warning;
  }};
  margin-top: 8px;
  font-weight: 600;
`;

/* END OF FLOW SUMMARY */
const EndFlowSummary = styled.View`
  background: ${COLORS.card};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
`;

const SummaryTitle = styled.Text`
  font-size: 18px;
  color: ${COLORS.mint};
  font-weight: 700;
  margin-bottom: 16px;
`;

const SummaryStatRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 0;
`;

const SummaryLabel = styled.Text`
  font-size: 14px;
  color: ${COLORS.muted};
`;

const SummaryValue = styled.Text`
  font-size: 14px;
  color: ${COLORS.text};
  font-weight: 700;
`;

/* RESET BUTTON */
const ResetArea = styled.View`
  padding: 12px 0 8px 0;
`;

const ResetButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${COLORS.card};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px;
`;

const ResetButtonText = styled.Text`
  font-size: 16px;
  color: ${COLORS.text};
  font-weight: 600;
  margin-left: 8px;
`;

/* CATEGORY BUTTONS */
const CategoryButtonsContainer = styled.View`
  gap: 12px;
`;

const CategoryButtonRow = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const CategoryButton = styled(Pressable)<{ isSelected: boolean; isCentered?: boolean }>`
  flex: ${(props: any) => (props.isCentered ? '0' : '1')};
  padding: 20px;
  background: ${(props: any) => (props.isSelected ? COLORS.accentPrimary : COLORS.card)};
  border: 2px solid ${(props: any) => (props.isSelected ? COLORS.accentPrimary : 'rgba(255, 255, 255, 0.1)')};
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  ${(props: any) => (props.isCentered ? 'align-self: center; min-width: 200px;' : '')}
`;

const CategoryButtonText = styled.Text<{ isSelected: boolean }>`
  font-size: 18px;
  font-weight: 700;
  color: ${(props: any) => (props.isSelected ? COLORS.bg : COLORS.text)};
`;

/* FLOW SETUP SECTION */
const SetupSection = styled.View`
  padding: 20px;
`;

const SetupTitle = styled.Text`
  font-size: 18px;
  color: ${COLORS.text};
  font-weight: 700;
  margin-bottom: 16px;
`;

const BeltCarouselContainer = styled.View`
  height: 200px;
  margin-bottom: 32px;
  background: ${COLORS.card};
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
`;

const BeltCarouselItem = styled.View`
  height: 80px;
  padding: 0 16px;
  align-items: center;
  justify-content: center;
  opacity: ${(props: any) => (props.isCenter ? 1 : 0.4)};
`;

const BeltButton = styled(Pressable)`
  width: 100%;
  padding: 12px 16px;
  background: ${(props: any) => (props.isCenter ? COLORS.accentPrimary : 'rgba(255, 255, 255, 0.05)')};
  border: 2px solid ${(props: any) => (props.isCenter ? COLORS.accentPrimary : 'rgba(255, 255, 255, 0.1)')};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const BeltButtonText = styled.Text`
  font-size: ${(props: any) => (props.isCenter ? '14px' : '12px')};
  font-weight: ${(props: any) => (props.isCenter ? '700' : '600')};
  color: ${(props: any) => (props.isCenter ? COLORS.bg : COLORS.text)};
  text-align: center;
`;

const FoundationCarouselContainer = styled.View`
  height: 200px;
  margin-bottom: 32px;
  background: ${COLORS.card};
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
`;

const FoundationCarouselItem = styled.View`
  height: 80px;
  padding: 0 16px;
  align-items: center;
  justify-content: center;
  opacity: ${(props: any) => (props.isCenter ? 1 : 0.4)};
`;

const FoundationButton = styled(Pressable)`
  width: 100%;
  padding: 12px 16px;
  background: ${(props: any) => (props.isCenter ? COLORS.accentPrimary : 'rgba(255, 255, 255, 0.05)')};
  border: 2px solid ${(props: any) => (props.isCenter ? COLORS.accentPrimary : 'rgba(255, 255, 255, 0.1)')};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const FoundationButtonText = styled.Text`
  font-size: ${(props: any) => (props.isCenter ? '14px' : '12px')};
  font-weight: ${(props: any) => (props.isCenter ? '700' : '600')};
  color: ${(props: any) => (props.isCenter ? COLORS.bg : COLORS.text)};
  text-align: center;
`;

const StartPositionList = styled.View`
  margin-bottom: 32px;
`;

const StartPositionButton = styled(Pressable)`
  padding: 16px;
  margin-bottom: 12px;
  background: ${COLORS.card};
  border: 2px solid ${(props: any) => (props.isSelected ? COLORS.accentSecondary : 'rgba(255, 255, 255, 0.1)')};
  border-radius: 12px;
`;

const StartPositionText = styled.Text`
  font-size: 16px;
  font-weight: ${(props: any) => (props.isSelected ? '700' : '600')};
  color: ${(props: any) => (props.isSelected ? COLORS.accentSecondary : COLORS.text)};
`;

const StartFlowButtonWrapper = styled.View`
  margin-top: 12px;
`;

const StartFlowButton = styled(Pressable)`
  padding: 18px;
  background: ${(props: any) => (props.disabled ? 'rgba(241, 136, 5, 0.3)' : COLORS.accentPrimary)};
  border-radius: 12px;
  align-items: center;
`;

const StartFlowButtonText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${(props: any) => (props.disabled ? 'rgba(255, 255, 255, 0.4)' : COLORS.bg)};
`;

export default StudyFlow;
