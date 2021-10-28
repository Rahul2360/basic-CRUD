import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { COLORS } from './constants';
import SearchBar from './search-bar';

export default class UserListTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      usersData: [],
      globaluserData: []
    };
    // this.capitalize = this.capitalize.bind(this);
  }

  componentDidMount() {
    this.userList();
  }

  capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  handleSearch(event) {
    const filtered = this.state.globaluserData.filter(function (d) {
      if (d['name'].toString().toLowerCase().indexOf(event) > -1)
        return true; 
    });
    this.setState({usersData: filtered})
  }

  async userList() {
    //   fetch('https://api.first.org/data/v1/countries',   {
    //     method: "GET", 
    //     mode: 'cors',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     }
    // }).then( response => response.json() ).then( data => console.log(data) )
    const response = await fetch('https://gorest.co.in/public-api/users');
    const data = await response.json();
    this.props.onChange({'case':'user_list', 'data': data.data});

    this.setState({ usersData: data.data })
    this.setState({ globaluserData: data.data })

    // .then(({ results }) => this.setState({ usersData: results }));
  }

  showModal = (id) => {
    this.props.onChange({'case':'selected_user', 'data': id});
  }

  render() {
    const users = this.state.usersData.map((item, i) => (
      <tr key={item.id} >
        <td>{ i+1 }</td>
        <td>{item.name }</td>
        <td>{item.email}</td>
        <td>{this.capitalize(item.gender)}</td>
        <td>{this.capitalize(item.status)}</td>
        <td>
          <a className="view" title="View" data-toggle="tooltip" style={{ color: COLORS.purple }} onClick={() => this.showModal(item.id)}>
            <FontAwesomeIcon  key={item.id} icon={["fa", "eye"]} size="lg"/>
          </a>
        </td>
      </tr>
    ));

    return (
      <div className="row">
        <SearchBar onChangeSearch={this.handleSearch.bind(this)} />

        <div className="table-responsive " >
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name </th>
                <th>Email </th>
                <th>Gender </th>
                <th>Status </th>
                <th>Actions </th>
              </tr>
            </thead>
            <tbody>
              {users}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}