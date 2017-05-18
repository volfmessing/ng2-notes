/**
 * Created by dp-ptcstd-32 on 5/16/2017.
 */
import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {Http, RequestOptionsArgs, URLSearchParams} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Observable} from "rxjs";


@Component({
    selector: 'notes',
    templateUrl: '/app/notes.component.html'
})
export class NotesComponent implements OnInit, OnChanges {
    ngOnChanges(changes: SimpleChanges): void {
        console.log("load notes from onChange ");
        this.loadNotes();

    }

    ngOnInit(): void {

    }


    notes: Note[] = [];
    text: string;
    @Input() section: string = 'Work';

    private notesUrl = 'http://localhost:8080/notes';  // URL to web api

    constructor(private http: Http) {

    }

    loadNotes() {
        this.getNotes().subscribe(notes => this.notes = notes);
    }

    add() {
        let note = {text: this.text, section: this.section};
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

    getNotes(): Observable<Note[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('section', this.section);
        let requestParams: RequestOptionsArgs = {search: params, withCredentials: true};
        console.log("run load notes ");
        return this.http.get(this.notesUrl, requestParams)
            .map(response => response.json() as Note[]);
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
