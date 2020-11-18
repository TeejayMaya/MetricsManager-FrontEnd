import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-companysettings',
  templateUrl: './companysettings.component.html',
  styleUrls: ['./companysettings.component.css']
})
export class CompanysettingsComponent implements OnInit {
  public userData: any;
  public username: string;
  public newindustry: boolean;
  public formloading: boolean;

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
  }

  async checkIndustryEntry(chosencompanyindustry){
    if(chosencompanyindustry==="Others"){
      this.newindustry=true;
    } else {
      this.newindustry=false;
    }
  }

  async updatecompanyaccount(form){
    this.formloading = true;
    console.log(form.value);
    this.apiService.updateCompanyAccountAPI(this.userData,form.value).then(response => {
      this.formloading = false;
      alert(response['message']);
    }).catch(err => { console.log(err); this.formloading = false; });
  }

}
