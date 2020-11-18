import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthenticationService } from '../authentication.service';
import * as CanvasJS from '../../assets/js/canvasjs.min';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  public userData: any;
  public username: string;
  public userDashboardData: any;
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
    //Get User Dashboard Data
    this.getUserDashboardRecordData(this.userData); 
  }

  ngAfterViewInit() {
    //const id = +this.activatedRoute.snapshot.paramMap.get('id');
  }
  
  getUserDashboardRecordData(userInfo: any){
    this.apiService.getUserDashboardData(userInfo).then(response => {
      this.userDashboardData = response;
      //this.userstatus = response['riskassessmentstatus'];
      //this.userstatuslevel = response['riskassessmentlevel'];
      //this.userstatusdate = response['riskassessmentdate'];
      this.generateGraphDataSet(this.userDashboardData); //Get User Dashboard Data
      this.doneLoadingFromServer();
      //setTimeout(() => { this.doneLoadingFromServer(); }, 9000);      
    }).catch(err => { console.log(err); this.doneLoadingFromServer(); });
  }

  generateGraphDataSet(userGraphData: any){
    //First Chart
    let userDashboardGraphDataGoals = userGraphData['goalsgraphdata']; 
    let chartOne = new CanvasJS.Chart("goalsChartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: ""
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: userDashboardGraphDataGoals[5][1], label: userDashboardGraphDataGoals[5][0] },
          { y: userDashboardGraphDataGoals[4][1], label: userDashboardGraphDataGoals[4][0] },
          { y: userDashboardGraphDataGoals[3][1], label: userDashboardGraphDataGoals[3][0] },
          { y: userDashboardGraphDataGoals[2][1], label: userDashboardGraphDataGoals[2][0] },
          { y: userDashboardGraphDataGoals[1][1], label: userDashboardGraphDataGoals[1][0] },
          { y: userDashboardGraphDataGoals[0][1], label: userDashboardGraphDataGoals[0][0]},
        ]
      }]
    });
    chartOne.render();
    //Second Chart
    let userDashboardGraphDataFinancialGoals = userGraphData['financialgoalsgraphdata']; 
    let chartTwo = new CanvasJS.Chart("financialGoalsChartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: ""
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: userDashboardGraphDataFinancialGoals[5][1], label: userDashboardGraphDataFinancialGoals[5][0] },
          { y: userDashboardGraphDataFinancialGoals[4][1], label: userDashboardGraphDataFinancialGoals[4][0] },
          { y: userDashboardGraphDataFinancialGoals[3][1], label: userDashboardGraphDataFinancialGoals[3][0] },
          { y: userDashboardGraphDataFinancialGoals[2][1], label: userDashboardGraphDataFinancialGoals[2][0] },
          { y: userDashboardGraphDataFinancialGoals[1][1], label: userDashboardGraphDataFinancialGoals[1][0] },
          { y: userDashboardGraphDataFinancialGoals[0][1], label: userDashboardGraphDataFinancialGoals[0][0]},
        ]
      }]
    });
    chartTwo.render();
    //Third Statistics Chart
    let userDashboardGraphDataGoalsStatistics = userGraphData['goalsstatisticsgraphdata']; 
    let chartThree = new CanvasJS.Chart("goalsStatisticsChartContainer", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: ""
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: userDashboardGraphDataGoalsStatistics[2][1], name: userDashboardGraphDataGoalsStatistics[2][0] },
          { y: userDashboardGraphDataGoalsStatistics[1][1], name: userDashboardGraphDataGoalsStatistics[1][0] },
          { y: userDashboardGraphDataGoalsStatistics[0][1], name: userDashboardGraphDataGoalsStatistics[0][0]},
        ]
      }]
    });
    chartThree.render();
    //Fourth Statistics Chart
    let userDashboardGraphDataGoalsTypeStatistics = userGraphData['goalstypestatisticsgraphdata']; 
    let chartFour = new CanvasJS.Chart("goalsTypeStatisticsChartContainer", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: ""
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: userDashboardGraphDataGoalsTypeStatistics[3][1], name: userDashboardGraphDataGoalsTypeStatistics[3][0] },
          { y: userDashboardGraphDataGoalsTypeStatistics[2][1], name: userDashboardGraphDataGoalsTypeStatistics[2][0] },
          { y: userDashboardGraphDataGoalsTypeStatistics[1][1], name: userDashboardGraphDataGoalsTypeStatistics[1][0] },
          { y: userDashboardGraphDataGoalsTypeStatistics[0][1], name: userDashboardGraphDataGoalsTypeStatistics[0][0]},
        ]
      }]
    });
    chartFour.render();
  }

  doneLoadingFromServer(){
    this.isPageDataLoaded = true;
  }

}
