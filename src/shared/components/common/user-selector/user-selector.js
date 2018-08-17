import React from 'react';
import createClass from 'create-react-class';
import CreatableSelect from 'react-select/lib/Creatable';
import PropTypes from 'prop-types';
import { getUserSearch } from './../../../api';

var UserSelector = createClass({
	displayName: 'UserSelector',
	propTypes: {
		label: PropTypes.string,
	},
	getInitialState() {
		getUserSearch(this.props.auth.getAccessToken(), "").then((res) => this.setState({options: res.map(u => {return {value: u.id, label: u.name}})}));
    return {
      multiValue: this.props.users,
      options: []
    };
	},
	handleOnChange(value) {
    this.props.onUsersUpdated(value);
		this.setState({multiValue: value});
	},
	isValidNewOption(inputValue) {
		return this.state.options.filter(u => inputValue.toLowerCase() === u.label.toLowerCase()).length == 0;
	},
	render() {
		return (
      <div style={{position: 'relative', width: '100%'}}>
        <div style={{width: '100%'}}>
  				<CreatableSelect
  					isMulti
  					options={this.state.options}
  					onChange={this.handleOnChange}
						isValidNewOption={this.isValidNewOption}
  					value={this.state.multiValue}
  				/>
				</div>
			</div>
		);
	}
});

module.exports = UserSelector;