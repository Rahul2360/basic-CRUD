import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from 'react-bootstrap';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { COLORS } from './constants';
import '../styles/basic-style.css'
import UserListTable from './users-list-table';
import UserForm from './user-form';
import Notifications, {notify} from 'react-notify-toast';

class UserList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      search_value: '',
      user_data: [],
      filtered_data: [],
      show_modal: false,
      selected_user:{},
    };
  }

  // handleSearch(event) {
  //   const filtered = this.state.user_data.filter(function (d) {
  //     if (d['name'].toString().toLowerCase().indexOf(event) > -1)
  //       return true; 
  //   });
  //   this.setState({filtered_data: filtered})
  // }

  onUserListChange = (value) => {
    switch(value.case) {
      case 'user_list':
        this.setState({
          user_data: value
        });
      break;
      case 'selected_user':
        this.get_user_detail(value.data);
      break;
      default: 
      break;
    }
  };


  get_user_detail(id) {
    const url = 'https://gorest.co.in/public-api/users/' + id
    fetch(url) .then((response) => response.json())
    .then((responseData) => {
      if(responseData.code == 200) {
        this.showModal()
        this.setState({selected_user: {
          name:responseData.data.name,
          email:responseData.data.email,
          gender:responseData.data.gender
        }})
      } else {
        let myColor = { background: '#FF0000', text: "#FFFFFF" };
        notify.show('Resources Not found',"custom",2000, myColor);
        this.setState({selected_user: {
          name:'',
          email:'',
          gender:'',
        }})
      }
    })
   
  }

  clear_form = () => {
    this.setState({selected_user: {
      name:'',
      email:'',
      gender:''
    }})
    this.showModal()
  }

  showModal = () => {
    this.setState({ show_modal: true}) 
  }

  hideModal = () => {
    this.setState({ show_modal: false}) 
  }

  render() {
    return (

      <div className="container ">
        <div className="crud shadow-lg p-3 mb-5 mt-4 bg-body rounded">
          <Notifications />
          <div className="row">
            {/* Basic Info */}
            <div className="col-12 mx-2" style={{ color: COLORS.primary }}>
              <h3 className="d-inline"><b>Users Details</b></h3>
              <div className="d-inline">
                <Button variant="primary round add-btn" title="Add New User" data-toggle="tooltip" size="sm" onClick={this.clear_form}>
                  <FontAwesomeIcon icon={["fa", "plus"]} />
                </Button>
              </div>
            </div>

            {/* Search  */}
          </div>
          <div className="row">
            <div className="table-responsive">
              <UserListTable filteredData={this.state.filtered_data} onChange={this.onUserListChange.bind(this)}/>
            </div>
          </div>

          {/* <!--- Model Box ---> */}
          <div className="model_box">
            <Modal
              backdrop="static"
              onHide={this.hideModal}
              keyboard={false}
              show={this.state.show_modal}
            >
              <Modal.Header closeButton>
                <Modal.Title>User Detail</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <UserForm userDetails={this.state.selected_user}/>
              </Modal.Body>

              {/* <Modal.Footer>
                <Button variant="secondary" onClick={this.hideModal} >
                  Close
                </Button>

                <Button variant="primary" onClick={this.addUser}>
                  Add User
                </Button>

              </Modal.Footer> */}
            </Modal>

            {/* Model Box Finsihs */}
          </div>
        </div>
      </div>
    );
  }
}

export default UserList;

// Dear Candidate,
 
// Please find the assignment below. You would get 60 minutes to complete the assignment, post that time we shall be discussing the rationale behind the application design.
 
// 1. You need to create an application from scratch which shall be adding users and displaying the users.
// 2. Create a page where the user can provide a username and click on the addUser button to add a user.
// 3. Create a grid view which shall show all the users added.
// 4. The grid view should contain a delete button clicking which should delete the user.
 
// Expectations:
// 1. The pages should be responsive.
// 2. Components created should be re-usable.
// 3. App design
// 4. State Management
// 5. SSR using NextJs (bonus)

// List of users to render in the table
//     GET https://gorest.co.in/public-api/users

// Fetch a particular user 
//     GET https://gorest.co.in/public-api/users/<id>

// Add a user
// POST https://gorest.co.in/public/v1/users
