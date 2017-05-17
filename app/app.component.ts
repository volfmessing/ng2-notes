/**
 * Created by dp-ptcstd-32 on 5/15/2017.
 */
import {Component} from "@angular/core";
@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    template: `<h1>Notes Angular 2 App by {{name}}</h1>
    <notes></notes>`
})
export class AppComponent {
    name = "Vit";
}
