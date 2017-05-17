/**
 * Created by dp-ptcstd-32 on 5/16/2017.
 */
import {Component} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";


@Component({
    selector: 'notes',
    template: `Notes list:
    <ul>
        <li *ngFor="let note of notes; let i=index">
            {{note.text}}
            <button (click)="remove({{note.idx}})">remove</button>
        </li>
    </ul>
    <textarea [(ngModel)]="text"></textarea>
    <button (click)="add()">Add</button>`

})
export class NotesComponent {

    notes: Note[] = [
        {idx: '1', text: "Note one"},
        {idx: '2', text: "Note two"}
    ]

    idx:string;
    text: string;

    private notesUrl = 'http://localhost:8080/notes';  // URL to web api

    constructor(private http: Http) {
        this.getNotes().then(notes => {
            this.notes = notes
            console.log(notes);
        });
    }

    add() {
        let note = {idx: null, text: this.text}
        this.addNote(note);
    }

    remove(idx) {
        this.removeNote(idx);
    }

    removeNote(idx) {
        this.http.delete(this.notesUrl, idx, {withCredentials: true}).toPromise()
            .then(response => {
                console.log("note sent, response", response);
                this.notes.splice(idx, 1);
            });

    }

    getNotes(): Promise<Note[]> {
        return this.http.get(this.notesUrl, {withCredentials: true})
            .toPromise()
            .then(response => response.json() as Note[]);
    }

    addNote(note:Note) {
        this.http.post(this.notesUrl, note, {withCredentials: true}).toPromise()
            .then(response => {
                note = response.json() as Note;
                this.notes.push(note);
                this.text = "";
                console.log("note sent, response", response)
            });
    }

}

interface Note {
    idx:string;
    text: string;

}
