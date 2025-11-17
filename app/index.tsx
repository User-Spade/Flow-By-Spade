import React, { useState, useRef } from 'react';
import { Animated, Pressable, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { ThemeProvider } from 'styled-components/native';
import { COLORS, BELT_LEVELS, BeltLevel } from '../constants/theme';
import { useRouter } from 'expo-router';
import { useBelt } from '../contexts/BeltContext';

// ---- Styled components ----
const Safe = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLORS.bg};
`;

const Container = styled.View`
  flex: 1;
  padding: 28px 20px;
  justify-content: space-between;
`;

const Top = styled.View`
  margin-top: 24px;
`;

const Title = styled.Text`
  color: ${COLORS.text};
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Subtitle = styled.Text`
  color: ${COLORS.muted};
  font-size: 16px;
`;

const BeltRow = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingRight: 20 },
})`
  margin-top: 28px;
`;

const BeltButton = styled.Pressable<{ selected: boolean }>`
  background-color: ${props => (props.selected ? COLORS.card : 'transparent')};
  border-radius: 14px;
  padding: 14px 18px;
  margin-right: 12px;
  border-width: 1px;
  border-color: ${props => (props.selected ? COLORS.accentSecondary : 'rgba(255,255,255,0.06)')};
  min-width: 120px;
  align-items: center;
`;

const BeltLabel = styled.Text<{ selected: boolean }>`
  color: ${props => (props.selected ? COLORS.text : COLORS.muted)};
  font-size: 16px;
  font-weight: 600;
`;

const Bottom = styled.View`
  margin-bottom: 24px;
`;

const ContinueContainer = styled.View`
  margin-top: 8px;
`;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ContinueButton = styled(AnimatedPressable)<{ disabled: boolean }>`
  height: 56px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.disabled ? 'rgba(255,255,255,0.06)' : COLORS.accentPrimary)};
  box-shadow: 0px 6px 18px rgba(0,0,0,0.35);
`;

const ContinueText = styled.Text`
  color: ${COLORS.text};
  font-weight: 600;
  font-size: 17px;
`;

// ---- Main Component ----
export default function WelcomeScreen() {
  const [selectedBelt, setSelectedBelt] = useState<BeltLevel | null>(null);
  const scale = useRef(new Animated.Value(1)).current;
  const router = useRouter();
  const { setBelt } = useBelt();

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.985,
      useNativeDriver: true,
      stiffness: 300,
      damping: 20,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      stiffness: 300,
      damping: 20,
    }).start();
  };

  const handleContinue = () => {
    if (!selectedBelt) return;
    
    // Save belt selection (could be saved to AsyncStorage later)
    setBelt(selectedBelt);
    
    // Navigate to home screen
    router.push('/home');
  };

  return (
    <ThemeProvider theme={{ colors: COLORS }}>
      <Safe>
        <StatusBar barStyle="light-content" />
        <Container>
          <Top>
            <Title>Webs by Spade</Title>
            <Subtitle>Choose your belt level to get started</Subtitle>

            <BeltRow>
              {BELT_LEVELS.map(belt => {
                const selected = selectedBelt === belt;
                return (
                  <BeltButton
                    key={belt}
                    selected={selected}
                    onPress={() => setSelectedBelt(belt)}
                    android_ripple={{ color: 'rgba(255,255,255,0.06)' }}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                  >
                    <BeltLabel selected={selected}>{belt}</BeltLabel>
                  </BeltButton>
                );
              })}
            </BeltRow>
          </Top>

          <Bottom>
            <ContinueContainer>
              <ContinueButton
                style={{ transform: [{ scale }] }}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onPress={handleContinue}
                disabled={!selectedBelt}
                accessibilityRole="button"
                accessibilityState={{ disabled: !selectedBelt }}
              >
                <ContinueText>
                  {selectedBelt ? `Continue — ${selectedBelt}` : 'Select a belt to continue'}
                </ContinueText>
              </ContinueButton>
            </ContinueContainer>
          </Bottom>
        </Container>
      </Safe>
    </ThemeProvider>
  );
}
