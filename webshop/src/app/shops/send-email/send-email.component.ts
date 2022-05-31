import { Component, OnInit } from '@angular/core';
declare let Email: any;
import 'src/assets/smtp.js';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {
  muutuja: any;
  pealkiri: any;

  onSendEmail() {
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "mihkelvaher@hotmail.com",
        Password : "6A204D40F59AE91015798FCC6894B945DDE7",
        To : 'mihkelvaher@hotmail.com',
        From : "vahermihkel@gmail.com",
        Subject : this.pealkiri,
        Body : "Klient kirjutas: " +  this.muutuja + " . Saadetud: " + new Date()
    }).then(
      (message: any) => alert(message)
    );
  }

  constructor() { }

  ngOnInit(): void {
  }

}
