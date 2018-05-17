import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: String;
  tasks: Object;
  indiTask: Object;

  constructor(private _httpService: HttpService){}

  ngOnInit() {
    // this.getTasksFromService();
    this.title = 'MEAN';
  }
  getTasksFromService() {
    let tempObservable = this._httpService.getTasks();
    tempObservable.subscribe(data => {
      // console.log("Got our tasks!", data);
      this.tasks = data;
      // console.log(data);
    });
  }
  showTask(_id){
    let taskObservable = this._httpService.getTaskById(_id);
    taskObservable.subscribe(data => {
      
      this.indiTask = data;
      // console.log(this.indiTask)
      // console.log('----------------')
      // console.log(data);
    });
  }
  
}
