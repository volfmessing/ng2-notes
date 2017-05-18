/**
 * Created by dp-ptcstd-32 on 5/15/2017.
 */
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {DragulaModule} from "ng2-dragula";


import {AppComponent} from "./app.component";
import {NotesComponent} from "./notes.component";
import {SectionsComponent} from "./sections.component";
import {SectionFilterPipe} from "./section.filter.pipe";


@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, DragulaModule],
    declarations: [AppComponent, NotesComponent, SectionsComponent, SectionFilterPipe],
    bootstrap: [AppComponent]
})
export class AppModule {
}
