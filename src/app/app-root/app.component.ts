import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'inClass-contacts';

    selectedCmp = 'home';

    selectCmp(cmpName: string) {
        this.selectedCmp = cmpName;
    }

}
