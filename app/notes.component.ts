/**
 * Created by dp-ptcstd-32 on 5/16/2017.
 */
import {Component} from "@angular/core";
import {Http, RequestOptionsArgs, URLSearchParams} from "@angular/http";
import "rxjs/add/operator/toPromise";


@Component({
    selector: 'notes',
    templateUrl: '/app/notes.component.html'/*,
    template: `Notes list:
    <ul>
        <li *ngFor="let note of notes">
            {{note.text}}
            <button (click)="remove(note._id)">remove</button>
        </li>
    </ul>
    <textarea [(ngModel)]="text"></textarea>
     <button (click)="add()">Add</button>`*/

})
export class NotesComponent {

    // notes: Note[] = [
    //     {/*idx: '1', */text: "Note one"},
    //     {/*idx: '2', */text: "Note two"}
    // ]

    // idx:string;

    notes: Note[] = [];
    text: string;

    private notesUrl = 'http://localhost:8080/notes';  // URL to web api

    constructor(private http: Http) {
        this.loadNotes();
    }

    loadNotes() {
        this.getNotes().then(notes => {
            this.notes = notes
            console.log("notes are loaded", notes);
        });
    }

    add() {
        let note = {/*idx: null, */text: this.text}
        this.addNote(note);
    }

    remove(id: string) {
        this.removeNote(id);
    }


    removeNote(id) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        let requestParams: RequestOptionsArgs = {search: params, withCredentials: true};
        this.http.delete(this.notesUrl, requestParams).toPromise()
            .then(response => {
                console.log("note sent, response", response);
                console.log(
                    `note with id ${id} removed, response`, response);
                this.loadNotes();
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
                console.log("note sent, response", response);
                this.text = "";
                this.loadNotes();
            });
    }

}

interface Note {
    // idx:string;
    text: string;

}
