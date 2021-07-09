import {Injectable} from "@angular/core";
import {AbstractControl, FormControl, ValidationErrors} from "@angular/forms";
import {Observable, of, timer} from "rxjs";
import {CheckAnswerService} from "../services/check-answer.service";
import {IStateQuestion} from "../interfaces/city.interfaces";
import {catchError, debounce, debounceTime, map, switchMap} from "rxjs/operators";


@Injectable()
export class FormValidators {

    constructor(private checkAnswerService: CheckAnswerService) {
    }

    isEmptyStringValidator(control: FormControl){
        let val = control.value.replace(/\s/g, "");
        return val === '' ? {emptyString: true} : null;
    }


    customCityValidator(cityValue: string){
        return (control: FormControl) => {
            let userCity = control.value;
            return userCity === cityValue ? null : {wrongCity: true};
        }
    }

    asyncCityValidator(term: IStateQuestion){
        return (control: AbstractControl): Observable<ValidationErrors> | null => {
            let termToCheck = {...term};
            termToCheck.definition = control.value;



            return timer(500).pipe(switchMap(()=> {
                return this.checkAnswerService.checkAnswer(termToCheck).pipe(
                    //debounceTime(500),
                    map((response)=>{
                        if(response === true){
                            return null;
                        }
                        return {wrongCity: true}
                    }),
                    catchError((err)=>of({wrongCity: true}))
                )
            }))

            //
            // return this.checkAnswerService.checkAnswer(termToCheck).pipe(
            //     //debounceTime(500),
            //     map((response)=>{
            //         if(response === true){
            //             return null;
            //         }
            //         return {wrongCity: true}
            //     })
            // )
        }
    }

}