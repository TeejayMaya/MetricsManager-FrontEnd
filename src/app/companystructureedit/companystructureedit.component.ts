import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-companystructureedit',
  templateUrl: './companystructureedit.component.html',
  styleUrls: ['./companystructureedit.component.css']
})
export class CompanystructureeditComponent implements OnInit {
  public userData: any;
  public username: string;
  public id: any;
  public title: any;
  public details: any;
  public level: any;
  public companyStructureData: any;
  public membersData: any;
  public goalsData: any;
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
    this.getCompanyStructuresDetails(); //Get company details
  }
  
  getCompanyStructuresDetails(){
    this.apiService.getCompanyStructureDetailsData(this.userData,this.id).then(response => {
      this.companyStructureData = response;
      this.title = response['title'];
      this.level = response['level'];
      this.details = response['details'];
      this.getStructureCategoryMembersRecordData();
      this.getCompanyGroupGoalsRecordData(this.title,this.level);
    }).catch(err => { console.log(err); });
  }
  
  getStructureCategoryMembersRecordData(){
    this.apiService.getCompanyGroupMembersData(this.userData,this.level,this.title).then(response => {
      this.membersData = response;
    }).catch(err => { console.log(err); });
  }
  
  getCompanyGroupGoalsRecordData(groupid,grouplevel){
    this.apiService.getCompanyGroupGoalsData(this.userData,groupid,grouplevel).then(response => {
      this.goalsData = response;
    }).catch(err => { console.log(err); });
  }

  async editstructure(form){
    this.formloading = true;
    this.apiService.editCompanyStructureAPI(this.userData,form.value,this.id).then(response => {
      this.formloading = false;
      alert(response['message']);
    }).catch(err => { console.log(err); this.formloading = false; });
  }

  async deleteItem(itemID){
    this.apiService.deleteCompanyStructure(this.userData,itemID).then(response => {
      alert(response['message']);
    }).catch(err => { console.log(err); });
  }
}
