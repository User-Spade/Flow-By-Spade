import React from 'react';
import styled from 'styled-components/native';
import { StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const BACKGROUND = '#222222';
const WHITE = '#FFF';
const BLUE = '#0081A7';

export default function FreeFlowScreen() {
  const router = useRouter();

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <BackButton onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color={WHITE} />
      </BackButton>
      <Content>
        <IconContainer>
          <Ionicons name="infinite-outline" size={80} color={BLUE} />
        </IconContainer>
        <Title>Free Flow</Title>
        <Description>
          Free practice mode with unlimited possibilities.{'\n'}
          Coming soon!
        </Description>
      </Content>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background: ${BACKGROUND};
  padding: 20px;
`;

const BackButton = styled.Pressable`
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const IconContainer = styled.View`
  margin-bottom: 24px;
`;

const Title = styled.Text`
  font-size: 32px;
  color: ${WHITE};
  font-weight: bold;
  margin-bottom: 12px;
`;

const Description = styled.Text`
  font-size: 17px;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  line-height: 24px;
`;
