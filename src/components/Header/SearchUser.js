import {Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import s from "./Header.module.scss";
import SearchIcon from "../Icons/HeaderIcons/SearchIcon";
import React from "react";

export const mockUsers = [
  ["frbk", "c9723447-5004-4afd-b1bc-abadc0f8565b"],
  ["bad", "4e006ed3-1d69-48fa-ae3b-b5cd6beb7bb1"],
  ["svya", "44e14f94-6137-4616-8d0e-630a1d5288b4"]
]

class SearchUserBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    };
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTermChange(e) {
    this.setState({term: e.target.value});
  }

  handleSearch() {
    let id = this.state.term.toLowerCase()
    mockUsers.forEach(usernameAndID => {
      if (id.startsWith(usernameAndID[0])) {
        id = usernameAndID[1]
      }
    })
    this.props.history.push("/app/users/" + id);
    //document.location.reload()
  }

  handleEnter(e) {
    if (e.key === 13) {
      this.handleSearch();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleSearch();
  }

  render() {
    return (
      <Form className="d-md-down-none mr-3 ml-3" inline onSubmit={this.handleSubmit}>
        <FormGroup>
          <InputGroup className={`input-group-no-border ${s.searchForm}`}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText className={s.inputGroupText}>
                <SearchIcon className={s.headerIcon}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              id="search-input"
              className="input-transparent"
              placeholder="Search for user"
              onChange={this.handleTermChange}
              onKeyDown={this.handleEnter}
            />
          </InputGroup>
        </FormGroup>
      </Form>
    );
  }
}

export default SearchUserBar;