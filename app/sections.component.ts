/**
 * Created by vkhodak on 17.05.2017.
 */
import {Component, EventEmitter, Output} from "@angular/core";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";


@Component({
    selector: 'sections',
    templateUrl: '/app/sections.component.html'
})
export class SectionsComponent {
    private sectionsUrl = '/sections';

    sections:Section[];

    activeSection:string = null;

    @Output() sectionChanged: EventEmitter<string> =
        new EventEmitter<string>();

    constructor(private http:Http) {
        this.readSections();
    }

    readSections() {
        this.getSections().subscribe(sections=> {
            this.sections = sections;
            if (this.activeSection == null && this.sections.length > 0) {
                this.showSection(this.sections[0]);
            }
            ;
        });
    }

    getSections():Observable<Section[]> {
        return this.http.get(this.sectionsUrl, {withCredentials: true})
            .map(response => response.json() as Section[]);
    }

    showSection(section:Section) {
        this.activeSection = section.title;
        this.sectionChanged.emit(this.activeSection);
        console.log("emmited section: ", section.title);
    }
}

interface Section {
    _id:string;
    title:string;
}


