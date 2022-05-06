import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { Property } from '../interfaces/property';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  public property: Property;
  public id: string = this.route.snapshot.params.id.toString();

  constructor(private apiDataService: ApiDataService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {

    this.apiDataService.sendGetRequestById(this.id).subscribe((data: Property)=>{
      this.property = data;
    },
    (error) => console.log(error)
    );
  }

  deleteItem() {
    this.apiDataService.deleteRequest(this.id).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/']);
      },
      (error) => console.log(error)
      );
  }

}
