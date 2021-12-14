import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    trigger('goals', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1}),
          ]))]),{optional: true}), 

        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 0, transform: 'translateY(-75%)', offset: 1}),  
          ]))]),{optional: true}),
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  goals : any[] = [];
  itemCount: number = this.goals.length;
  btnText: string = 'Añadir album';
  artistName: string = '';
  albumName: string = '';  

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this.itemCount = this.goals.length;
    this._data.goal.subscribe(res=> this.goals = res);
    this._data.changeGoal(this.goals);

    this._data.getGoals()
      .subscribe((data: any) => {
        alert(JSON.stringify(data.albums)); 

        this.goals = data.albums;
        this._data.changeGoal(this.goals);
    });
  }

  addItem(){
    var album_json = {
      album_name: this.albumName,
      album_artist: this.artistName
    }

    if (this.artistName == '' || this.albumName == '') {
      window.alert('Debe llenar todos los inputs');
    } else {
      this._data.newGoal(album_json)
      .subscribe((data: any) => {
        this.goals.push(album_json);
        this.artistName='';
        this.itemCount=this.goals.length;
        this._data.changeGoal(this.goals);
      });
    }

    
  }

  removeItem(i: number){
    this.goals.splice(i,1);
    this._data.changeGoal(this.goals);
  }

}