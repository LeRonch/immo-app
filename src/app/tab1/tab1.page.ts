import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { Property } from '../interfaces/property';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {

  public properties: Property[] = [];

  constructor(private apiDataService: ApiDataService) {}

  ngOnInit() {

    this.apiDataService.sendGetRequest().subscribe((data: Property[])=>{
      this.properties = data;
    },
    (error) => console.log(error),
    );
  }

}
