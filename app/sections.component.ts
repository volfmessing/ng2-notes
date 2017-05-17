/**
 * Created by vkhodak on 17.05.2017.
 */
import {Component} from "@angular/core";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";


@Component({
    selector: 'sections',
    templateUrl: '/app/sections.component.html'/*,
     template: ``*/
})
export class SectionsComponent {
    private sectionsUrl = 'http://localhost:8080/sections';

    sections:Section[];

    constructor(private http:Http) {
        this.readSections();
    }

    readSections() {
        this.getSections().subscribe(sections=> {
            this.sections = sections;
        });
    }

    getSections():Observable<Section[]> {
        return this.http.get(this.sectionsUrl, {withCredentials: true})
            .map(response => response.json() as Section[]);
    }

}

interface Section {
    _id:string;
    title:string;
}


