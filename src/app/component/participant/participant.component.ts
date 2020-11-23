import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Participant } from 'src/app/domain/participant';
import { ParticipantService } from 'src/app/service/participant.service';


@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit, OnDestroy {

  public participants: Participant[];
  private sud: Subscription;
  constructor(public participantService: ParticipantService) { }

  ngOnInit(): void {
    this.findAll();
  }


  findAll(): void {
    this.sud = this.participantService.findAll().subscribe(data => {

      console.log(data)

      this.participants = data;
    });
  }


  delete(participant: Participant): void{
    this.participantService.delete(participant.id).subscribe(ok => {
      this.findAll();
    /*  this.showMsg = true;
      this.messages = [''];
      this.messages[0] = 'El customer se modifico con exito';*/
    }, err => {
     /* this.showMsg = true;
      this.messages = err.error.error;*/
    });
  }



  ngOnDestroy(): void {
    this.sud.unsubscribe();
  }

}
