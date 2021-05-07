import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {

  public locations: any;
  public skills: any;
  public institute: any;

  constructor(private candidateService: CandidateService) { }

  ngOnInit(): void {

    console.log("hi");
    this.candidateService.getLocation().subscribe((data) => {
      this.locations = data;
      console.log(this.locations);
    });
    this.candidateService.getSkills().subscribe((data) => {
      this.skills = data;
      console.log(this.skills);
    });

    this.candidateService.getInstitute().subscribe((data) => {
      this.institute = data;
      console.log(this.institute);
    });
  }
  // visible data booleans
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Institute';
  showYAxisLabel = true;
  yAxisLabel = 'Count';
  timeline = true;
  
  
  // color scheme for the bars
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };

  
    

  

  trend1 = true;
  trend2 = false;
  trend3 = false;

  public ShowTrend(mode: string): void {
    if (mode === 'trend1') {
     
      this.trend1 = true;
      this.trend2 = false;
      this.trend3 = false;
     
     
    }
    if (mode === 'trend2') {
     
      this.trend1 = false;
      this.trend2 = true;
      this.trend3 = false;
     // console.log(this.locations);
    
    }
    if (mode === 'trend3') {
      this.trend1 = false;
      this.trend2 = false;
      this.trend3 = true;
    }
  }

  onShow(event : any) {
    console.log(event);
  }
}
