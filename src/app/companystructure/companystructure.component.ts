import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-companystructure',
  templateUrl: './companystructure.component.html',
  styleUrls: ['./companystructure.component.css']
})
export class CompanystructureComponent implements OnInit {
  public userData: any;
  public username: string;
  public type: any;
  public companyData: any;
  public companyStructuresData: any;
  public categoriesData: any;
  public subcategoriesData: any;
  public corporatestructure:boolean=false;
  public otherstructure:boolean=false;
  public createstructure:boolean=false;
  public sortedCategoryList: Array<Object> = [];
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
    this.getCompanyDetailsRecordData(this.userData); //Get company details
    this.type=this.activatedRoute.snapshot.paramMap.get('type');
    if(this.type=="corporate"){
      this.corporatestructure=true;
      this.getCompanyStructures();
    } else if(this.type=="create"){
      this.createstructure=true;
    } else {
      this.otherstructure=true;
      this.getCategoriesRecordData(this.type);
    }
  }
  
  getCompanyDetailsRecordData(userInfo: any){
    this.apiService.getCompanyDetailsData(userInfo).then(response => {
      this.companyData = response;
    }).catch(err => { console.log(err); });
  }
  
  getCompanyStructures(){
    this.apiService.getCompanyStructuresData(this.userData).then(response => {
      this.companyStructuresData = response;
      this.doneLoadingFromServer();
    }).catch(err => { console.log(err); this.doneLoadingFromServer(); });
  }
  
  getCategoriesRecordData(level: any){
    /**if(this.sortedCategoryList.indexOf(level+''+category) > -1){
      return;
    } else {
      this.sortedCategoryList.push(level+''+category);
    }**/
    this.apiService.getCompanyCategoriesData(this.userData,level).then(response => {
      this.categoriesData = response;
      //this.getStructureCategoryMembersRecordData();
    }).catch(err => { console.log(err); });
  }
  
  getSubcategoriesRecordData(level: any,category: any){
    this.apiService.getCompanySubcategoriesData(this.userData,level,category).then(response => {
      this.subcategoriesData = response;
    }).catch(err => { console.log(err); });
  }

  async addstructure(form){
    this.formloading = true;
    this.apiService.addCompanyStructureAPI(this.userData,form.value).then(response => {
      this.formloading = false;
      alert(response['message']);
    }).catch(err => { console.log(err); this.formloading = false; });
  }

  doneLoadingFromServer(){
    this.isPageDataLoaded = true;
  }
}
