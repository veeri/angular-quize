import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { AuthService } from '../auth.service';
// import { ApiService } from '../app.service';


interface category{
  id: string;
  name: string;
}
interface categoryAPIResp{
  trivia_categories: object;
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categoryOptions:  any = [];

  players: any = [];
  questions: any = [];
  selected = "----"
  // user: { id: number, name: string };
  constructor(private router: Router,
    private http:HttpClient
    ) {}
  

  fetchData() {
      this.http.get('https://opentdb.com/api_category.php').pipe().subscribe(data => {
      console.log(data);
      const {trivia_categories} = data as any;
      // const {trivia_categories}: {trivia_categories: categoryAPIResp[]} = data;
      this.categoryOptions = trivia_categories;
    });
  }

  fetchQuiz() {
    this.http.get('https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple').pipe().subscribe(data => {
    console.log(data);
    const {results, response_code} = data as any;
    // const {trivia_categories}: {trivia_categories: categoryAPIResp[]} = data;
    let newResult = results.map((item: any) =>{
      return {
        ...item,
        incorrect_answers:  shuffleArray([
          ...item.incorrect_answers,
          item.correct_answer,
        ]),
        selectedAnsware : ""
      }
    })
    console.log('newResult', newResult)
    this.questions = newResult;
  });
}

  update(event: any){

  }
  ngOnInit(){
    this.fetchData();
  }

  createQuiz(){
    this.fetchQuiz()
  }

  selectAnswere(index: number, answere: string){
    console.log(index, answere)
  }
}
