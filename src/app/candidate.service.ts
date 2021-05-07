import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from './candidate';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Logs } from './logs';


@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private apiServerUrl = environment.apiUrl;
  formBuilder: any;
  constructor(private http: HttpClient , private fb: FormBuilder) { }

  public getCandidates(): Observable<Candidate[]>
  {
    return this.http.get<Candidate[]>(`${this.apiServerUrl}/candidate/view`);
  }

  public addCandidate(candidate: Candidate): Observable<Candidate>
  {
    console.log(JSON.stringify(candidate));
    return this.http.post<Candidate>(`${this.apiServerUrl}/candidate/add`, candidate);
  }

  public updateCandidate(candidate: Candidate): Observable<Candidate>
  {
    return this.http.put<Candidate>(`${this.apiServerUrl}/candidate/update`, candidate);
  }

  public deleteCandidate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/candidate/delete/${id}`);
  }

  public getLocation(): Observable<any>{
    return this.http.get(this.apiServerUrl + '/candidate/trends/location');
  }

  public getSkills(): Observable<any> {
    return this.http.get(this.apiServerUrl + '/candidate/trends/skills');
  }

  public getInstitute(): Observable<any> {
    return this.http.get(this.apiServerUrl + '/candidate/trends/institute');
  }

  public addlogs(l: Logs) {
    return this.http.post(this.apiServerUrl + '/candidate/addlogs', l, { responseType: 'text' as 'json' });
  }
  public getlogs() {
    return this.http.get(this.apiServerUrl + '/candidate/getlogs');
  }
  
  id: any;
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    feedback: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobno: new FormControl('', [Validators.required, Validators.minLength(8)]),
    location: new FormControl('', Validators.required),
    job_title: new FormControl(''),
    institute: new FormControl('', Validators.required),
    skillset: new FormControl(''),
    batch: new FormControl('', Validators.required),
    
    joining_date: new FormControl(''),
 
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      id: null,
      name: '',
      description: '',
      feedback: '',
      email: '',
      mobno: '',
      location: '',
      batch: '',
      institute: '',
      skillset: '',
      
      joining_date: '',
     job_title:''
    });
  }
  
}

