import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//user
import CreateUser from './components/IT20125202/user/CreateUser';
import UserProfile from './components/IT20125202/user/UserProfile';
import Home from './components/IT20127046/Home';
import UserLogin from './components/IT20125202/user/UserLogin';
import NavBar from './components/IT20125202/NavBar';
import LandingPage from './components/IT20125202/LandingPage';

//student
import RegisterTopic from './components/IT20125202/topic/RegisterTopic';
import ViewSubmissions from './components/IT20125202/topic/ViewSubmissions';
import GroupChatStudent from './components/IT20127046/user/GroupChat_Student';
import SviewEvaluation from "./components/IT20128036/user/SviewEvaluation";
import SviewSubmitionType from "./components/IT20128036/user/SviewSubmitionType";
import Submitions from './components/IT20128036/user/Submitions';
import ViewSubmitionssp from './components/IT20128036/user/viewSubmitionsp';
import sviewMarks from './components/IT20128036/user/sviewMarks';
import EditSubmition from './components/IT20128036/user/editSubmition';
import { exportPDF } from './components/IT20128036/user/exportPDF';
import StudentViewSpData from "./components/IT20128036/user/StudentViewSpData";

import CreateStudentGroup from "../src/components/IT20131456/user/CreateStudentGroup";
import ViewStudentGroup from "../src/components/IT20131456/user/ViewStudentGroup";
import RequestSupervisor from "./components/IT20131456/user/RequestSupervisor";
import CreateRequest from "./components/IT20131456/user/CreateRequest";
import RequestSummary from "./components/IT20131456/user/RequestSummary";


//admin
import EditUser from './components/IT20125202/user/EditUser';
import UserDetails from './components/IT20125202/user/UserDetails';
import UserRoles from './components/IT20125202/user/UserRoles';
import AdminHome from './components/IT20125202/admin/AdminHome';
import ViewListAdmin from './components/IT20125202/topic/ViewListAdmin';
import AdminLogin from './components/IT20125202/admin/AdminLogin';
import DocumentTemp_Admin from './components/IT20127046/admin/DocumentTemp_Admin';
import DocumentTempCreate from './components/IT20127046/admin/DocumentTempCreate';
import DocumentTempUpdate from './components/IT20127046/admin/DocumentTempUpdate';
import UserRoles_Panel from "./components/IT20125202/user/UserRoles_Panel";
import UserRoles_Students from "./components/IT20125202/user/UserRoles_Students";
import UserRoles_Supervisors from "./components/IT20125202/user/UserRoles_Supervisor";
import AddSubmitionType from "./components/IT20128036/admin/addSubmitionType";
import SubmitionTypeList from "./components/IT20128036/admin/SubmitionTypeList";
import EditSubmitonType from './components/IT20128036/admin/editSubmitionType';

import StudentGroup from "../src/components/IT20131456/admin/StudentGroup";
import ViewStudentGroupAdmin from "../src/components/IT20131456/admin/ViewStudentGroupAdmin";
import EditStudentGroup from "./components/IT20131456/admin/EditStudentGroup";
import CreateSupervisorDetails from "./components/IT20131456/admin/CreateSupervisorDetails";
import EditSupervisorDetails from "./components/IT20131456/admin/EditSupervisorDetails";
import SupervisorDetails from "./components/IT20131456/admin/SupervisorDetails";


//panel
import ViewTopicList from './components/IT20125202/topic/ViewTopicList';
import ViewTopic from './components/IT20125202/topic/ViewTopic';
import UpdateTopic from './components/IT20125202/topic/UpdateTopic';
//import AddEvaluation from "./components/IT20128036/AddEvaluation";
import AddEvaluation from "./components/IT20128036/admin/AddEvaluation";
import EvaluationList from "./components/IT20128036/admin/EvaluationList";
import EditEvaluation from './components/IT20128036/admin/editEvaluation';
import GroupChatAdmin from './components/IT20127046/user/GroupChat_Admin';


//supervisor

import image from './images/cover.jpg'

import CreateMarkingSchem from "./components/IT20127046/admin/CreateMarkingSchem";

import ViewSubmitions from './components/IT20128036/admin/viewSubmitions';
import AddMarks from './components/IT20128036/admin/addMarks';
import viewMarks from './components/IT20128036/admin/viewMarks';
import EditMarks from './components/IT20128036/admin/editMarks';

import ViewMarkingSchem_Admin from "./components/IT20127046/admin/ViewMarkingSchem_Admin";
import ViewMarkingScheme from "./components/IT20127046/user/ViewMarkingScheme";
import ViewDocumentTemplate from "./components/IT20127046/user/ViewDocumentTemplate";
import DisplayMarkingScheme from "./components/IT20127046/user/DisplayMarkingScheme";
import ContactUs from "./components/IT20127046/user/ContactUs";
import AboutUs from "./components/IT20127046/user/AboutUs";

import CreateResponse from "./components/IT20131456/user/CreateResponse";
import ViewNotice_Admin from "./components/IT20127046/admin/ViewNotice_Admin";
import AddNotice from "./components/IT20127046/admin/AddNotice";



export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>

          <Switch>

            {/* <div className='jumbotron' style={{ paddingLeft: '50px', paddingRight: '50px', paddingTop: '10px', background: 'white', height: '1000px' }}>  */}
            {/* <div className='container' style={{ background: 'white', height: '800px' }}> */}
            {/* ---------------Admin--------------- */}
            <Route path="/admin/home" exact component={AdminHome}></Route>
            <Route path='/admin/edituser/:id' exact component={EditUser}></Route>
            <Route path='/admin/user/:id' exact component={UserDetails}></Route>
            <Route path='/admin/users' exact component={UserRoles}></Route>
            <Route path='/admin/topiclist' exact component={ViewListAdmin}></Route>
            <Route path='/admin/login' exact component={AdminLogin}></Route>
            <Route path='/admin/panelmembers' exact component={UserRoles_Panel}></Route>
            <Route path='/admin/students' exact component={UserRoles_Students}></Route>
            <Route path='/admin/supervisors' exact component={UserRoles_Supervisors}></Route>

            <Route path="/add/marking" exact component={CreateMarkingSchem}></Route>
            <Route path="/view/marking" exact component={ViewMarkingSchem_Admin}></Route>
            <Route path="/documentTemp" exact component={DocumentTemp_Admin}></Route>
            <Route path="/add/documentTemp" exact component={DocumentTempCreate}></Route>
            <Route path="/edit/documentTemp/:id" exact component={DocumentTempUpdate}></Route>
            <Route path="/view/notice" exact component={ViewNotice_Admin}></Route>
            <Route path="/add/notice" exact component={AddNotice}></Route>

            <Route path="/student/groups/view" exact  component={StudentGroup}></Route>
            <Route path="/student/group/view/admin/:id" component={ViewStudentGroupAdmin}></Route>
            <Route path="/student/group/update/:id" component={EditStudentGroup}></Route>
                
            <Route path="/supervisor/add" component={CreateSupervisorDetails}></Route>
            <Route path="/supervisor/view" component={SupervisorDetails}></Route>
            <Route path="/supervisor/update/:id" component={EditSupervisorDetails}></Route>
           


                 {/*IT20128036*/}
                 <Route path="/submitiontype/add" component={AddSubmitionType} />
                <Route path="/submitiontypelist" component={SubmitionTypeList} />
                <Route path="/submitiontype/edit/:id" component={EditSubmitonType} />




            {/* </div> */}
            {/* </div> */}

            <div className='jumbotron' style={{ paddingLeft: '50px', paddingRight: '50px', paddingBottom: '50px', paddingTop: '10px', backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', margin: '0px 0px 0px 0px', overflowY: 'scroll', height: '100vh' }}>
              <div className='container' style={{ background: 'white', minHeight: '100vh', padding: '0px 0px 10px 0px'}}>
                <NavBar />
                {/* ---------------User--------------- */}
                {/* IT20125202 */}
                <Route path="/" exact component={LandingPage}></Route>
                <Route path="/user/login" exact component={UserLogin}></Route>
                <Route path='/user/profile' exact component={UserProfile}></Route>
                <Route path='/user/registration' exact component={CreateUser}></Route>

                {/* IT20127046 */}
                <Route path="/home" exact component={Home}></Route>

                <Route path="/chatAppStudent" exact component={GroupChatStudent}></Route>
                <Route path="/chatAppAdmin" exact component={GroupChatAdmin}></Route>
                <Route path="/user/view/marking" exact component={ViewMarkingScheme}></Route>
                <Route path="/user/view/documentTemplate" exact component={ViewDocumentTemplate}></Route>
                <Route path="/user/display/marking/:id" exact component={DisplayMarkingScheme}></Route>
                <Route path="/user/contactus" exact component={ContactUs}></Route>
                <Route path="/user/aboutus" exact component={AboutUs}></Route>


                {/* ---------------Student--------------- */}
                {/* IT20125202 */}
                <Route path='/student/topic/registration' exact component={RegisterTopic}></Route>
                <Route path='/student/topics' exact component={ViewSubmissions}></Route>


                {/*IT20128036*/}


                <Route path="/student/evaluation/view" component={SviewEvaluation}/>
                <Route path="/student/submitiontype/view" component={SviewSubmitionType}/>
                <Route path="/student/submition/add" component={Submitions}/>
                <Route path="/student/submitionsp/view" component={ViewSubmitionssp}/>
                <Route path="/student/marks/view" component={sviewMarks}/>
                <Route path="/student/submition/edit/:id" component={EditSubmition}/>
                <Route path="/student/pdf/export" component={exportPDF}/>
                <Route path="/student/group/evaluation/view" component={StudentViewSpData}/>

                  {/* IT20131456 */}
                <Route path="/student/group/add" component={CreateStudentGroup}></Route>                
                <Route path="/student/group/view" component={ViewStudentGroup}></Route>
                <Route path="/supervisor/request" component={RequestSupervisor}></Route>
                <Route path="/create/request" component={CreateRequest}></Route>
                <Route path="/request/summary" component={RequestSummary}></Route>
          
                {/* ---------------Supervisor--------------- */}

                {/*IT20128036*/}
                <Route path="/submitions/view" component={ViewSubmitions} />
                <Route path="/marks/add/:id" component={AddMarks} />
                <Route path="/marks/view" component={viewMarks} />
                <Route path="/marks/edit/:id" component={EditMarks} />


                {/*IT20131456*/}
                <Route path="/create/feedback" component={CreateResponse}></Route>

                 


                {/* ---------------Panel member--------------- */}
                {/* IT20125202 */}
                <Route path='/panel/topic/list' exact component={ViewTopicList}></Route>
                <Route path='/panel/topic/details/:id' exact component={ViewTopic}></Route>
                <Route path='/panel/topic/update/:id' exact component={UpdateTopic}></Route>

                {/*IT20128036*/}
                <Route path="/evaluation/add" component={AddEvaluation} />
                <Route path="/evaluation/view" component={EvaluationList} />
                <Route path="/evaluation/edit/:id" component={EditEvaluation} />             

                {/* ---------------Student--------------- */}
                

                {/* ---------------Admin--------------- */}
                
                



              </div>              
            </div>            
          </Switch>
        </div >
      </BrowserRouter >

    )
  }

}




