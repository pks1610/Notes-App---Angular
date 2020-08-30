import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  dataArr = [];

  constructor() { }

  setFormValue(data){
    if(localStorage.getItem('notesList')){
      let newData = {
        title: data.title,
        notes: data.note,
        date: new Date()
      }
      let list = [];
      list = JSON.parse(localStorage.getItem('notesList'));
      list.push(newData);
      localStorage.setItem('notesList', JSON.stringify(list)) 
    }else{
      this.dataArr.push({
        title: data.title,
        notes: data.note,
        date: new Date()
      })
      localStorage.setItem('notesList', JSON.stringify(this.dataArr)) 
    }   
  }

  getNotesList(){
    return JSON.parse(localStorage.getItem('notesList'));
  }

  updateNotes(data){
    localStorage.setItem('notesList', JSON.stringify(data)) 
  }
}
