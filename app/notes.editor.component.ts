/**
 * Created by vkhodak on 18.05.2017.
 */
import {Component} from "@angular/core";

@Component({
    selector: 'notesEditor',
    templateUrl: '/app/notes.editor.component.html'
})
export class NotesEditorComponent {
    section:string;

    setSection(section:string) {
        this.section = section;
    }
} 
