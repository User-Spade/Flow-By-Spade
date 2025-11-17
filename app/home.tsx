import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableWithoutFeedback, Animated, StatusBar } from "react-native";

const BACKGROUND = "#222222";
const CARD_BG = "rgba(44, 44, 49, 0.76)";
const CARD_BORDER = "rgba(255,255,255,0.08)";
const ACCENT = "#F18805";
const WHITE = "#FFF";
const SEARCH_BG = "rgba(50,52,59,0.92)";

// Card icons & routes
const features = [
  {
    key: "StudyFlow",
    title: "Study Flow",
    icon: "repeat-outline",
    iconColor: "#84DCC6", // Mint accent
    route: "study-flow",
  },
  {
    key: "FreeFlow",
    title: "Free Flow",
    icon: "infinite-outline",
    iconColor: "#0081A7", // Blue accent
    route: "free-flow",
  },
  {
    key: "Library",
    title: "Library",
    icon: "book-outline",
    iconColor: "#FFF",
    route: "library",
  },
  {
    key: "Profile",
    title: "Profile",
    icon: "person-circle-outline",
    iconColor: "#F18805", // Orange accent
    route: "profile",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const isNavigating = React.useRef(false);

  // Animation logic for each card
  const scales = features.map(() => React.useRef(new Animated.Value(1)).current);

  const onPressIn = (i: number) => {
    Animated.spring(scales[i], {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  };

  const onPressOut = (i: number, route: string) => {
    Animated.spring(scales[i], {
      toValue: 1,
      useNativeDriver: true,
      speed: 25,
      bounciness: 10,
    }).start(() => {
      // Prevent multiple navigation calls
      if (isNavigating.current) return;
      isNavigating.current = true;
      
      router.push(route as any);
      
      // Reset after navigation completes
      setTimeout(() => {
        isNavigating.current = false;
      }, 1000);
    });
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Header>Home</Header>
      <SearchBarContainer>
        <Ionicons name="search-outline" size={20} color="#AEB0B5" style={{ marginLeft: 16, marginRight: 8 }} />
        <SearchInput
          placeholder="Search techniques"
          placeholderTextColor="#AEB0B5"
          editable={false}
          pointerEvents="none"
        />
      </SearchBarContainer>
      <Grid>
        {features.map((f, i) => (
          <TouchableWithoutFeedback
            key={f.key}
            onPressIn={() => onPressIn(i)}
            onPressOut={() => onPressOut(i, f.route)}
          >
            <AnimatedCard
              style={{
                transform: [{ scale: scales[i] }],
              }}
            >
              <IconWrap>
                <Ionicons name={f.icon as any} size={44} color={f.iconColor} />
              </IconWrap>
              <CardLabel>{f.title}</CardLabel>
            </AnimatedCard>
          </TouchableWithoutFeedback>
        ))}
      </Grid>
    </Container>
  );
}

// STYLES

const Container = styled.View`
  flex: 1;
  background: ${BACKGROUND};
  padding: 0 24px;
  padding-top: 64px;
`;

const Header = styled.Text`
  font-size: 34px;
  color: ${WHITE};
  font-weight: bold;
  margin-bottom: 24px;
  letter-spacing: -0.5px;
`;

const SearchBarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background: ${SEARCH_BG};
  border-radius: 22px;
  padding: 0 6px;
  height: 44px;
  margin-bottom: 36px;
  border-width: 1px;
  border-color: rgba(255,255,255,0.08);
`;

const SearchInput = styled.TextInput`
  color: ${WHITE};
  font-size: 17px;
  padding-left: 4px;
  flex: 1;
`;

const Grid = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Card = styled.View`
  width: 48%;
  aspect-ratio: 1;
  background: ${CARD_BG};
  border-radius: 22px;
  border-width: 0.8px;
  border-color: ${CARD_BORDER};
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.22;
  shadow-radius: 16px;
  elevation: 6;
`;

const AnimatedCard = Animated.createAnimatedComponent(Card);

const IconWrap = styled.View`
  margin-bottom: 8px;
`;

const CardLabel = styled.Text`
  color: ${WHITE};
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.2px;
`;
