import React, { useEffect, useRef, useState } from 'react';
import { Button, ScrollView, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const COLORS = {
  bg: '#222222',
  text: '#FFFFFF',
  muted: 'rgba(255, 255, 255, 0.6)',
  accentPrimary: '#F18805',
  accentSecondary: '#0081A7',
};

type FlowOption = { label: string; next: string };
type OptionsMap = Record<string, FlowOption[]>;

const INITIAL_STEP = 'Closed Guard (Bottom)';

const OPTIONS: OptionsMap = {
  'Closed Guard (Bottom)': [
    { label: 'Hip Bump Sweep', next: 'Mount (Top)' },
    { label: 'Closed Guard Armbar', next: 'Armbar Finish' },
  ],
  'Mount (Top)': [
    { label: 'Cross Collar Choke', next: 'Submission' },
    { label: 'S-Mount Transition', next: 'S-Mount (Top)' },
  ],
  'S-Mount (Top)': [
    { label: 'Armbar Finish', next: 'Armbar Finish' },
    { label: 'Far-Side Armbar', next: 'Submission' },
  ],
  Submission: [
    { label: 'Reset to Start', next: INITIAL_STEP },
  ],
};

export default function StudyFlowScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [steps, setSteps] = useState<string[]>([INITIAL_STEP]);
  const [pressedNext, setPressedNext] = useState<string | null>(null);

  const lastStep = steps[steps.length - 1];
  const availableOptions = (OPTIONS[lastStep] || []).filter(
    (option) => !steps.includes(option.next),
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
  }, [steps.length]);

  const handleOptionPress = (next: string) => {
    setPressedNext(next);
    setSteps((prev) => [...prev, next]);
    setTimeout(() => setPressedNext(null), 220);
  };

  const handleReset = () => {
    setPressedNext(null);
    setSteps([INITIAL_STEP]);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <BackButton onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color={COLORS.text} />
      </BackButton>

      <Header>
        <Title>Study Flow</Title>
        <Subtitle>Tap options on the last step to grow the flow.</Subtitle>
      </Header>

      <ScrollArea
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {steps.map((step, index) => (
          <StepRow key={`${step}-${index}`}>
            <StepBullet />
            <StepText>{step}</StepText>
          </StepRow>
        ))}

        {availableOptions.length > 0 && (
          <OptionsBlock>
            <OptionsLabel>Options</OptionsLabel>
            {availableOptions.map((option) => (
              <OptionWrapper key={option.label}>
                <Button
                  title={option.label}
                  onPress={() => handleOptionPress(option.next)}
                  color={
                    pressedNext === option.next
                      ? COLORS.accentSecondary
                      : COLORS.accentPrimary
                  }
                />
              </OptionWrapper>
            ))}
          </OptionsBlock>
        )}
      </ScrollArea>

      <ResetArea>
        <Button title="Reset Flow" onPress={handleReset} color={COLORS.accentSecondary} />
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
`;

const Title = styled.Text`
  font-size: 28px;
  color: ${COLORS.text};
  font-weight: 700;
  margin-bottom: 6px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: ${COLORS.muted};
  line-height: 22px;
`;

const ScrollArea = styled.ScrollView`
  flex: 1;
  margin-top: 20px;
`;

const StepRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 10px;
  gap: 12px;
`;

const StepBullet = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: ${COLORS.accentPrimary};
`;

const StepText = styled.Text`
  color: ${COLORS.text};
  font-size: 18px;
  font-weight: 600;
`;

const OptionsBlock = styled.View`
  margin-top: 12px;
  gap: 10px;
`;

const OptionsLabel = styled.Text`
  color: ${COLORS.muted};
  font-size: 15px;
  margin-bottom: 4px;
`;

const OptionWrapper = styled.View`
  border-radius: 12px;
  overflow: hidden;
`;

const ResetArea = styled.View`
  padding-top: 12px;
  padding-bottom: 8px;
`;
