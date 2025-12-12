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

type FlowOption = {
  label: string;
  next: string;
  quality: Quality;
  note: string;
};

type Step = {
  position: string;
  quality?: Quality;
  note?: string;
  moveLabel?: string;
};

type OptionsMap = Record<string, FlowOption[]>;

const INITIAL_STEP: Step = { position: 'Closed Guard (Bottom)' };

const OPTIONS: OptionsMap = {
  'Closed Guard (Bottom)': [
    { label: 'Hip Bump Sweep', next: 'Mount (Top)', quality: 'best', note: 'High success rate from this position' },
    { label: 'Closed Guard Armbar', next: 'Armbar Finish', quality: 'ok', note: 'Solid but requires good setup' },
  ],
  'Mount (Top)': [
    { label: 'Cross Collar Choke', next: 'Submission', quality: 'best', note: 'Textbook finish, use it!' },
    { label: 'S-Mount Transition', next: 'S-Mount (Top)', quality: 'ok', note: 'Defensive but opens more options' },
  ],
  'S-Mount (Top)': [
    { label: 'Armbar Finish', next: 'Submission', quality: 'best', note: 'Strong finish from here' },
    { label: 'Far-Side Armbar', next: 'Submission', quality: 'risky', note: 'Can be escaped by experienced opponents' },
  ],
  'Armbar Finish': [
    { label: 'Defend Escape', next: 'Escape', quality: 'ok', note: 'End the flow by defending' },
  ],
};

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
  const [flowSteps, setFlowSteps] = useState<Step[]>([INITIAL_STEP]);
  const [pathExpanded, setPathExpanded] = useState(false);
  const [pressedNext, setPressedNext] = useState<string | null>(null);

  const currentStep = flowSteps[flowSteps.length - 1];
  const isFlowEnded = currentStep.position === 'Submission' || currentStep.position === 'Escape';

  const availableOptions = (OPTIONS[currentStep.position] || []).filter(
    (option) => !flowSteps.some((step) => step.position === option.next),
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
  }, [flowSteps.length]);

  const handleOptionPress = (option: FlowOption) => {
    setPressedNext(option.next);
    setFlowSteps((prev) => [
      ...prev,
      {
        position: option.next,
        quality: option.quality,
        note: option.note,
        moveLabel: option.label,
      },
    ]);
    setTimeout(() => setPressedNext(null), 220);
  };

  const handleReset = () => {
    setPressedNext(null);
    setFlowSteps([INITIAL_STEP]);
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
        {flowSteps.length > 1 && (
          <PathSection>
            <PathHeader onPress={() => setPathExpanded(!pathExpanded)}>
              <PathTitle>
                {pathExpanded ? 'Path so far' : `Path so far: ${flowSteps.length - 1} steps – tap to expand`}
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
                {flowSteps.map((step, index) => {
                  // First step: show starting position only
                  if (index === 0) {
                    return (
                      <PathStartPosition key={`path-${index}`}>
                        <PathStepNumber>Start:</PathStepNumber> {step.position}
                      </PathStartPosition>
                    );
                  }

                  // Subsequent steps: show the complete transition
                  const fromPosition = flowSteps[index - 1].position;
                  const moveLabel = step.moveLabel;
                  const toPosition = step.position;
                  const quality = step.quality;

                  return (
                    <PathStepContainer key={`path-${index}`}>
                      <PathStepHeader>
                        <PathStepNumber>Step {index}:</PathStepNumber>
                      </PathStepHeader>
                      <PathDetailLine>
                        <PathDetailLabel>From:</PathDetailLabel>
                        <PathPositionName>{fromPosition}</PathPositionName>
                      </PathDetailLine>
                      <PathDetailLine>
                        <PathDetailLabel>You chose:</PathDetailLabel>
                        <PathMoveName>{moveLabel}</PathMoveName>
                      </PathDetailLine>
                      <PathDetailLine>
                        <PathDetailLabel>Now in:</PathDetailLabel>
                        <PathPositionName>{toPosition}</PathPositionName>
                      </PathDetailLine>
                      {quality && (
                        <PathEvaluationLine quality={quality}>
                          <PathEvaluationText>
                            {getQualityEmoji(quality)} {getQualityMessage(quality)}
                          </PathEvaluationText>
                        </PathEvaluationLine>
                      )}
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
            <CurrentPositionText>{currentStep.position}</CurrentPositionText>
            {currentStep.quality && (
              <QualityBadge quality={currentStep.quality}>
                <QualityEmoji>{getQualityEmoji(currentStep.quality)}</QualityEmoji>
                <QualityText>{getQualityMessage(currentStep.quality)}</QualityText>
              </QualityBadge>
            )}
            {currentStep.note && <NoteText>{currentStep.note}</NoteText>}
          </CurrentCard>
        </YouAreHereSection>

        {/* YOUR NEXT MOVES - Options */}
        {!isFlowEnded && availableOptions.length > 0 && (
          <YourNextMovesSection>
            <NextMovesLabel>Your next moves</NextMovesLabel>
            {availableOptions.map((option) => (
              <OptionCard
                key={option.label}
                onPress={() => handleOptionPress(option)}
                isPressed={pressedNext === option.next}
              >
                <OptionLabelText>{option.label}</OptionLabelText>
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
  background: ${(props) => getQualityColor(props.quality)}15;
  border: 1px solid ${(props) => getQualityColor(props.quality)}44;
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
  background: ${(props) => getQualityColor(props.quality)}22;
  border: 1px solid ${(props) => getQualityColor(props.quality)}44;
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
  opacity: ${(props) => (props.isPressed ? 0.6 : 1)};
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
