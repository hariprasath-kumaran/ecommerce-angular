import { Component, OnInit } from '@angular/core';
import { StorageserviceService } from './services/storageservice.service';
@Component({
  selector: 'root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'ecommerce';
  constructor(private storageservice: StorageserviceService) {}
  ngOnInit(): void {
    this.storageservice.loadUsers();
  }
}
