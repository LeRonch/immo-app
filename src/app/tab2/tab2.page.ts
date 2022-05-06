import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Property } from '../interfaces/property';
import { ApiDataService } from '../api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})

export class Tab2Page implements OnInit {

  public ionicForm: FormGroup;
  public property: Property;
  public base64textString: string;

  constructor(
    public formBuilder: FormBuilder,
    private apiDataService: ApiDataService,
    private router: Router) { }

  handleFileSelect(e){

    const files = e.target.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();
      /* eslint no-underscore-dangle: ["error", { "allow": ["_handleReaderLoaded"] }]*/
      reader.onload =this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }

  ngOnInit() {

    this.ionicForm = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      size: new FormControl(),
      floor: new FormControl(),
      image: new FormControl(),
      room: new FormControl(),
      price: new FormControl(),
      address: new FormControl(),
      zipcode: new FormControl(),
      city: new FormControl(),
    });

  }

  onSubmit() {

    this.property = {
      title: this.ionicForm.value.title,
      description: this.ionicForm.value.description,
      size: this.ionicForm.value.size,
      floor: this.ionicForm.value.floor,
      image: this.base64textString,
      room: this.ionicForm.value.room,
      price: this.ionicForm.value.price,
      address: this.ionicForm.value.address,
      zipcode: this.ionicForm.value.zipcode,
      city: this.ionicForm.value.city,
    };

    console.log(this.property);


    this.apiDataService.postRequest(this.property).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );

    this.router.navigate(['/']);
  }
}
