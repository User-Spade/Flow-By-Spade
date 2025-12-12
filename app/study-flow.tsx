import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StatusBar, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const COLORS = {
  bg: '#222222',
  card: '#2C2C2C',
  text: '#FFFFFF',
  muted: 'rgba(255, 255, 255, 0.6)',
  accentPrimary: '#F18805',
  accentSecondary: '#0081A7',
  mint: '#84DCC6',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
};

type Quality = 'best' | 'ok' | 'risky' | 'bad';

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
  isTerminal?: boolean;
}

interface FlowStep {
  id: string;
  fromPositionId: string;
  toPositionId: string;
  transitionId: string;
  quality: Quality;
  note: string;
  label: string;
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
  },
  {
    id: 'closed_guard_armbar',
    fromPositionId: 'closed_guard_bottom',
    toPositionId: 'armbar_finish',
    label: 'Closed Guard Armbar',
    quality: 'ok',
    note: 'Solid but requires good setup',
  },
  {
    id: 'cross_collar_choke',
    fromPositionId: 'mount_top',
    toPositionId: 'submission',
    label: 'Cross Collar Choke',
    quality: 'best',
    note: 'Textbook finish, use it!',
    isTerminal: true,
  },
  {
    id: 's_mount_transition',
    fromPositionId: 'mount_top',
    toPositionId: 's_mount_top',
    label: 'S-Mount Transition',
    quality: 'ok',
    note: 'Defensive but opens more options',
  },
  {
    id: 'armbar_finish_move',
    fromPositionId: 's_mount_top',
    toPositionId: 'submission',
    label: 'Armbar Finish',
    quality: 'best',
    note: 'Strong finish from here',
    isTerminal: true,
  },
  {
    id: 'far_side_armbar',
    fromPositionId: 's_mount_top',
    toPositionId: 'submission',
    label: 'Far-Side Armbar',
    quality: 'risky',
    note: 'Can be escaped by experienced opponents',
    isTerminal: true,
  },
  {
    id: 'defend_escape',
    fromPositionId: 'armbar_finish',
    toPositionId: 'escape',
    label: 'Defend Escape',
    quality: 'ok',
    note: 'End the flow by defending',
    isTerminal: true,
  },
];

// Helper functions
function getPosition(id: string): Position | undefined {
  return POSITIONS.find((p) => p.id === id);
}

function getTransitionsFromPosition(positionId: string): Transition[] {
  return TRANSITIONS.filter((t) => t.fromPositionId === positionId);
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

export default function StudyFlowScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [flowSteps, setFlowSteps] = useState<FlowStep[]>([]);
  const [currentPositionId, setCurrentPositionId] = useState('closed_guard_bottom');
  const [pathExpanded, setPathExpanded] = useState(false);
  const [pressedNext, setPressedNext] = useState<string | null>(null);

  const currentPosition = getPosition(currentPositionId);
  const availableTransitions = getTransitionsFromPosition(currentPositionId);
  const isFlowEnded = currentPosition?.id === 'submission' || currentPosition?.id === 'escape';

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
    };
    setFlowSteps((prev) => [...prev, newStep]);
    setCurrentPositionId(transition.toPositionId);
    setTimeout(() => setPressedNext(null), 220);
  };

  const handleReset = () => {
    setPressedNext(null);
    setFlowSteps([]);
    setCurrentPositionId('closed_guard_bottom');
    setPathExpanded(false);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  // Auto-expand path when flow ends
  useEffect(() => {
    if (isFlowEnded) {
      setPathExpanded(true);
    }
  }, [isFlowEnded]);

  // Calculate summary stats
  const qualityStats = {
    best: flowSteps.filter((s) => s.quality === 'best').length,
    ok: flowSteps.filter((s) => s.quality === 'ok').length,
    risky: flowSteps.filter((s) => s.quality === 'risky').length,
    bad: flowSteps.filter((s) => s.quality === 'bad').length,
  };

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
                    <PathStepContainer key={step.id}>
                      <PathStepHeader>
                        <PathStepNumber>Step {index + 1}:</PathStepNumber>
                      </PathStepHeader>
                      <PathDetailLine>
                        <PathDetailLabel>From:</PathDetailLabel>
                        <PathPositionName>{fromPos?.name}</PathPositionName>
                      </PathDetailLine>
                      <PathDetailLine>
                        <PathDetailLabel>You chose:</PathDetailLabel>
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
        <YouAreHereSection>
          <YouAreHereLabel>Current position</YouAreHereLabel>
          <CurrentCard>
            <CurrentPositionText>{currentPosition?.name}</CurrentPositionText>
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

        {/* YOUR NEXT MOVES - Options */}
        {!isFlowEnded && availableTransitions.length > 0 && (
          <YourNextMovesSection>
            <NextMovesLabel>Your next moves</NextMovesLabel>
            {availableTransitions.map((transition) => (
              <OptionCard
                key={transition.id}
                onPress={() => handleTransitionPress(transition)}
                isPressed={pressedNext === transition.id}
              >
                <OptionLabelText>{transition.label}</OptionLabelText>
              </OptionCard>
            ))}
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

const PathStepContainer = styled.View`
  margin-bottom: 20px;
  padding: 16px;
  background: ${COLORS.card};
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
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
const YouAreHereSection = styled.View`
  margin-bottom: 24px;
`;

const YouAreHereLabel = styled.Text`
  font-size: 12px;
  color: ${COLORS.muted};
  margin-bottom: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const CurrentCard = styled.View`
  background: ${COLORS.card};
  border: 2px solid ${COLORS.accentPrimary}44;
  border-radius: 16px;
  padding: 28px;
  margin-bottom: 32px;
`;

const CurrentPositionText = styled.Text`
  font-size: 28px;
  color: ${COLORS.text};
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

const OptionCard = styled(Pressable)<{ isPressed: boolean }>`
  background: ${COLORS.card};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  opacity: ${(props: any) => (props.isPressed ? 0.6 : 1)};
`;

const OptionLabelText = styled.Text`
  font-size: 16px;
  color: ${COLORS.text};
  font-weight: 600;
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
  margin-left: 4px;
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
