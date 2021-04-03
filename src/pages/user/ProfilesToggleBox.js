import React, {useState} from "react";
import {connect} from "react-redux";
import toggle from "../../actions/userPage";
import ToggleBox from "../../components/ToggleBox";

const mapStateToProps = state => {
  const profiles = state.profiles;
  return {profiles};
};

const handleToggle = (id) => {
  return () => {
    console.log("button toggled")
    this.props.toggle(id)
  }
}

function ProfilesToggleBox(props) {
  return (
    <ToggleBox name={"Profiles"} items={props.profiles}
               onChangeHandler={handleToggle} />
  );
}

export default connect(mapStateToProps, {toggle})(ProfilesToggleBox)