import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IPlayer } from '../../../../shared/jam-shared/models/IPlayer';
import { SetadRepositoryService } from '../../../services/setad-repository.service';
import { ActivatedRoute } from '@angular/router';
import { SportField } from 'src/app/feature/jam/models/sport-field';
import { SportSubField } from 'src/app/feature/jam/models/sub-sport-field';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-single-list-page',
  templateUrl: './single-list-page.component.html',
  styleUrls: ['./single-list-page.component.scss']
})
export class SingleListPageComponent {
  dataSource: MatTableDataSource<IPlayer>;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'sex', 'nationalCode', 'ageRangeName', 'city', 'created', 'action'];
  private _field: SportField;
  private _subField: SportSubField;
  private data: IPlayer[];
  fControl: FormControl<number>;
  constructor (private readonly _setadRepository: SetadRepositoryService, ac: ActivatedRoute, private readonly _fb: FormBuilder) {
    this.fControl = _fb.control<number>(-1);
    ac.params.subscribe(c => {
      this._field = <SportField>c['field'];
      this._subField = <SportSubField>c['subField'];
      this.onRefreshClick();
    });
    this.fControl.valueChanges.subscribe(t => {
      if (t == -1)
        this.dataSource = new MatTableDataSource(this.data);
      else
        this.dataSource = new MatTableDataSource(this.data.filter(c => c.profile.sexRaw == t));
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onRefreshClick() {
    this._setadRepository.singlePlayers(this._field, this._subField).subscribe(c => {
      this.fControl.setValue(-1);
      this.dataSource = new MatTableDataSource(c);
      this.data = c;
      this.dataSource.sort = this.sort;
    });
  }
}
