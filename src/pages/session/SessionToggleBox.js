import React, {useState} from "react";
import {connect} from "react-redux";
import toggle from "../../actions/sessionPage";
import ToggleBox from "../../components/ToggleBox";

const mapStateToProps = state => {
  const allContent = state.allContent;
  return {allContent};
};


const handleToggle = (id) => {
  return () => {
    this.props.toggle(id)
  }
}

function SessionToggleBox(props) {
  return (
    <ToggleBox name={"Content"} items={props.allContent}
               onChangeHandler={handleToggle} noColorBar={true}/>
  );
}

export default connect(mapStateToProps, {toggle})(SessionToggleBox)