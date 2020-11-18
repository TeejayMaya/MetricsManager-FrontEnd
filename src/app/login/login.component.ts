import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formloading: boolean;
  constructor(private apiService: ApiService, public authService: AuthenticationService, private router: Router) { }

  async ngOnInit() {
    //Check if User is logged in
    await this.authService.userLoginCheck().then(response => {
      if(response===true){
        this.router.navigate(['/overview'], {replaceUrl: true});
      }
    }).catch(err => { console.log(err); });
    this.formloading = false;
  }

  async login(form){
    this.formloading = true;
    this.apiService.loginUserAPI(form.value).then(response => {
      this.formloading = false;
      if(response==="success"){
        this.router.navigate(['/overview'], {replaceUrl: true}); //this.articles = response['articles'];
      }
    }).catch(err => { console.log(err); this.formloading = false; });
  }

}
