import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Participant } from 'src/app/domain/participant';
import { ParticipantService } from 'src/app/service/participant.service';


@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  public participants: Participant[];
  public fileToUpload: any;
  private sud: Subscription;
  constructor(public participantService: ParticipantService, private builder:FormBuilder) {
    this.formGroup = this.builder.group({
      'participantId': ['',Validators.required],
      'file':['',Validators.required]
    })
   }

  ngOnInit(): void {
    this.reset();
    this.findAll();
  }


  findAll(): void {
    this.sud = this.participantService.findAll().subscribe(data => {
      this.participants = data;
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  save(values: any): void{

    let participantId = values.participantId;
    if(this.isEmpty(participantId) || this.isEmpty(this.fileToUpload)){
      return;
    }
     this.participantService.save(participantId,  this.fileToUpload).subscribe(ok => {
        this.reset();
        this.findAll();
    }, err => {
      console.log(err.error.error);
    });
  }


  delete(participant: Participant): void{
    this.participantService.delete(participant.id).subscribe(ok => {
      this.findAll();
    }, err => {
      console.log(err.error.error);
    });
  }

  download(trace:string):void{
    let pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(trace));
    pom.setAttribute('download', "lazy_loading_example_output.txt");

    if (document.createEvent) {
        let event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }

  }

  reset():void { 
    this.formGroup.reset();
    this.fileToUpload = '';
  }

  isEmpty(value: string):boolean{
    return (value == null || value.length === 0);
  }


  ngOnDestroy(): void {
    this.sud.unsubscribe();
  }

}
