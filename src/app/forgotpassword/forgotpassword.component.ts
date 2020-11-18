import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  formloading: boolean;
  passcheck: boolean;

  constructor(private apiService: ApiService, public authService: AuthenticationService, private router: Router) { }

  async ngOnInit() {
    //Check if User is logged in
    await this.authService.userLoginCheck().then(response => {
      if(response===true){
        this.router.navigate(['/overview'], {replaceUrl: true});
      }
    }).catch(err => { console.log(err); });
    this.formloading = false;
    this.passcheck = false;
  }

  async forgotpassword(form){
    this.formloading = true;
    this.apiService.resetPasswordAPI(form.value).then(response => {
      this.formloading = false;
      if(response==="success"){
        this.passcheck = true;
      }
    }).catch(err => { console.log(err); this.formloading = false; });
  }

}
