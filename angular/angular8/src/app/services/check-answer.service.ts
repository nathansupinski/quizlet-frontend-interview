import {Injectable} from "@angular/core";
import {IStateQuestion} from "../interfaces/city.interfaces";
import {HttpClient} from "@angular/common/http";
import {map, switchMap} from "rxjs/operators";

@Injectable()
export class CheckAnswerService {

    constructor(private http: HttpClient) {
    }

    checkAnswer(term: IStateQuestion){
        return this.http.post('http://localhost:3000/api/check', {term}).pipe(
            map((response: {result: boolean})=>{
                return response.result
            })
        )
    }
}