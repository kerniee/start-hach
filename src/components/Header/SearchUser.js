import {Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import s from "./Header.module.scss";
import SearchIcon from "../Icons/HeaderIcons/SearchIcon";
import React from "react";

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
        this.setState({ term: e.target.value });
    }

    handleSearch() {
        console.log(this.state.term);
        // Make request to server about this.state.term
        // Get user id
        let user_id = "1";
        this.props.history.push("/app/users/" + user_id);
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
                            placeholder="Search2 Dashboard"
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