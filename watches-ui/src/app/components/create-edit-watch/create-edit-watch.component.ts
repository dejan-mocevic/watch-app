import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Watch } from 'src/app/models/watch';
import { WatchStyle } from 'src/app/models/watch-style';
import { WatchService } from 'src/app/services/watch.service';


@Component({
  selector: 'app-create-edit-watch',
  templateUrl: './create-edit-watch.component.html',
  styleUrls: ['./create-edit-watch.component.css']
})
export class CreateEditWatchComponent implements OnInit {

  watchStyles: WatchStyle[] = [];

  watch: Watch = {
    brand: "",
    watchType: "",
    model: "",
    price: "",
    styleId: 0
  };

  iE?: boolean;
  id?: number;
  myWatch?: Watch;

  myForm = new FormGroup({
    watchType: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    styleId: new FormControl(0, Validators.required)
  });

  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private watchService: WatchService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.iE = this.watchService.getE();

    if(this.iE == true)
    {
      this.populateForm();
    }
    else {
      this.activeModal
    }

    this.watchService.getWatchStyles().subscribe((response) => {
      this.watchStyles = response;
      console.log(this.watchStyles);

    })
  }

  populateForm() {
    this.myWatch = this.watchService.getW();
    this.id = this.myWatch.id;

    if(this.iE == true) {
      this.myForm = this.formBuilder.group({
        model: [this.myWatch.model, Validators.required],
        brand: [this.myWatch.brand, Validators.required],
        price: [this.myWatch.price, [Validators.required, Validators.pattern("^[0-9]*$")]],
        watchType: [this.myWatch.watchType, Validators.required],
        styleId: [this.myWatch.styleId!, Validators.required]
      })
    }
  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  onSubmit() {
    this.watch.brand = this.myForm.value.brand!;
    this.watch.model = this.myForm.value.model!;
    this.watch.price = this.myForm.value.price!;
    this.watch.watchType = this.myForm.value.watchType!;
    let styleId: number = Number(this.myForm.value.styleId);
    this.watch.styleId = styleId;
    //this.watch.watchStyle!.styleName = this.myForm.value.styleName!;

    if(this.iE == false) {
      this.watchService.createWatch(this.watch).subscribe(response => {
        this.activeModal.close();
        window.location.reload();
      })
    }
    else {
      this.watchService.updateWatch(this.watch, this.id!).subscribe(response => {
        this.activeModal.close();
        window.location.reload();
      })
    }
  }

}
