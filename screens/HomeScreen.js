import React from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
} from "react-native";
import styled from "styled-components";
import Card from "../components/Card";
import { Ionicons } from "@expo/vector-icons";
import Logo from "../components/Logo";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import Avatar from "../api/Avatar";
import ModalLogin from "../components/ModelLogin";

function mapStateToProps(state) {
  return { action: state.action, name: state.name };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU",
      }),
  };
}
class HomeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
  };
  componentDidMount() {
    StatusBar.setBarStyle("dark-content", true);
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in,
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 0.5,
      }).start();
      StatusBar.setBarStyle("light-content", true);
    }

    if (this.props.action == "closeMenu") {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in,
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 1,
      }).start();
    }
    StatusBar.setBarStyle("dark-content", true);
  };

  render() {
    return (
      <RootView>
        <Menu />
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity,
          }}
        >
          <SafeAreaView>
            <ScrollView style={{ height: "100%" }}>
              <TitleBar>
                <TouchableOpacity
                  onPress={this.props.openMenu}
                  style={{ position: "absolute", top: 0, left: 20 }}
                >
                  <Avatar />
                </TouchableOpacity>

                <Title>Welcome Home </Title>
                <Name>Name Here</Name>
                <Ionicons
                  name="ios-notifications"
                  color="#4775f2"
                  size={32}
                  style={{ position: "absolute", right: 20, top: 5 }}
                />
              </TitleBar>
              <ScrollView
                style={{
                  flexDirection: "row",
                  padding: 20,
                  paddingLeft: 12,
                  paddingTop: 30,
                }}
                horizontal={true}
              >
                {logos.map((logo, index) => (
                  <Logo key={index} image={logo.image} />
                ))}
              </ScrollView>

              <Subtitle>Continue Learning</Subtitle>
              <ScrollView
                horizontal={true}
                style={{ paddingBottom: 30 }}
                showsHorizontalScrollIndicator={false}
              >
                {/* ----------------------------continue old Loop Start here --------------------*/}
                {cards.map((card, index) => (
                  <TouchableOpacity
                    key={index}
                    // onPress={() => {
                    //   navigation.navigate("Section", {
                    //     section: card,
                    //   });
                    // }}

                    onPress={() =>
                      this.props.navigation.push("Section", {
                        section: card,
                      })
                    }
                  >
                    <Card
                      title={card.title}
                      image={card.image}
                      caption={card.caption}
                      logo={card.logo}
                      subtitle={card.subtitle}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <Subtitle>NEWEST COURSES</Subtitle>
              <ScrollView
                horizontal={true}
                style={{ paddingBottom: 30 }}
                showsHorizontalScrollIndicator={false}
              >
                <Card
                  title="Styled components7"
                  image={require("../assets/background7.jpg")}
                  logo={require("../assets/logo-react.png")}
                  caption="React Native"
                  subtitle="5 to 10"
                />
                <Card
                  title="Styled components7"
                  image={require("../assets/background7.jpg")}
                  logo={require("../assets/logo-react.png")}
                  caption="React Native"
                  subtitle="5 to 10"
                />
              </ScrollView>

              <Subtitle>TRENDING COURSES</Subtitle>
              <ScrollView
                horizontal={true}
                style={{ paddingBottom: 30 }}
                showsHorizontalScrollIndicator={false}
              >
                <Card
                  title="Styled components7"
                  image={require("../assets/background7.jpg")}
                  logo={require("../assets/logo-react.png")}
                  caption="React Native"
                  subtitle="5 to 10"
                />
                <Card
                  title="Styled components7"
                  image={require("../assets/background7.jpg")}
                  logo={require("../assets/logo-react.png")}
                  caption="React Native"
                  subtitle="5 to 10"
                />
              </ScrollView>
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
        <ModalLogin />
      </RootView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 15px;
  text-transform: uppercase;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const logos = [
  {
    image: require("../assets/ldn.png"),
  },
  {
    image: require("../assets/pls.png"),
  },
  {
    image: require("../assets/oml.png"),
  },
  {
    image: require("../assets/qum.jpg"),
  },
];

const cards = [
  {
    title: "Depression in the Legal Profession",
    image: require("../assets/background1.jpg"),
    logo: require("../assets/logo-react.png"),
    caption: "Name Native",
    subtitle: "View 11",
  },
  {
    title:
      "From In-House to the Bench: How to Behave (Ethically) in Front of Your Judge",
    image: require("../assets/background3.jpg"),
    logo: require("../assets/logo-react.png"),
    caption: "Name Native",
    subtitle: "View 30",
  },
  {
    title:
      "Novel Legal Challenges Facing In-House Counsel From the Novel Corona virus",
    image: require("../assets/background2.jpg"),
    logo: require("../assets/logo-react.png"),
    caption: "Name Native",
    subtitle: "View 18",
  },
];

const courses = [
  {
    title: "Depression in the Legal Profession",
    image: require("../assets/background1.jpg"),
    logo: require("../assets/logo-react.png"),
    caption: "Name Native",
    subtitle: "View 11",
  },
  {
    title:
      "From In-House to the Bench: How to Behave (Ethically) in Front of Your Judge",
    image: require("../assets/background3.jpg"),
    logo: require("../assets/logo-react.png"),
    caption: "Name Native",
    subtitle: "View 30",
  },
  {
    title:
      "Novel Legal Challenges Facing In-House Counsel From the Novel Corona virus",
    image: require("../assets/background2.jpg"),
    logo: require("../assets/logo-react.png"),
    caption: "Name Native",
    subtitle: "View 18",
  },
];

const newCourses = [
  {
    title: "Depression in the Legal Profession",
    image: require("../assets/background1.jpg"),
    logo: require("../assets/logo-react.png"),
    caption: "Name Native",
    subtitle: "View 11",
  },
  {
    title:
      "From In-House to the Bench: How to Behave (Ethically) in Front of Your Judge",
    image: require("../assets/background3.jpg"),
    logo: require("../assets/logo-react.png"),
    caption: "Name Native",
    subtitle: "View 30",
  },
  {
    title:
      "Novel Legal Challenges Facing In-House Counsel From the Novel Corona virus",
    image: require("../assets/background2.jpg"),
    logo: require("../assets/logo-react.png"),
    caption: "Name Native",
    subtitle: "View 18",
  },
];
