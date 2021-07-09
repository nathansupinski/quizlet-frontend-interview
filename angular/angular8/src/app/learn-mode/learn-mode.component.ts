import {Component, OnDestroy, OnInit} from '@angular/core';
import {ILearnTerm} from "../interfaces/learn.interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: "app-learn-mode",
  templateUrl: "./learn-mode.component.html",
  styleUrls: ["./learn-mode.component.css"]
})
export class LearnModeComponent implements OnInit, OnDestroy {

   terms: ILearnTerm[] = [
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

   currentTermIndex: number;
   activeTerm: ILearnTerm;
   learnForm: FormGroup;
   guessCorrect: boolean;
   showAnswer: boolean = false;

   subSink: Subscription[] = [];

  // your code here


  constructor() {}

  ngOnInit() {

      this.learnForm = new FormGroup({
          'cityGuess': new FormControl('',[
              //Validators.required
          ])
      })
      this.activeTerm = this.terms[0];
      this.currentTermIndex = 0;

      this.subSink.push(this.learnForm.get('cityGuess').valueChanges.pipe(
            debounceTime(300)
          ).subscribe((guess) => {
              if(this.showAnswer){
                  let correct = this.checkGuess(guess);
                  if(correct && this.currentTermIndex < this.terms.length){
                      setTimeout(() => {
                          this.currentTermIndex += 1
                          this.activeTerm = this.terms[this.currentTermIndex]
                          this.guessCorrect = undefined;
                          this.showAnswer = false;
                          this.learnForm.reset();
                      },1000);
                  }
              }
      }));
    }

    ngOnDestroy() {
      this.subSink.forEach(s => s.unsubscribe());
    }


    submit(){
      let guess = this.learnForm.get('cityGuess').value;
      if(this.isGuessEmpty(guess)){
          this.showAnswer = true;
      } else {
          this.checkGuess(guess);
      }
    }

    checkGuess(guess){
        this.guessCorrect = guess.toLowerCase() === this.activeTerm.definition.toLowerCase();
        return this.guessCorrect;
    }

    isGuessEmpty(guess){
        let strippedGuess = guess.replace(/\s/g,'');
        return strippedGuess === '';
    }

}
