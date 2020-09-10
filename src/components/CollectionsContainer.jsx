import React, {Component} from 'react';
import CollectionList from './CollectionList';
import Search from "./Search";
import AddCollectionForm from './AddCollectionForm';
import EditCollectionForm from './EditCollectionForm';



class CollectionsContainer extends Component {
    state = {
        collections: [],
        searchItem: "",
        open: false,
        currentEditItem: {}
    }

    openEditForm=(evt)=>{
        console.log(evt)
        this.setState({
           open: true,
           currentEditItem: evt
        })
    }
  
    componentDidMount(){
        fetch("http://localhost:3000/api/v1/collections/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState(
                {collections: data.filter((data) => 
                    {
              return  data.user.id ===  this.props.user.id
                })}
            )})
    }

   

    changeSearchItem = typedItem => {
        this.setState({
          searchItem: typedItem
        })
        }


    newCollectionState = newCollection =>{
        const updatedCollection = [...this.state.collections, newCollection] 
        this.setState({collections: updatedCollection})
    }

    editCollectionState = editCollection =>{
        const collections = this.state.collections.filter(collection => collection.id !== editCollection.id)
        collections.push(editCollection)
        this.setState({   
           collections
       })
     }

    deleteCollection = (id) => {
        const deleteConfig = {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          }
        }
        fetch(`http://localhost:3000/api/v1/collections/${id}`, deleteConfig)
        .then(_ => {
          this.setState(prevState => {
              return {
                collections: prevState.collections.filter(collection => collection.id !== id)
              }
            })
          }).catch(err => console.log(err));
    }
  

   

    render(){
        console.log(this.state.collections)
        let filteredCollections = this.state.collections.filter((collectionFilter)=>{
            return collectionFilter.description.toLowerCase().includes(this.state.searchItem.toLowerCase())
          })

        let {username} = this.props.user
        return(
            <div>
                <h2 className="title">{username} Collections</h2>
                <AddCollectionForm newCollectionState={this.newCollectionState} userId={this.props.user.id}/>
                {this.state.open && <EditCollectionForm currentEditItem={this.state.currentEditItem} editCollectionState={this.editCollectionState}/> }
                <Search searchItem={this.state.searchItem} changeSearchItem={this.changeSearchItem}/>
                <CollectionList  collections = {filteredCollections} deleteCollection = {this.deleteCollection} openEditForm = {this.openEditForm} />
                
            </div>
        );
    }
  
}

export default CollectionsContainer;