import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-verifyaccount',
  templateUrl: './verifyaccount.component.html',
  styleUrls: ['./verifyaccount.component.css']
})
export class VerifyaccountComponent implements OnInit {
  formloading: boolean;
  id: any;
  code: any;
  verificationResult: any;

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
    this.verificationAction(this.id,this.code);
  }

  async verificationAction(id,code){
    this.formloading = true;
    this.apiService.verifyAccountAPI(id,code).then(response => {
      this.formloading = false;
      this.verificationResult = response;
    }).catch(err => { console.log(err); this.formloading = false; });
  }
}
