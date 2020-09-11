import React, {Component} from 'react';


class AddCollectionForm extends Component{
    state = {
        name: "",
        category: "",
        description: "",
        source: "",
        user_id:0
      }

      handleChange = evt =>{
          console.log(evt.target)
          //debugger
        const target = evt.target;
        const value = target.value;
        const name = target.name;
    
          this.setState({
            [name]: value,
            user_id: this.props.userId,
          });
      }

      handleSubmit = evt => {
        evt.preventDefault()
        //console.log(evt.target)
        //console.log(this.props.token)

        fetch("http://localhost:3000/api/v1/collections", {method: "POST",
            headers: {
             'Accept': "application/json",
            'Content-Type': 'application/json',
            'Authorization': `bearer ${this.props.token}`
            },
            body: JSON.stringify(this.state)
          })
          .then(res => res.json())
          .then(newCollection => {
              console.log(newCollection)
            this.props.newCollectionState(newCollection)
            this.setState({
                name: "",
                category: "",
                description: "",
                source: "",
                user_id: ""
            });
          })
      }

    render(){
        console.log("Form", this.props)
        return(
            <div className="ui segment">
            <form className="ui form" onSubmit={this.handleSubmit} >
              <div className="inline fields">
                <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                <input type="text" name="category" placeholder="Category" value={this.state.category} onChange={this.handleChange} />
                <input type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleChange} />
                <input type="text" name="source" placeholder="SourceUrl" value={this.state.source} onChange={this.handleChange}/>
              </div>
              <button className="newform-btn" type="submit">
              Add New Collection
              </button>
            </form>
          </div> 
        );
    }
}
export default AddCollectionForm;
