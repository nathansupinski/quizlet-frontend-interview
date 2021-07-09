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


    customCityValidator(cityValue: string){ //wrap the validator in a function to provide params in the closure
        return (control: FormControl) => {
            let userCity = control.value;
            return userCity === cityValue ? null : {wrongCity: true};
        }
    }

    asyncCityValidator(term: IStateQuestion){ //work in progress async validator to do form validation against a backend
        return (control: AbstractControl): Observable<ValidationErrors> | null => {
            let termToCheck = {...term};
            termToCheck.definition = control.value;


            //probably need to define this as a class that extends AsyncValidator but then need to find a way to wrap it to pass the question context
            return timer(500).pipe(switchMap(()=> { //angular resubscribes to the latest observable from an async validator so this should be ok
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

        }
    }

}