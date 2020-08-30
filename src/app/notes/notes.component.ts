import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { NoteService } from './note.service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notesArr = [];
  savedNotesList;
  selectedItem;
  selTitle;
  selNote;
  selDate;
  searchText;

  constructor(
    private modalServ: NgbModal,
    private noteServ: NoteService
  ) { }

  ngOnInit() {
    this.getNotesList();
  }

  open(content){
    this.modalServ.open(content, { size: 'sm', backdrop: 'static' })
  }

  formSubmit(form: NgForm){
    let data = form.value;
    this.noteServ.setFormValue(data)
    this.modalServ.dismissAll();
    this.getNotesList();
  }

  getNotesList(){
    this.savedNotesList = this.noteServ.getNotesList()
    this.selectedItem = this.savedNotesList[0];
    this.selTitle = this.savedNotesList[0].title;
    this.selNote = this.savedNotesList[0].notes;
    this.selDate = this.savedNotesList[0].date;
  }

  selectedNote(note){
    this.selectedItem = note;
    this.selTitle = note.title;
    this.selNote = note.notes;
    this.selDate = note.date;
  }

  delete(){
    let note = this.selectedItem
    for(let i=0; i<this.savedNotesList.length; i++){
      if(note.title == this.savedNotesList[i].title && note.notes == this.savedNotesList[i].notes){
        const index = this.savedNotesList.indexOf(this.savedNotesList[i]);
        this.savedNotesList.splice(index, 1);
      }
    }
    this.noteServ.updateNotes(this.savedNotesList);
    this.getNotesList();
  }

}
