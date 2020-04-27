import React from "react";
import styled from "styled-components";

class Avatar extends React.Component {
  state = {
    photo: "https://wilcity.com/wp-content/uploads/2019/02/avataaars.png",
  };

  componentDidMount() {
    fetch("https://uifaces.co/api", {
      headers: new Headers({
        "X-API-KEY": "208f14194b37d24204b9c4b085469f",
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({
          photo: response[0].photo,
        });
      });
  }

  render() {
    return <Image source={{ uri: this.state.photo }} />;
  }
}

export default Avatar;

const Image = styled.Image`
  width: 44px;
  height: 44px;
  background: black;
  border-radius: 22px;
`;
