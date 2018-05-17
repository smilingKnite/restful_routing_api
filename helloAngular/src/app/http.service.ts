import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  task: Object;

  constructor(private _http: HttpClient) { 
    // this.getTasks();
    
    // this.getTaskById( );
    // this.getPokemon();
    // this.getSomethingElse();
   }
   getTasks(){
    //  let tempObservable = this._http.get('/tasks');
    //  tempObservable.subscribe(data => console.log("Got our tasks!", data));
    return this._http.get('/tasks');
   }
  getTaskById(id) {
    // let newObservable = this._http.get('/tasks/' + id);
    //  newObservable.subscribe(data => {
    //     console.log("Got task!", data)
    //     this.task = data
    //     // this.indiTask = data;
    //   });
    // console.log('---------------sdfsdfsdfs--------------------');//
    return this._http.get('/tasks/'+ id);
   }









   getPokemon() {
     let bulbasaur = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
     bulbasaur.subscribe(data => {
      //  console.log("")
      //  console.log("Best Ability:", data['abilities'][1].ability.name);
      });
   }
   getSomethingElse(){
     let something = this._http.get('https://pokeapi.co/api/v2/ability/65/');

     something.subscribe(data => { 

       data['pokemon'].forEach(poki => {

         let abilities = this._http.get(poki['pokemon']['url']);
         abilities.subscribe(abil => {

          // console.log(poki['pokemon']['name']  );
           abil['abilities'].forEach(power => {
             if (power['ability']['name'] == 'overgrow') {
               true;
              //  Continue and break dont work for forEach so i tried 'true' and idk why it works but it does
             } else {
               console.log(poki['pokemon']['name'] + " knows " + power['ability']['name']);
             }
           });
         });
        //  console.log(abilities);
        //  console.log(object['pokemon']['name'] + " has " + object['pokemon']['url']);
      });
      // console.log(data['pokemon']);
     });
   }
}
