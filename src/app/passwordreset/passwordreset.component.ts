import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})
export class PasswordresetComponent implements OnInit {
  formloading: boolean;
  id: any;
  code: any;

  constructor(private apiService: ApiService, public authService: AuthenticationService, private activatedRoute: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    //Check if User is logged in
    await this.authService.userLoginCheck().then(response => {
      if(response===true){
        this.router.navigate(['/overview'], {replaceUrl: true});
      }
    }).catch(err => { console.log(err); });
    this.formloading = false;
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
    this.code=this.activatedRoute.snapshot.paramMap.get('code');
  }

  async passwordreset(form){
    this.formloading = true;
    this.apiService.passwordResetChangeAPI(this.id,this.code,form.value).then(response => {
      this.formloading = false;
    }).catch(err => { console.log(err); this.formloading = false; });
  }
}
