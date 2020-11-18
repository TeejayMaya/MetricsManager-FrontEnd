import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageServiceModule, SESSION_STORAGE, LOCAL_STORAGE } from 'ngx-webstorage-service';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { RegisterComponent } from './register/register.component';
import { OverviewComponent } from './overview/overview.component';
import { HeaderComponent } from './components/header/header.component';
import { SideComponent } from './components/side/side.component';
import { FooterComponent } from './components/footer/footer.component';
import { StaffsComponent } from './staffs/staffs.component';
import { CompanystructureComponent } from './companystructure/companystructure.component';
import { GoalsComponent } from './goals/goals.component';
import { ReportsComponent } from './reports/reports.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { CompanysettingsComponent } from './companysettings/companysettings.component';
import { AccountsettingsComponent } from './accountsettings/accountsettings.component';
import { GoalComponent } from './goal/goal.component';
import { VerifyaccountComponent } from './verifyaccount/verifyaccount.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { CompanystructureeditComponent } from './companystructureedit/companystructureedit.component';
import { StaffComponent } from './staff/staff.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    ForgotpasswordComponent,
    RegisterComponent,
    OverviewComponent,
    HeaderComponent,
    SideComponent,
    FooterComponent,
    StaffsComponent,
    CompanystructureComponent,
    GoalsComponent,
    ReportsComponent,
    NotificationsComponent,
    CompanysettingsComponent,
    AccountsettingsComponent,
    GoalComponent,
    VerifyaccountComponent,
    PasswordresetComponent,
    CompanystructureeditComponent,
    StaffComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StorageServiceModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
