import React from "react";
import {connect} from "react-redux";
import toggle from "../../actions/userPage";
import ToggleBox from "../../components/ToggleBox";

const mapStateToProps = state => {
  const profiles = state.profiles;
  return {profiles};
};

class ProfilesToggleBox extends React.Component {
  handleToggle = (id) => {
    return () => {
      console.log("button toggled")
      this.props.toggle(id)
    }
  }

  render() {
    console.log("RENDER PROFILE")
    return (
      <ToggleBox name={"Profiles"} items={this.props.profiles}
                 onChangeHandler={this.handleToggle}/>
    );
  }
}

export default connect(mapStateToProps, {toggle})(ProfilesToggleBox)