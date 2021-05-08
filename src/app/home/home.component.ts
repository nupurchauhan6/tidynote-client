import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MODAL_CONFIG } from '../app.constant';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  openRegisterModal(): void {
    this.modalService.show(RegisterComponent, MODAL_CONFIG);
  }

}
