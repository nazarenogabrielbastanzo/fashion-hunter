import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestionComponent implements OnInit {
  @Input() suggestion: any;
  siguiendo = false;

  constructor() {}

  ngOnInit(): void {}
}
