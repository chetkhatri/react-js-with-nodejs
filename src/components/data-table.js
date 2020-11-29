import React, { Component } from 'react';

class DataTable extends Component {
    render() {
        return (
            <tr>
                {/* <td>
                    {this.props.obj._id}
                </td> */}
                <td>
                    {this.props.obj.book_isbn_number}
                </td>
                <td>
                    {this.props.obj.author}
                </td>
                <td>
                    {this.props.obj.title}
                </td>
                <td>
                    {this.props.obj.book_subject}
                </td>
            </tr>
        );
    }
}

export default DataTable;