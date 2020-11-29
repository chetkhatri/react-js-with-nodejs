import React, { Component } from 'react';
import axios from 'axios';
import DataTable from './data-table';

export default class Books extends Component {

    constructor(props) {
        super(props);
        this.state = { booksCollection: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5345/api/v1/book')
            .then(res => {
                this.setState({ booksCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }   

    dataTable() {
        return this.state.booksCollection.map((data, i) => {
            return <DataTable obj={data} key={i} />;
        });
    }

    render() {
        return (
            <div className="wrapper-users">
                <div className="container">
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <th>Book Number</th>
                                <th>Author</th>
                                <th>Title</th>
                                <th>Subject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.dataTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}