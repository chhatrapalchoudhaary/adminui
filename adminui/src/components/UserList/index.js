import './index.css'

const UserList = (props) => {
    const {data,onDeleteButtonClicked,whenCheckBoxSelected} = props
    const {id,name,email,role} = data

    const onEdit=()=>{

    }

    const onDelete=()=>{
        onDeleteButtonClicked(id)
    }

    const selectListItems = ()=>{
        whenCheckBoxSelected(id);
    }

    return(
        <li className="list-rows">
            <div className="row-containers">
            <input type="checkbox" className="all-check-checkbox" onSelect={selectListItems}/>
            </div>
            <div className="row-containers">
                <h3 className="table-text">{name}</h3>
            </div>
            <div className="row-containers">
                <h3 className="table-text">{email}</h3>
            </div>
            <div className="row-containers">
                <h3 className="table-text">{role}</h3>
            </div>
            <div className="row-containers action-format">
                <button type="edit" className="action-button" onClick={onEdit}>edit</button>
                <button type="delete" className="action-button" onClick={onDelete}>delete</button>
            </div>
        </li>
    )
}

export default UserList