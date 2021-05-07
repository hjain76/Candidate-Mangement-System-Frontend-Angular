import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  constructor(private candidateService: CandidateService) { }

  candidates: any;
  ngOnInit(): void {

    let resp = this.candidateService.getlogs();
    console.log(resp)
    resp.subscribe((data) => this.candidates = data); 
  }

}
