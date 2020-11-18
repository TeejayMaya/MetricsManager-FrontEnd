import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() mycompanyname:any;
  formloading: boolean = false;
  public companyName: any;
  currentstage: number = 1;
  stageone: any = "block";
  stagetwo: any = "none";
  stagethree: any = "none";
  newindustry: boolean = false;
  numberofdivisions: number = 1;

  constructor(private apiService: ApiService, public authService: AuthenticationService, private router: Router) { }

  async ngOnInit() {
    //Check if User is logged in
    await this.authService.userLoginCheck().then(response => {
      if(response===true){
        this.router.navigate(['/overview'], {replaceUrl: true});
      }
    }).catch(err => { console.log(err); });
  }  

  async setCompanyName(chosencompanyname){
    this.companyName=chosencompanyname;
  }

  async checkIndustryEntry(chosencompanyindustry){
    if(chosencompanyindustry==="Others"){
      this.newindustry=true;
    } else {
      this.newindustry=false;
    }
  }

  async changeStage(stagenum=1){
    if(stagenum==1){
      this.currentstage=stagenum;
      this.stageone="block";
      this.stagetwo="none";
      this.stagethree="none";
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if(stagenum==2){
      this.currentstage=stagenum;
      this.stageone="none";
      this.stagetwo="block";
      this.stagethree="none";
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if(stagenum==3){
      this.currentstage=stagenum;
      this.stageone="none";
      this.stagetwo="none";
      this.stagethree="block";
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.currentstage=this.currentstage+1;
    }
  }

  async register(form){
    this.formloading = true;
    this.apiService.registerUserAPI(form.value).then(response => {
      this.formloading = false;
      if(response==="success"){
        this.router.navigate(['/companystructure/create'], {replaceUrl: true}); //this.articles = response['articles'];
      }
    }).catch(err => { console.log(err); this.formloading = false; });
  }

}
