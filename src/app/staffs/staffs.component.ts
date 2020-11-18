import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.css']
})
export class StaffsComponent implements OnInit {
  public userData: any;
  public username: string;
  public staffsData: any;
  public categoriesData: any;
  public subcategoriesData: any;
  public formloading: boolean;
  public isPageDataLoaded:boolean=false;

  constructor(private apiService: ApiService, public authService: AuthenticationService, private activatedRoute: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    //Check if User is logged in
    await this.authService.userLoginCheck().then(response => {
      if(response===false){
        this.router.navigate(['/login'], {replaceUrl: true});
      }
    }).catch(err => { console.log(err); });
    //Get User Data
    await this.authService.getUserData().then(response => {
      this.userData = response;
      //this.username = response['username'];
    }).catch(err => { console.log(err); });
    //Get User Page Data
    this.getUserCompanyStaffsRecordData(this.userData); 
  }

  ngDoCheck() {
    //const id = +this.activatedRoute.snapshot.paramMap.get('id');
  }
  
  getUserCompanyStaffsRecordData(userInfo: any){
    this.apiService.getCompanyStaffsData(userInfo).then(response => {
      this.staffsData = response;
      this.doneLoadingFromServer();
    }).catch(err => { console.log(err); this.doneLoadingFromServer(); });
  }

  async addstaff(form){
    this.formloading = true;
    this.apiService.addUserAPI(this.userData,form.value).then(response => {
      this.formloading = false;
      alert(response['message']);
    }).catch(err => { console.log(err); this.formloading = false; });
  }
  
  getCompanyCategoriesRecordData(level: any){
    this.apiService.getCompanyCategoriesData(this.userData,level).then(response => {
      this.categoriesData = response;
    }).catch(err => { console.log(err); });
  }
  
  getCompanySubcategoriesRecordData(level: any,category: any){
    this.apiService.getCompanySubcategoriesData(this.userData,level,category).then(response => {
      this.subcategoriesData = response;
    }).catch(err => { console.log(err); });
  }

  doneLoadingFromServer(){
    this.isPageDataLoaded = true;
  }

}
