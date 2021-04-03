import React from "react";
import {connect} from "react-redux";
import toggle from "../../actions/sessionPage";
import ToggleBox from "../../components/ToggleBox";

const mapStateToProps = state => {
  const allContent = state.allContent;
  return {allContent};
};

class SessionToggleBox extends React.Component {
  handleToggle = (id) => {
    return () => {
      this.props.toggle(id)
    }
  }

  render() {
    return (
      <ToggleBox name={"Content"} items={this.props.allContent}
                 onChangeHandler={this.handleToggle} noColorBar={true}/>
    );
  }
}

export default connect(mapStateToProps, {toggle})(SessionToggleBox)