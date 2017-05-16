/**
 * Created by dp-ptcstd-32 on 5/16/2017.
 */
import {Component} from "@angular/core";
@Component({
    selector: 'notes',
    template: `Notes list:
    <ul>
        <li *ngFor="let note of notes ">
            {{note.text}}
            <textarea [(ngModel)]="text"></textarea>
            <button (click)="add()">Add</button>
        </li>
    </ul>`
})
export class NotesComponent {
    notes: Note[] = [
        {text: "Note one"},
        {text: "Note two"}
    ]

    text: string

    add() {
        let note = {text: this.text}
        this.notes.push(note);
        this.text = "";
    }
}

interface Note {
    text: string;

}
