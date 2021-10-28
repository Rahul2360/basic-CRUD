import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';

import '../styles/basic-style.css'
import Notifications, { notify } from 'react-notify-toast';

class UserForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      gender: '',
      is_submit: false,
      name_status: false,
      email_status: false,
      gender_status: false,
      is_new: true,
      name_disabled: false,
      gender_disabled: false,
      email_disabled: false,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value }, () => {
      // this.send_props()
      this.validate()
    })
  }

  handleGenderChange(event) {
    this.setState({ gender: event.target.value }, () => {
      // this.send_props()
      this.validate()
    })
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value }, () => {
      // this.send_props()
      this.validate()
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.userDetails.name == '') {
      this.setState({is_new :true});
      this.setState({name_disabled:false});
      this.setState({gender_disabled:false});
      this.setState({email_disabled:false});
    } else {
      this.setState({is_new :false});
      this.setState({name_disabled:true});
      this.setState({gender_disabled:true});
      this.setState({email_disabled:true});
    }
    this.setState({
      name: nextProps.userDetails.name,
      email: nextProps.userDetails.email,
      gender: nextProps.userDetails.gender,
    }, () => {
    });
  }

  // send_props() {
  //   this.props.onChange({
  //     name:this.state.name,
  //     email:this.state.email,
  //     gender:this.state.gender
  //   })

  // }

  validate = () => {
    this.setState({ is_submit: true });
    if (this.state.name === '') {
      this.setState({name_status: false})
      return false;
    } else {
      this.setState({name_status: true})
    }
    if (this.state.gender === '') {
      this.setState({gender_status: false})
      return false;
    } else {
      this.setState({gender_status: true})
    }
    if (this.state.email !== '' &&  (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email))) {
      this.setState({email_status: true})
    } else {
      this.setState({email_status: false})
      return false;
    }
    return true;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      name: this.state.name,
      email: this.state.email,
      gender: this.state.gender
    }
    if (this.validate()) {

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      };
      fetch('https://gorest.co.in/public/v1/users', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          let myColor = { background: '#FF0000', text: "#FFFFFF" };
          notify.show('Resources Not found', "custom", 2000, myColor);
        });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Notifications />
          <div className="form-group">
            <label>Name <span class="mandatory"> *</span></label>
            <input type="text" className="form-control form-control-sm" id="name" placeholder="Enter Name" value={this.state.name} onChange={this.handleNameChange} disabled = {(this.state.name_disabled)? "disabled" : ""} />
            {this.state.is_submit && !this.state.name_status ? (<p class="mandatory mb-0">This Field is Required</p>) : ''}
          </div>
          <div className="form-group">
            <label>Gender <span class="mandatory"> *</span></label>
            <select value={this.state.gender} className="form-control form-control-sm" onChange={this.handleGenderChange} disabled = {(this.state.gender_disabled)? "disabled" : ""}>
              <option value="">--</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {this.state.is_submit && !this.state.gender_status ? (<p class="mandatory mb-0">This Field is Required</p>) : ''}
          </div>
          <div className="form-group">
            <label>Email <span class="mandatory"> *</span></label>
            <input type="email" className="form-control form-control-sm" id="email" placeholder="Enter Email" value={this.state.email} onChange={this.handleEmailChange} disabled = {(this.state.email_disabled)? "disabled" : ""} />
            {this.state.is_submit && !this.state.email_status ? (<p class="mandatory mb-0">This Field is Required</p>) : ''}
          </div>
          {this.state.is_new ? ( <input className="btn btn-sm btn-primary mt-2 float-right" type="submit" value="Add User" />) : ''}
        </form>
      </div>
    );
  }
}

export default UserForm;
