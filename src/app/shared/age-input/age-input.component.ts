import { Component, forwardRef, OnInit, OnDestroy, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { map, filter, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { combineLatest, merge, Subscription } from 'rxjs';
import {
  subDays,
  subMonths,
  subYears,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  isBefore,
  parse,
  format,
} from 'date-fns';
import { isValidDate, convertToDate } from 'src/app/utils/date.util';

/*
this one and image-list-select.component.ts are example of 自定义表单控件
*/

export enum AgeUnit {
  Year = 0,
  Month,
  Day
}
export interface Age {
  age: number;
  unit: AgeUnit;
}

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    }
  ]
})
export class AgeInputComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() daysTop = 90;
  @Input() daysBottom = 0;
  @Input() monthsTop = 24;
  @Input() monthsBottom = 1;
  @Input() yearsTop = 150;
  @Input() yearsBottom = 1;
  @Input() format = 'YYYY-MM-DD';
  @Input() debounceTime = 300;


  form: FormGroup;
  selectedUnit = AgeUnit.Year;
  sub: Subscription;
  ageUnits = [
    { value: AgeUnit.Year, label: 'year' },
    { value: AgeUnit.Month, label: 'month' },
    { value: AgeUnit.Day, label: 'day' },
  ];
  private propagateChange = (_: any) => { };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const initDate = convertToDate(subYears(Date.now(), 30));
    const initAge = this.toAge(initDate);

    this.form = this.fb.group({
      birthday: [parse(initDate), this.validateDate],
      age: this.fb.group(
        {
          ageNum: [initAge.age],
          ageUnit: [initAge.unit]
        },
        { validator: this.validateAge('ageNum', 'ageUnit') }
      )
    });

    const birthday = this.form.get('birthday');
    const ageNum = this.form.get('age').get('ageNum');
    const ageUnit = this.form.get('age').get('ageUnit');

    // 源头 Stream
    const birthday$ = birthday.valueChanges.pipe(
      map(d => {
        return { date: d, from: 'birthday' };
      }),
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      filter(_ => birthday.valid),
    );
    const ageNum$ = ageNum.valueChanges.pipe(
      startWith(ageNum.value),
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    );
    const ageUnit$ = ageUnit.valueChanges.pipe(
      startWith(ageUnit.value),
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    );

    // 合并类 stream
    const age$ = combineLatest(ageNum$, ageUnit$, (_n, _u) => {
      return this.toDate({ age: _n, unit: _u });
    }).pipe(
      map(d => {
        return { date: d, from: 'age' };
      }),
      filter(_ => this.form.get('age').valid)
    );

    const merged$ = merge(birthday$, age$).pipe(
      filter(_ => this.form.valid)
    );

    this.sub = merged$.subscribe(d => {
      const age = this.toAge(d.date);
      if (d.from === 'birthday') {
        if (age.age !== ageNum.value) {
          ageNum.patchValue(age.age, { emitEvent: false });
        }
        if (age.unit !== ageUnit.value) {
          this.selectedUnit = age.unit;
          ageUnit.patchValue(age.unit, { emitEvent: false });
        }
        this.propagateChange(d.date);
      } else {
        const ageToCompare = this.toAge(birthday.value);
        if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
          birthday.patchValue(d.date, { emitEvent: false });
          this.propagateChange(d.date);
        }
      }
    })
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }

  }

  validate(c: FormControl): { [key: string]: any } | null {
    const val = c.value;
    if (!val) {
      return null;
    }
    if (isValidDate(val)) {
      return null;
    }
    return {
      dateOfBirthInvalid: true
    }
  }
  validateDate(c: FormControl): { [key: string]: any } {
    const val = c.value;
    return isValidDate(val) ? null : { birthdayInvalid: true };
  }

  validateAge(ageNumKey: string, ageUnitKey: string) {
    return (group: FormGroup): { [key: string]: any } | null => {
      const ageNum = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;
      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNumVal >= this.yearsBottom && ageNumVal < this.yearsTop;
          break;
        }
        case AgeUnit.Month: {
          result = ageNumVal >= this.monthsBottom && ageNumVal < this.monthsTop;
          break;
        }
        case AgeUnit.Day: {
          result = ageNumVal >= this.daysBottom && ageNumVal < this.daysTop;
          break;
        }
        default: {
          result = false;
          break;
        }
      }
      return result ? null : { ageInvalid: true };
    }; 

  }

  writeValue(obj: any): void {
    if (obj) {
      const date = parse(convertToDate(obj));
      const birthday = this.form.get('birthday');
      if (!birthday) {
        return;
      }
      birthday.patchValue(date, { emitEvent: true });
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

  toAge(dateStr: string): Age {
    const date = parse(dateStr);
    const now = Date.now();
    if (isBefore(subDays(now, this.daysTop), date)) {
      return {
        age: differenceInDays(now, date),
        unit: AgeUnit.Day
      }
    } else if (isBefore(subMonths(now, this.monthsTop), date)) {
      return {
        age: differenceInMonths(now, date),
        unit: AgeUnit.Month
      };
    } else {
      return {
        age: differenceInYears(now, date),
        unit: AgeUnit.Year
      };
    }
  }

  toDate(age: Age): string {
    const now = Date.now();
    switch (age.unit) {
      case AgeUnit.Year: {
        return format(subYears(now, age.age), this.format);
      }
      case AgeUnit.Month: {
        return format(subMonths(now, age.age), this.format);
      }
      case AgeUnit.Day: {
        return format(subDays(now, age.age), this.format);
      }
      default: {
        return '1991-01-01';
      }
    }
  }
}
