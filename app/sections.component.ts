/**
 * Created by vkhodak on 17.05.2017.
 */
import {Component, EventEmitter, Output} from "@angular/core";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {DragulaService} from "ng2-dragula";


@Component({
    selector: 'sections',
    templateUrl: '/app/sections.component.html'
})
export class SectionsComponent {
    private sectionsUrl = '/sections';

    sectionsReplaceUrl = "/sections/replace";

    sections:Section[];

    activeSection:string = null;

    @Output() sectionChanged: EventEmitter<string> =
        new EventEmitter<string>();

    constructor(private http: Http, private dragulaService: DragulaService) {
        this.readSections();
        dragulaService.drop.subscribe(this.onDrop.bind(this));
    }

    onDrop(value) {
        let [bag, elementMoved, targetContainer, srcContainer] = value;
        if (targetContainer.children) {
            let arr = Array.from(targetContainer.children);
            this.sections = arr.map((li: HTMLLIElement) => {
                return {title: li.textContent.trim()}
            });
            this.writeSections().subscribe();
        }
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

    addSection(newSection: HTMLInputElement) {
        console.log("run add section for -", newSection.title);

        let title = newSection.value;
        if (!title) return;

        // check for duplicates
        if (this.sections.map(s => s.title).find(t => t === title)) return;

        const section: Section = {title};
        this.sections.unshift(section);
        this.showSection(section);

        // write sections to server and clear add section input box
        this.writeSections().subscribe(res => newSection.value = "");
        // this.
    }

    writeSections() {
        return this.http.post(this.sectionsReplaceUrl, this.sections);
    }

}

export interface Section {
    _id?: string;
    title:string;
}


