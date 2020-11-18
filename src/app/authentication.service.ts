import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, SESSION_STORAGE, StorageService, isStorageAvailable } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  //Check user login status
  async userLoginCheck(){
    //const sessionStorageAvailable = isStorageAvailable(sessionStorage);
    //console.log(`Session storage available: ${sessionStorageAvailable}`);
    return await new Promise((resolve, reject) => {
      const userID: number = this.storage.get('userid') || null;
      if(userID){
        //Login confirmed
        console.log("User login true");
        resolve(true); // when you want to return a value in promise
      } else {
        console.log("User login false");
        resolve(false); // when you want to return a value in promise
      }
    });
  }
  
  //Set user data
  async setUserData(data){
        await this.storage.set('companyid', data.companyid); // set a key/value
        await this.storage.set('userid', data.userid); // set a key/value
        await this.storage.set('username', data.username); // set a key/value
        await this.storage.set('userlogintoken', data.logintoken); // set a key/value
        await this.storage.set('userimage', data.userimage); // set a key/value
        await this.storage.set('lastlogindate', data.lastlogindate); // set a key/value
        return true;
  }

  //Get user data
  async getUserData(){
    return await new Promise((resolve, reject) => {
        Promise.all([this.storage.get("companyid"), this.storage.get("userid"), this.storage.get("username"), this.storage.get("userlogintoken"), this.storage.get("userimage"), this.storage.get("lastlogindate")]).then(values => {
            let userData= {
              companyid: values[0],
              userid: values[1],
              username: values[2],
              userlogintoken: values[3],
              userimage: values[4],
              lastlogindate: values[5]
            };
            resolve(userData); // when you want to return a value in promise
        });
    });
  }

  //Get user data
  async removeUserData(){
    await this.storage.remove('companyid'); 
    await this.storage.remove('userid'); 
    await this.storage.remove('username'); 
    await this.storage.remove('userlogintoken'); 
    await this.storage.remove('userimage'); 
    await this.storage.remove('lastlogindate'); 
    console.log('All User keys cleared');
  }
}
