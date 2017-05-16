/**
 * Created by dp-ptcstd-32 on 5/15/2017.
 */
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AppComponent} from "./app.component";
import {NotesComponent} from "./notes.component";

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule],
    declarations: [AppComponent, NotesComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
