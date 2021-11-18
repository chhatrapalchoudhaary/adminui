import {Component} from 'react'
import Loader from 'react-loader-spinner'
import apiLoadStatus from '../../constants/apiLoadStatus'
import UserList from '../UserList'
import Pagination from '../Pagination'
import './index.css'

class AdminPanel extends Component{

    state={
        currentPage: 1,
        usersPerPage:10,
        apiFetchStatus: apiLoadStatus.initial,
        usersList:[],
        isEditClicked:false,
        searchValue:'',
        searchedList:[],
        selectedData:[]
        

    }   

    componentDidMount(){
        this.fetchUsersList()
    }

    fetchUsersList=async()=>{
        const apiUrl='https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        const options={
            method:'GET'
        }
        const response= await fetch(apiUrl,options)
        if(response.ok){
            const data = await response.json()
            const dataConverted = JSON.stringify(data)
            localStorage.setItem("userlist",dataConverted)
            const dataFromLocalStorage = JSON.parse(localStorage.getItem("userlist"))
            console.log(dataFromLocalStorage)
            this.setState({usersList:dataFromLocalStorage})
        }
        
    }

    onEditButtonClicked=()=>{

    }

    onDeleteButtonClicked=(id)=>{
        const {usersList} = this.state
        const filteredData = usersList.filter((eachDeleted)=>(eachDeleted.id !== id))
        localStorage.setItem('userlist',JSON.stringify(filteredData))
        this.setState({usersList:filteredData})

    }

    renderFailureView=()=>(
        <div className="failure-container">
            <h1 className="failure-alert">Something went wrong, Please try again</h1>
            <button type="button" className="retry-button" onClick={this.fetchUsersList}>Retry</button>
        </div>
    )


    renderLoadingView = () => (
        <div className="loader-container">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )

    paginate = pageNumber => this.setState({currentPage:pageNumber});

    showAllSearchList = () => {
        const {searchValue,usersList}= this.state
        const searchResult = usersList.filter(item=>{ 
                  return Object.keys(item).some((key) =>
                  item[key].toLowerCase().includes(searchValue)
                );
              });
        console.log("search Value")
        console.log(searchValue)
        console.log(searchResult)
        this.setState({searchedList:searchResult})
    }

    whenCheckBoxSelected=(id)=>{
        const {usersList} = this.state
        this.setState({
            selectedData: usersList.map(
            li => (li.id === id ? { ...li,
                value: !li.value
            } : li)
            )
        });
    }
    

    handleClick = () => {
        const {usersList} = this.state
        this.setState(prevState => {
          return {
            usersList: usersList.filter((eachDeleted)=>(eachDeleted.id !== id))
          };
        });
      };
    
    
    performSearch=(event)=>{
        this.setState({searchValue:event.target.value})
        this.showAllSearchList()
    }

    renderSuccessView = ()=> {
        
        const {usersList,usersPerPage,currentPage,searchValue,searchedList,selectedData} = this.state
        console.log(selectedData)
        // Get current posts
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        const currentPosts = usersList.slice(indexOfFirstUser, indexOfLastUser);
        const showSearchPost = searchedList.slice(indexOfFirstUser, indexOfLastUser);

        const list = searchedList.length>0&& searchValue.length>0?showSearchPost:currentPosts
        
        return (
            <div>
                <ul className="admin-table-rows">
                    <li className="list-rows">
                        <div className="row-containers">
                        <input type="checkbox" className="all-check-checkbox"/>
                        </div>
                        <div className="row-containers">
                            <h3 className="table-text-bold">Name</h3>
                        </div>
                        <div className="row-containers">
                            <h3 className="table-text-bold">Email</h3>
                        </div>
                        <div className="row-containers">
                            <h3 className="table-text-bold">Role</h3>
                        </div>
                        <div className="row-containers">
                            <h3 className="table-text-bold">Actions</h3>
                        </div>
                    </li>
                </ul>
                <ul className="admin-table-rows">
                    {
                        list.map((eachUser)=>(
                            <UserList key={eachUser.id} data={eachUser} onDeleteButtonClicked={this.onDeleteButtonClicked} whenCheckBoxSelected={this.whenCheckBoxSelected}/>
                        ))
                    }
                </ul>
                <button type="button" onClick={this.handleClick}>Delete</button>
                <Pagination
                    usersPerPage={usersPerPage}
                    totalUsers={usersList.length}
                    paginate={this.paginate}
                    currentPage={currentPage}
                    
                />
            </div>
            )
        }


    renderApiStatus = () => {
        const {apiFetchStatus} = this.state
        switch (apiFetchStatus) {
          case apiLoadStatus.success:
            return this.renderSuccessView()
          case apiLoadStatus.failure:
            return this.renderFailureView()
          case apiLoadStatus.inProgress:
            return this.renderLoadingView()
          default:
            return null
        }
      }

    render(){
        return(
            <div className="main-container">
                <div className="container">
                    <div>
                        <input type="text" className="search-bar" placeholder="Search by name, email or role." onChange={this.performSearch} />
                        
                    </div>
                    {this.renderApiStatus()}
                </div>
            </div>
        )
    }
}

export default AdminPanel