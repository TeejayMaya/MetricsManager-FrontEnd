import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {
  public userData: any;
  public username: string;
  public id: any;
  public goalData: any;
  public goalCommentsData: any;
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
    this.getCompanyGoalDetailsRecordData(this.id);
    this.getCompanyGoalCommentsRecordData(this.id);
  }

  getCompanyGoalDetailsRecordData(userInfo: any){
    this.apiService.getCompanyGoalDetailsData(this.userData,this.id).then(response => {
      this.goalData = response;
    }).catch(err => { console.log(err); });
  }

  getCompanyGoalCommentsRecordData(id: any){
    this.apiService.getCompanyGoalCommentsData(this.userData,this.id).then(response => {
      this.goalCommentsData = response;
    }).catch(err => { console.log(err); });
  }

  async addgoalcomment(form){
    this.formloading = true;
    this.apiService.addCompanyGoalCommentAPI(this.userData,form.value,this.id).then(response => {
      this.formloading = false;
      alert(response['message']);
    }).catch(err => { console.log(err); this.formloading = false; });
  }
}