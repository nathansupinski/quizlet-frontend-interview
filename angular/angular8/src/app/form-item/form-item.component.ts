import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {IStateQuestion} from "../interfaces/city.interfaces";

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.css']
})
export class FormItemComponent implements OnInit {

  @Input() question: IStateQuestion;
  @Input() cityForm: FormGroup;

  constructor() { }

  ngOnInit() {

  }

}
