// ** create-user.component.js ** //

import React, { Component } from 'react';
import axios from 'axios';

function ValidationMessage(props) {
    if (!props.valid) {
      return(
        <div className='error-msg'>{props.message}</div>
      )
    }
    return null;
  }

export default class CreateBook extends Component {
    state = {
        book_isbn_number: '', bookNumberValid: false, 
        author: '', authorValid: false,
        title: '', titleValid: false,
        book_subject: '', subjectValid: false,
        formValid: false,
        errorMsg: {}
    }
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this); 
    }

    validateForm = () => {
        const {bookNumberValid, authorValid, titleValid, subjectValid} = this.state;
        this.setState({
          formValid: bookNumberValid && authorValid && titleValid && subjectValid
        })
      }

    updateBookIsbnNumber = (book_isbn_number) => {
        this.setState({book_isbn_number}, this.validateBookIsbnNumber)
    }

    validateBookIsbnNumber = () => {
        const {book_isbn_number} = this.state;
        let bookNumberValid = true;
        let errorMsg = {...this.state.errorMsg}
        

        if (book_isbn_number.length < 10 || book_isbn_number.length > 12) {
            bookNumberValid = false;
            errorMsg.book_isbn_number = 'Book ISBN length must be in between 10 and 12 characters';
          }
      
          this.setState({bookNumberValid, errorMsg}, this.validateForm)
    }

    updateAuthor = (author) => {
        this.setState({author}, this.validateAuthor)
    }

    validateAuthor = () => {
        const {author} = this.state;
        let authorValid = true;
        let errorMsg = {...this.state.errorMsg}
        if(!/^[a-z\s]+$/i.test(author)) {
            authorValid = false;
            errorMsg.author = "Invalid author name, It should be Alphabetic";
        }
        this.setState({authorValid, errorMsg}, this.validateForm)
    }

    updateTitle = (title) => {
        this.setState({title}, this.validateTitle)
    }

    validateTitle = () => {
        const {title} = this.state;
        let titleValid = true;
        let errorMsg = {...this.state.errorMsg}
        if(!/^[a-z\d\s]+$/i.test(title)) {
            titleValid = false;
            errorMsg.title = "Invalid Book title, It should be Alphanumeric";
        }
        this.setState({titleValid, errorMsg}, this.validateForm)
    }

    updateSubject = (book_subject) => {
        this.setState({book_subject}, this.validateSubject)
    }

    validateSubject = () => {
        const {book_subject} = this.state;
        let subjectValid = true;
        let errorMsg = {...this.state.errorMsg}
        
        if(!/^[a-z\s]+$/i.test(book_subject)) {
            subjectValid = false;
            errorMsg.book_subject = "Invalid Book Subject, It should be Alphanumeric";
        }
        this.setState({subjectValid, errorMsg}, this.validateForm)
    }

    onSubmit(e) {
        e.preventDefault()

        const bookObject = {
            book_isbn_number: this.state.book_isbn_number,
            author: this.state.author,
            title: this.state.title,
            book_subject: this.state.book_subject
        };

        axios.post('http://localhost:5345/api/v1/book', bookObject)
            .then((res) => {
                console.log("##### inside post method")
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

        this.setState({ book_isbn_number: '', author: '', title: '', book_subject:'' })
    }


    render() {
        return (
            <div className="wrapper">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <ValidationMessage valid={this.state.bookNumberValid} message={this.state.errorMsg.book_isbn_number} />
                        <label>Book Number</label>
                        <input type="text" value={this.state.book_isbn_number} 
                        onChange={(e) => this.updateBookIsbnNumber(e.target.value)} className="form-control" />
                    </div>
                    <div className="form-group">
                    <ValidationMessage valid={this.state.authorValid} message={this.state.errorMsg.author} />
                        <label>Author</label>
                        <input type="text" value={this.state.author} 
                        onChange={(e) => this.updateAuthor(e.target.value)} className="form-control" />
                    </div>
                    <div className="form-group">
                    <ValidationMessage valid={this.state.titleValid} message={this.state.errorMsg.title} />
                        <label>Title</label>
                        <input type="text" value={this.state.title} 
                        onChange={(e) => this.updateTitle(e.target.value)} className="form-control" />
                    </div>
                    <div className="form-group">
                    <ValidationMessage valid={this.state.subjectValid} message={this.state.errorMsg.book_subject} />
                        <label>Subject</label>
                        <input type="text" value={this.state.book_subject} 
                        onChange={(e) => this.updateSubject(e.target.value)} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Book" className="btn btn-success btn-block" disabled={!this.state.formValid}/>
                    </div>
                </form>
            </div>
        )
    }
}