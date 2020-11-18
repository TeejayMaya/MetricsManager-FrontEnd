import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {
  public userData: any;
  public username: string;
  public type: any;
  public goalsData: any;
  public categoriesData: any;
  public subcategoriesData: any;
  public balancedscorecard:boolean=false;
  public viewgoals:boolean=false;
  public creategoal:boolean=false;
  public formloading: boolean;
  public isPageDataLoaded:boolean=false;
  public totalWeight: any;
  public totalScore: any;

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
    this.type=this.activatedRoute.snapshot.paramMap.get('type');
    if(this.type=="create"){
      this.creategoal=true;
    } else if(this.type=="balancedscorecard"){
      this.balancedscorecard=true;
      this.getCompanyGoalsRecordData('all');
    } else {
      this.viewgoals=true;
      this.getCompanyGoalsRecordData(this.type);
    }
  }
  
  getCategoriesRecordData(level: any){
    this.apiService.getCompanyCategoriesData(this.userData,level).then(response => {
      this.categoriesData = response;
    }).catch(err => { console.log(err); });
  }
  
  getSubcategoriesRecordData(level: any,category: any){
    this.apiService.getCompanySubcategoriesData(this.userData,level,category).then(response => {
      this.subcategoriesData = response;
    }).catch(err => { console.log(err); });
  }
  
  getCompanyGoalsRecordData(type: any){
    this.apiService.getCompanyGoalsData(this.userData,this.type).then(response => {
      this.goalsData = response;
      //Calculate Total Weight and Total Score
      
    }).catch(err => { console.log(err); });
  }

  async addgoal(form){
    this.formloading = true;
    this.apiService.addCompanyGoalAPI(this.userData,form.value).then(response => {
      this.formloading = false;
      alert(response['message']);
    }).catch(err => { console.log(err); this.formloading = false; });
  }

}
