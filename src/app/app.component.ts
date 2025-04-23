import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'taskmboard';
  constructor(private http:HttpClient){}
  ngOnInit(){
    this.http.get('http://localhost:3000/tasks')
  .subscribe(data => console.log(data));
  }
}
