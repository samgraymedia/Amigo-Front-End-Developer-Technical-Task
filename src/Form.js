import React from "react";

export default class Form extends React.Component {
  state = {
    name: "",
    nameError: "",
    email: "",
    emailError: "",
    issue: "",
    issueError: "",
    type: "",
    typeError: "",
    customer: "",
    customerError: "",
    postSuccess: ""
  };

  change = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });

  };
  validate = () => {
    let isError = false;
    const errors = {
      nameError: "",
      emailError: "",
      issueError: "",
      typeError: "",
      customerError: ""
    };
    if(this.state.name.length < 3){
      isError = true;
      errors.nameError = "Name needs to be at least 3 letters long";
    }
    if(this.state.email.indexOf('@')===-1){
      isError = true;
      errors.emailError = "Please use correct email syntax";
    }
    if(this.state.customer.length < 1){
      isError = true;
      errors.customerError = "Please select if you're a current or new customer";
    }
    if(this.state.issue.length < 1){
      isError = true;
      errors.issueError = "Please tell us your issue";
    }
      this.setState({
        ...this.state,
        ...errors
      })
    return isError;
  }

  onSubmit = e => {
    e.preventDefault();
      this.setState({
      nameError: "",
      emailError: "",
      issueError: "",
      typeError: "",
      customerError: ""
  });
    // this.props.onSubmit(this.state);
    const err = this.validate();
    if(!err){
    //clear form
    this.setState({
      name: "",
      nameError: "",
      email: "",
      emailError: "",
      issue: "",
      issueError: "",
      type: "",
      typeError: "",
      customer: "",
      customerError: "",
      postSuccess: "Post Submitted"
    });
    this.props.onChange({
      name: "",
      type: "",
      issue: "",
      email: "",
      customer: ""
    });
  }
  };

  render() {
    if (this.state.postSuccess === "Post Submitted") {
      return(
        <div className="wrap success">
        <img className="blueMen" src="css/media/two-blue-men.png" alt=""/>
        <div className="grid-wrap">
        <h1 className="col col-1">{this.state.postSuccess}</h1>
        <a href="https://www.amigoloans.co.uk/" className="col col-1">Return Home</a>
        </div>
        </div>
      )
    }
    return (
      <div className="wrap">
        <img className="blueMan" src="css/media/blue-man-question.png" alt=""/>
        <h1>Amigo Loans</h1>
        <h2>Submit a bug!</h2>
        <form className="grid-wrap">
        <input required className="col col-2" type="text" name="name" autoComplete='name' placeholder="Your Name" value={this.state.name} onChange={e => this.change(e)} errorText={this.state.nameError} />



        <input required className="col col-2" type="email" name="email" autoComplete='email' placeholder="Your Email" value={this.state.email} onChange={e => this.change(e)} errorText={this.state.emailError}/>
        <select required className="col col-2" name="type" onChange={e => this.change(e)} value={this.state.value} errorText={this.state.typeError}>

          <option value="General">General</option>
          <option value="Applying for a loan">Applying for a loan</option>
          <option value="Accessing my account">Accessing my account</option>
          <option value="Making a payment">Making a payment</option>

        </select>
        <div className="col col-2 radios">
          <div>
            <input required type="radio" name="customer" onChange={e => this.change(e)} value="existing customer" errorText={this.state.customerError} />
            <label>existing customer</label>
        </div>
        <div>
          <input required type="radio" name="customer" onChange={e => this.change(e)} value="new customer" errorText={this.state.customerError}/>
          <label>new customer</label>
        </div>

        </div>


        <textarea required className="col col-1" name="issue" rows="8" cols="80" value={this.state.issue}
        onChange={e => this.change(e)} errorText={this.state.issueError} ></textarea>

        <button className="col col-1" type="submit" onClick={e => this.onSubmit(e)}>Submit</button>
        <div className="col col-1 error">
          <p>{this.state.nameError}</p>
          <p>{this.state.emailError}</p>
          <p>{this.state.typeError}</p>
          <p>{this.state.customerError}</p>
          <p>{this.state.issueError}</p>
        </div>
      </form>
      </div>
    );
  }
}
