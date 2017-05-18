/**
 * Created by dp-ptcstd-32 on 5/15/2017.
 */
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {DragulaModule} from "ng2-dragula";
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {NotesComponent} from "./notes.component";
import {SectionsComponent} from "./sections.component";
import {SectionFilterPipe} from "./section.filter.pipe";
import {PageNotFound} from "./page.not.found.component";
import {NotesEditorComponent} from "./notes.editor.component";

const appRoutes:Routes = [
    {path: '', component: NotesEditorComponent},
    {path: '**', component: PageNotFound}
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, DragulaModule, BrowserModule, RouterModule.forRoot(appRoutes)],
    declarations: [AppComponent, NotesComponent, SectionsComponent, SectionFilterPipe, PageNotFound, NotesEditorComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
