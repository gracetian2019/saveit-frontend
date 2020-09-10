import React, { Component, Fragment } from "react";


class CollectionCard extends Component {

   
    render(){
    const {id, name, category, description, source} = this.props.collection
    
  return (
      <Fragment>
    <tr>
      <td>{name}</td>
      <td>{category}</td>
      <td>{description}</td>
      <td>Link to<a href={source}><i className="linkify icon"></i>{name}</a></td>
      <td><button className="ui inverted brown button" onClick={() => this.props.openEditForm(this.props.collection)}><i className="edit outline icon"></i></button></td>
      <td><button className="ui inverted red button" onClick={() => this.props.deleteCollection(id)}><i className="trash alternate outline icon"></i></button></td>
    </tr>
    </Fragment>
  );
}
};

export default CollectionCard;