import {Pipe, PipeTransform} from "@angular/core";
import {Section} from "./sections.component";
/**
 * Created by dp-ptcstd-32 on 5/18/2017.
 */
@Pipe({
    name: 'sectionFilter', pure: false
})
export class SectionFilterPipe implements PipeTransform {
    transform(sections: Section[], v: string): Section[] {
        if (!sections) return [];
        return sections.filter(
            s => s.title.toLowerCase().startsWith(v.toLowerCase()));
    }

}
