import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Pages
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { RegisterComponent } from './register/register.component';
import { OverviewComponent } from './overview/overview.component';
import { StaffsComponent } from './staffs/staffs.component';
import { StaffComponent } from './staff/staff.component';
import { CompanystructureComponent } from './companystructure/companystructure.component';
import { CompanystructureeditComponent } from './companystructureedit/companystructureedit.component';
import { GoalsComponent } from './goals/goals.component';
import { GoalComponent } from './goal/goal.component';
import { ReportsComponent } from './reports/reports.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { CompanysettingsComponent } from './companysettings/companysettings.component';
import { AccountsettingsComponent } from './accountsettings/accountsettings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'overview',
    component: OverviewComponent,
  },
  {
    path: 'staffs',
    component: StaffsComponent,
  },
  {
    path: 'staff/:id',
    component: StaffComponent,
  },
  {
    path: 'companystructure/:type',
    component: CompanystructureComponent,
  },
  {
    path: 'companystructureedit/:id',
    component: CompanystructureeditComponent,
  },
  {
    path: 'goals/:type',
    component: GoalsComponent,
  },
  {
    path: 'goal/:id',
    component: GoalComponent,
  },
  {
    path: 'reports/:type',
    component: ReportsComponent,
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
  },
  {
    path: 'accountsettings',
    component: AccountsettingsComponent,
  },
  {
    path: 'companysettings',
    component: CompanysettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
