import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormValidators} from "../utils/form-validators";
import {debounce, debounceTime} from "rxjs/operators";
import {Subscription} from "rxjs";
import {IStateQuestion} from "../interfaces/city.interfaces";
import {CheckAnswerService} from "../services/check-answer.service";

@Component({
  selector: "app-learn-mode",
  templateUrl: "./learn-mode.component.html",
  styleUrls: ["./learn-mode.component.css"]
})
export class LearnModeComponent implements OnInit, OnDestroy {

   terms: IStateQuestion[] = [
    {
      id: 1,
      word: "Nebraska",
      definition: "Lincoln"
    },
    {
      id: 2,
      word: "Massachusetts",
      definition: "Boston"
    },
    {
      id: 3,
      word: "California",
      definition: "Sacramento"
    }
  ];
   subSink: Subscription[] = [];
   cityForm: FormGroup;
  // your code here


  constructor(private formValidators: FormValidators, private checkAnswerService: CheckAnswerService) {}

  ngOnInit() {
      let formGroupControls = {};
      this.terms.forEach((term) => {
          formGroupControls[term.id] = new FormControl('',[
              Validators.required,
              Validators.minLength(2),
              this.formValidators.isEmptyStringValidator,
              this.formValidators.customCityValidator(term.definition),
              //this.formValidators.asyncCityValidator(term)
          ]);
      });

      this.cityForm = new FormGroup(formGroupControls);

      this.subSink.push(this.cityForm.valueChanges.pipe(
          debounceTime(600)
      ).subscribe((value)=>{
          console.log('new value entered')
      }));

  }

  ngOnDestroy() {
       this.subSink.forEach((s)=>{
           s.unsubscribe();
       })
  }

  submitForm(){
    this.checkAnswerService.checkAnswer(this.terms[0]).subscribe((res) => {console.log(res)});
  }

}
