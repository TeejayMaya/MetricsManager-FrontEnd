import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  public userData: any;
  public username: string;
  public id: any;
  public staffData: any;
  public goalsData: any;
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
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
    this.getCompanyStaffDetails(); //Get company details
    this.getCompanyStaffGoalsRecordData(this.id);
  }
  
  getCompanyStaffDetails(){
    this.apiService.getCompanyStaffDetailsData(this.userData,this.id).then(response => {
      this.staffData = response;
    }).catch(err => { console.log(err); });
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
  
  getCompanyStaffGoalsRecordData(staffid){
    this.apiService.getCompanyStaffGoalsData(this.userData,staffid).then(response => {
      this.goalsData = response;
    }).catch(err => { console.log(err); });
  }

  async editstaff(form){
    this.formloading = true;
    this.apiService.editUserAPI(this.userData,form.value,this.id).then(response => {
      this.formloading = false;
      alert(response['message']);
    }).catch(err => { console.log(err); this.formloading = false; });
  }

  async deleteItem(itemID){
    this.apiService.deleteCompanyStaff(this.userData,itemID).then(response => {
      alert(response['message']);
    }).catch(err => { console.log(err); });
  }
}
