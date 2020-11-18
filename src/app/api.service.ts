import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "https://api.metricsmanager.co/";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, public authService: AuthenticationService, private router: Router) { }

  //Register new user
  async registerUserAPI(formdata){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/register', {
            firstname: formdata.firstname,
            lastname: formdata.lastname,
            email: formdata.email,
            phone: formdata.phone,
            position: formdata.position,
            linkedinprofile: formdata.linkedinprofile,
            password: formdata.password,
            passwordtwo: formdata.passwordtwo,
            referrercode: formdata.referrercode,
            referrerdetails: formdata.referrerdetails,
            companyname: formdata.companyname,
            companyindustry: formdata.companyindustry,
            companyindustrynew: formdata.companyindustrynew,
            companyaddress: formdata.companyaddress,
            companycity: formdata.companycity,
            companystate: formdata.companystate,
            companycountry: formdata.companycountry,
            companywebsite: formdata.companywebsite,
            companyemail: formdata.companyemail,
            companyphone: formdata.companyphone,
            companyemployeescount: formdata.companyemployeescount,
            companylogo: formdata.companylogo,
            action: 'register'
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'application/x-www-form-urlencoded'
          }
        }).subscribe((response) => {
            console.log(response);
            if(response['status']==="success"){
              //Success
              this.authService.setUserData(response);
              resolve(response['status']); // when you want to return a value in promise
            } else {
              //Fails
              alert(response['message']);
              resolve(response['status']); // when you want to return a value in promise
            }
        },
        error => {
            console.log('Error: ' + error.error);
        });
    });
  }

  //Login user
  async loginUserAPI(formdata){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/login', {
            username: formdata.username,
            password: formdata.password,
            action: 'login'
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            if(response['status']==="success"){
              //Success
              this.authService.setUserData(response);
              resolve(response['status']); // when you want to return a value in promise
            } else {
              //Fails
              alert(response['message']);
              resolve(response['status']); // when you want to return a value in promise
            }
        },
        error => {
            console.log('Error: ' + error.error);
        });
    });
  }

  //Reset user password
  async resetPasswordAPI(formdata){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/forgotpassword', {
            email: formdata.email,
            resetcode: formdata.resetcode,
            action: 'resetpassword'
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            alert(response['message']);
            if(response['status']==="success"){
              //Success
              resolve(response['status']); // when you want to return a value in promise
            } else {
              //Fails
              resolve(response['status']); // when you want to return a value in promise
            }
        },
        error => {
            console.log('Error: ' + error.error);
        });
    });
  }

  //Reset user password change
  async passwordResetChangeAPI(id,code,formdata){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/changeresetpassword', {
            email: id,
            resetcode: code,
            password: formdata.password,
            passwordtwo: formdata.passwordtwo,
            action: 'changepassword'
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            alert(response['message']);
            if(response['status']==="success"){
              //Success
              resolve(response['status']); // when you want to return a value in promise
            } else {
              //Fails
              resolve(response['status']); // when you want to return a value in promise
            }
        },
        error => {
            console.log('Error: ' + error.error);
        });
    });
  }

  //Verify account
  async verifyAccountAPI(id,code){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/verifyaccount', {
            userid: id,
            verificationcode: code,
            action: 'verifyaccount'
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            alert(response['message']);
            if(response['status']==="success"){
              //Success
              resolve(response['status']); // when you want to return a value in promise
            } else {
              //Fails
              resolve(response['status']); // when you want to return a value in promise
            }
        },
        error => {
            console.log('Error: ' + error.error);
        });
    });
  }

  //Logout 
  async logout() {
    this.authService.removeUserData();
  }
  
  //Get User Dashboard Data
  async getUserDashboardData(userData: any){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/dashboarddata', {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  } 
  
  //Get Company Details Data
  async getCompanyDetailsData(userData: any){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/companydetails', {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  } 
  
  //Get User Details Data
  async getUserDetailsData(userData: any){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/accountdetails', {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  } 
  
  //Get User Profile Data
  async getUserProfileData(userData: any,profileid: any){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/profile/'+profileid, {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  } 
  
  //Get User Notifications Data
  async getUserNotificationsData(userData: any){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/notifications', {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  } 
  
  //Get Company Staffs Data
  async getCompanyStaffsData(userData: any,level="all"){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/companystaffs/'+level, {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  } 

  //Get Company Group Members Data
  async getCompanyGroupMembersData(userData: any,level: any,group: any){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/companygroupmembers/'+level+'/'+group, {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  } 
  
  //Get Company Goals Data
  async getCompanyGoalsData(userData: any,type="all"){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'goal/lists/'+type, {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  } 
  
  //Get Company Group Goals Data
  async getCompanyGroupGoalsData(userData: any, groupid, groupidlevel){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'goal/grouplists', {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
            groupname: groupid,
            grouplevel: groupidlevel,
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  } 
  
  //Get Company Staff Goals Data
  async getCompanyStaffGoalsData(userData: any, staffid){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'goal/stafflists/'+staffid, {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  } 

  //Get Company Goal Details Data
  async getCompanyGoalDetailsData(userData: any,id: any){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'goal/single/'+id, {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  } 

  //Get Company Goal Comments Data
  async getCompanyGoalCommentsData(userData: any,id: any){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'goal/comments/'+id, {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  } 

  //Get Add Goal Comment Data
  async addCompanyGoalCommentAPI(userData: any,formdata,postid){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'goal/addcomment', {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
            goalid: postid,
            status: formdata.status,
            score: formdata.score,
            details: formdata.details,
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  } 
  
  //Add Company Staff Data
  async addUserAPI(userData: any,formdata){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/add', {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
            staffid: formdata.staffid,
            firstname: formdata.firstname,
            lastname: formdata.lastname,
            email: formdata.email,
            phone: formdata.phone,
            position: formdata.position,
            level: formdata.level,
            department: formdata.department,
            action: 'add'
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  } 

  //Update User Account Data
  async updateUserAccountAPI(userData: any,formdata){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/accountupdate', {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
            firstname: formdata.firstname,
            lastname: formdata.lastname,
            email: formdata.email,
            phone: formdata.phone,
            position: formdata.position,
            linkedinprofile: formdata.linkedinprofile,
            password: formdata.password,
            passwordtwo: formdata.passwordtwo,
            action: 'update'
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  }   

  //Get Staff Details Data
  async getCompanyStaffDetailsData(userData: any, staffid){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/profile/'+staffid, {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  } 

  //Edit User Staff Data
  async editUserAPI(userData: any,formdata, chosenstaffid){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/edit', {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
            staffid: formdata.staffid,
            firstname: formdata.firstname,
            lastname: formdata.lastname,
            email: formdata.email,
            phone: formdata.phone,
            position: formdata.position,
            level: formdata.level,
            department: formdata.department,
            staffuserid: chosenstaffid,
            action: 'edit'
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  }   

  //Update Company Account Data
  async updateCompanyAccountAPI(userData: any,formdata){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/companyupdate', {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
            companyname: formdata.companyname,
            companyindustry: formdata.companyindustry,
            companyaddress: formdata.companyaddress,
            companycity: formdata.companycity,
            companystate: formdata.companystate,
            companycountry: formdata.companycountry,
            companywebsite: formdata.companywebsite,
            companyemail: formdata.companyemail,
            companyphone: formdata.companyphone,
            companylogo: formdata.companylogo,
            action: 'update'
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  } 
  
  //Add Company Goal Data
  async addCompanyGoalAPI(userData: any,formdata){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'goal/add', {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
            title: formdata.title,
            type: formdata.type,
            level: formdata.level,
            target: formdata.target,
            targetdate: formdata.targetdate,
            targetscore: formdata.targetscore,
            kpi: formdata.kpi,
            details: formdata.details,
            action: 'add'
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  } 
  
  //Add Company Structure Category Data
  async addCompanyStructureAPI(userData: any,formdata){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/addcompanystructure', {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
            title: formdata.title,
            level: formdata.level,
            parentlevel: formdata.parentlevel,
            parentcategory: formdata.parentcategory,
            details: formdata.details,
            action: 'add'
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  } 

  //Edit Company Structure Category Data
  async editCompanyStructureAPI(userData: any,formdata, chosenstructureid: any){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/updatecompanystructure', {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
            title: formdata.title,
            details: formdata.details,
            structureid: chosenstructureid,
            action: 'update'
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  } 
  
  //Get Company Structure Details Data
  async getCompanyStructureDetailsData(userData: any,id: any){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/companystructure/'+id, {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  } 
  
  //Get Company Structures Data
  async getCompanyStructuresData(userData: any){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/companyorganogram', {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  } 
  
  //Get Company Categories Data
  async getCompanyCategoriesData(userData: any,level: any){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/companystructures/'+level, {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  } 
  
  //Get Company Sub Categories Data
  async getCompanySubcategoriesData(userData: any,level: any,category: any){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/companysubstructures/'+level+'/'+category, {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  } 

  //Delete Company Structure Action
  async deleteCompanyStructure(userData: any, itemid){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/removestructure/'+itemid, {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  }   

  //Delete Company Staff Action
  async deleteCompanyStaff(userData: any, itemid){
    return await new Promise((resolve, reject) => {
        this.http.post(apiUrl+'user/removeaccount/'+itemid, {
            companyid: userData.companyid,
            userid: userData.userid,
            username: userData.username,
            userlogintoken: userData.userlogintoken,
        },
        {
          headers:{
            'Accept': 'application/json',
            'content-type':'multipart/form-data'
          }
        }).subscribe((response) => {
            console.log(response);
            resolve(response); // when you want to return a value in promise
        },
        error => {
            console.log('Error: ' + error.error);
            reject('Error: ' + error.error); // when you want to return error message in promise
        });
    });
  }   
}
