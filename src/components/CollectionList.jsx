import React from 'react';
import CollectionCard from './CollectionCard';

const CollectionList = (props) => {
    //debugger
 console.log("List", props)
 
        return(
            <table className="ui olive celled striped padded table">
            <tbody>
              <tr>
                <th>
                  <h3 className="ui center aligned header">Name</h3>
                </th>
                <th>
                  <h3 className="ui center aligned header">Category</h3>
                </th>
                <th>
                  <h3 className="ui center aligned header">Description</h3>
                </th>
                <th>
                  <h3 className="ui center aligned header">Source Link</h3>
                </th>
                <th>
                  <h3 className="ui center aligned header">Action</h3>
                </th>
              </tr>
              {
              props.collections.map(collection => <CollectionCard key={collection.id} collection={collection} deleteCollection={props.deleteCollection} openEditForm={props.openEditForm}/>)
              }
            </tbody>
          </table>
        )
}

export default CollectionList;