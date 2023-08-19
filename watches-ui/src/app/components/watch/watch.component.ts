import { Component, OnInit} from '@angular/core';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { Watch } from 'src/app/models/watch';
import { WatchService } from 'src/app/services/watch.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateEditWatchComponent } from '../create-edit-watch/create-edit-watch.component';
import { faAngular } from '@fortawesome/free-brands-svg-icons';
import { toArray } from 'rxjs';
import { WatchStyle } from 'src/app/models/watch-style';


@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {

  watches: Array<Watch> = [];
  isEdit: boolean = false;
  input: string = "";
  Watches: Watch[] = [];

  isLoggedIn?: boolean;

  constructor(
    private watchService: WatchService,
    private _NgbModal: NgbModal
    ) { }

  ngOnInit(): void {
    this.loadWatches();
    this.isLoggedIn = this.watchService.getIsLoggedIn();
  }

  ngDoCheck(): void {
    this.isLoggedIn = this.watchService.getIsLoggedIn();
  }

  trashCan = faTrashCan;
  editIcon = faEdit;

  openModal() {
    this.isEdit = false;
    this._NgbModal.open(CreateEditWatchComponent, {
      windowClass: 'modal-job-scrollable'
    });
    this.watchService.setE(this.isEdit);
  }
  openModal2(watch: Watch) {
    this.isEdit = true;
    this._NgbModal.open(CreateEditWatchComponent, {
      windowClass: 'modal-job-scrollable'
    });

    this.watchService.setE(this.isEdit);
    this.watchService.setW(watch);
  }

  loadWatches() {
    this.watchService.getWatches().subscribe((response: Watch[]) => {
      this.watches = response;
      this.Watches = this.watches;
    })

  }
 //SORT BY PRICE
  removeWatch(id: number) {
    const token = localStorage.getItem('jwtToken');
      this.watchService.deleteWatch(id, token!).subscribe((response: Watch[]) => {
        window.location.reload();
      })
  }

  applyFilter(watches: Watch[], input: string) {
    //this could probably be done in a much simpler way, but i did this from the head, i didn't look for a solution online
    watches.map((watch) => {
      if(!watch.brand.toLowerCase().includes(input.toLowerCase()))
      {
        this.watches = this.watches.filter(item => {
          return item !== watch;
        })
      }

      this.Watches.map(w => {
        if(w.brand.toLowerCase().includes(input.toLowerCase())) {
          if(!this.watches.includes(w)){
            this.watches.push(w);
          }
        }
        this.watches.sort();
      })
    });

    if(this.input !== '' && this.watches.length == 0) {
      this.Watches.map(w => {
        if(w.brand.toLowerCase().includes(input.toLowerCase()))
        {
          if(!this.watches.includes(w)) {
            this.watches.push(w);
          }
        }
      })
    this.watches.sort();
    }

    if(input === '' || input === null) {
      this.watches = this.Watches;
    }
   }


}


