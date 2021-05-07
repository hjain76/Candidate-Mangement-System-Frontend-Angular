import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Candidate } from '../candidate';
import { CandidateService } from '../candidate.service';
import { Logs } from '../logs';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  
  public title = "CRUD COMPONENT";

  public editCandidate: any;
  public deleteCandidate: any;
  public viewCandidate: any;

  public candidates: any;
  public message: any;

  constructor(private candidateService: CandidateService, private authService: SocialAuthService
    , private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getCandidates();
  }


  public getCandidates(): void {
    this.candidateService.getCandidates().subscribe(
      (response: Candidate[]) => {
        this.candidates = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchCandidates(key: string): void {
    console.log(key);
    const results: Candidate[] = [];
    for (const candidate of this.candidates) {
      if (candidate.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || candidate.batch.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || candidate.institute.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || candidate.location.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || candidate.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || candidate.mobno.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || candidate.feedback.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || candidate.joining_date.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || candidate.job_title.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || candidate.skillset.toLowerCase().indexOf(key.toLowerCase()) !== -1      )
      {
        results.push(candidate);
      }
    }
    this.candidates = results;
    if (results.length === 0 || !key) {
      this.getCandidates();
    }
  }

  public onAddCandidate(addForm: NgForm): void {
    document.getElementById('add-candidate-form')?.click();
    let f = new Date();
    let l: Logs = new Logs('Himanshu Jain', 'Create', f);
    let resp1 = this.candidateService.addlogs(l);
    resp1.subscribe((data) => this.message = data);
    
    this.candidateService.addCandidate(addForm.value).subscribe(
      (response: Candidate) => {
        console.log(response);
        this.getCandidates();

        addForm.reset();
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateCandidate(candidate: Candidate): void {
    let f = new Date();
    let l: Logs = new Logs('Himanshu Jain', 'Update', f);
    let resp1 = this.candidateService.addlogs(l);
    resp1.subscribe((data) => this.message = data);
    
    this.candidateService.updateCandidate(candidate).subscribe(
      (response: Candidate) => {
        console.log(response);
        this.getCandidates();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
 

  public onDeleteCandidate(id: number): void {
    console.log(id);
   let f = new Date();
    let l: Logs = new Logs('Himanshu Jain', 'Delete', f);
    let resp1 = this.candidateService.addlogs(l);
    resp1.subscribe((data) => this.message = data);
    
    this.candidateService.deleteCandidate(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getCandidates();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(candidate: Candidate, mode: string): void  {
     const container = document.getElementById("main-container")!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCandidateModal');
    }
    if (mode === 'edit') {
      this.editCandidate = candidate;
      button.setAttribute('data-target', '#updateCandidateModal');
    }
    if (mode === 'delete') {
      this.deleteCandidate = candidate;
      console.log(this.deleteCandidate);
      button.setAttribute('data-target', '#deleteCandidateModal');
    }
    if (mode === 'view') {
      this.viewCandidate = candidate;
      console.log(this.viewCandidate);
      button.setAttribute('data-target', '#viewCandidateModal');
    }
    container.appendChild(button);
    button.click();
  }
  

  signOut(): any {
    localStorage.removeItem("idToken")
    this.router.navigate(['']);
    this.authService.signOut();

  }
}
