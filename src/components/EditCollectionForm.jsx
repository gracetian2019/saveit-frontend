import React, {Component, Fragment} from 'react';

class EditCollectionForm extends Component{
    state = {
        id: this.props.currentEditItem.id,
        name: this.props.currentEditItem.name,
        category: this.props.currentEditItem.category,
        description: this.props.currentEditItem.description,
        source: this.props.currentEditItem.source,
        user_id:0
      }

      changeHandler = evt =>{
        console.log(evt.target)
        //debugger
      const target = evt.target;
      const value = target.value;
      const name = target.name;
  
        this.setState({
          [name]: value,
          user_id: this.props.userId
        });
    }
    submitHandler = evt => {
        evt.preventDefault()
        console.log(evt.target)
        fetch(`http://localhost:3000/api/v1/collections/${this.state.id}`, {method: "PATCH",
            headers: {
             'Accept': "application/json",
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
          })
          .then(res => res.json())
          .then(editCollection => {
              console.log(editCollection)
              this.props.editCollectionState(editCollection)
            this.setState({
                name: "",
                category: "",
                description: "",
                source: "",
                user_id: 0
            });
          })
      }

    render(){
        return(
            <Fragment>
           <form className="ui form" onSubmit={this.submitHandler} >
              <div className="inline fields">
                <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.changeHandler} />
                <input type="text" name="category" placeholder="Category"  value={this.state.category} onChange={this.changeHandler}/>
                <input type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.changeHandler} />
                <input type="text" name="source" placeholder="SourceUrl" value={this.state.source} onChange={this.changeHandler}/>
              </div>
              <button className="ui olive basic button" type="submit">
               Update Collection
              </button>
            </form>
          </Fragment> 
        )
    }
}

export default EditCollectionForm;