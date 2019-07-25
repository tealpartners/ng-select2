import * as tslib_1 from "tslib";
var NgSelect2Component_1;
/// <reference types="select2" />
import { forwardRef, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone, Output, Renderer2, ViewChild, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
let NgSelect2Component = NgSelect2Component_1 = class NgSelect2Component {
    // private style = `CSS`;
    constructor(renderer, zone, _element) {
        this.renderer = renderer;
        this.zone = zone;
        this._element = _element;
        // value for placeholder
        this.placeholder = '';
        this.dropdownParent = '';
        this.allowClear = false;
        // enable / disable select2
        this.disabled = false;
        // emitter when value is changed
        this.valueChanged = new EventEmitter();
        this.element = undefined;
        this.check = false;
        this.propagateChange = (value) => { };
    }
    ngDoCheck() {
        if (!this.element) {
            return;
        }
    }
    ngOnInit() {
        // if (this.cssImport) {
        //   const head = document.getElementsByTagName('head')[0];
        //   const link: any = head.children[head.children.length - 1];
        //   if (!link.version) {
        //     const newLink = this.renderer.createElement(head, 'style');
        //     this.renderer.setElementProperty(newLink, 'type', 'text/css');
        //     this.renderer.setElementProperty(newLink, 'version', 'select2');
        //     this.renderer.setElementProperty(newLink, 'innerHTML', this.style);
        //   }
        // }
    }
    ngOnChanges(changes) {
        if (!this.element) {
            return;
        }
        if (changes['data'] && JSON.stringify(changes['data'].previousValue) !== JSON.stringify(changes['data'].currentValue)) {
            this.initPlugin();
            const newValue = this.value;
            this.setElementValue(newValue);
            this.propagateChange(newValue);
        }
        if (changes['value'] && changes['value'].previousValue !== changes['value'].currentValue) {
            const newValue = changes['value'].currentValue;
            this.setElementValue(newValue);
            this.valueChanged.emit({
                value: newValue,
                data: this.element.select2('data'),
            });
            this.propagateChange(newValue);
        }
        if (changes['disabled'] && changes['disabled'].previousValue !== changes['disabled'].currentValue) {
            this.renderer.setProperty(this.selector.nativeElement, 'disabled', this.disabled);
        }
        if (changes['placeholder'] && changes['placeholder'].previousValue !== changes['placeholder'].currentValue) {
            this.element.data('select2').$container.find('.select2-selection__placeholder').text(this.placeholder);
        }
        if (changes['dropdownParent'] && changes['dropdownParent'].previousValue !== changes['dropdownParent'].currentValue) {
            this.renderer.setAttribute(this.selector.nativeElement, 'data-dropdownParent', this.dropdownParent);
        }
        if (changes['allowClear'] && changes['allowClear'].previousValue !== changes['allowClear'].currentValue) {
            this.renderer.setAttribute(this.selector.nativeElement, 'data-allow-clear', this.allowClear.toString());
        }
    }
    ngAfterViewInit() {
        this.element = jQuery(this.selector.nativeElement);
        this.renderer.setAttribute(this.selector.nativeElement, 'data-dropdownParent', this.dropdownParent);
        this.renderer.setAttribute(this.selector.nativeElement, 'data-allow-clear', this.allowClear.toString());
        // console.log(this.selector.nativeElement);
        this.initPlugin();
        if (typeof this.value !== 'undefined') {
            this.setElementValue(this.value);
        }
        this.element.on('select2:select select2:unselect', (e) => {
            // const newValue: string = (e.type === 'select2:unselect') ? '' : this.element.val();
            const newValue = this.element.val();
            this.valueChanged.emit({
                value: newValue,
                data: this.element.select2('data'),
            });
            this.propagateChange(newValue);
            this.setElementValue(newValue);
        });
    }
    ngOnDestroy() {
        if (this.element) {
            this.element.off('select2:select');
        }
    }
    initPlugin() {
        if (!this.element.select2) {
            if (!this.check) {
                this.check = true;
                console.log('Please add Select2 library (js file) to the project.' +
                    'You can download it from https://github.com/select2/select2/tree/master/dist/js.');
            }
            return;
        }
        // If select2 already initialized remove him and remove all tags inside
        if (this.element.hasClass('select2-hidden-accessible') === true) {
            this.element.select2('destroy');
            this.renderer.setProperty(this.selector.nativeElement, 'innerHTML', '');
        }
        let options = {
            data: this.data,
            width: (this.width) ? this.width : 'resolve',
            placeholder: this.placeholder
        };
        if (this.dropdownParent) {
            options = {
                data: this.data,
                width: (this.width) ? this.width : 'resolve',
                dropdownParent: jQuery('#' + this.dropdownParent),
            };
        }
        Object.assign(options, this.options);
        if (options.matcher) {
            jQuery.fn.select2.amd.require(['select2/compat/matcher'], (oldMatcher) => {
                options.matcher = oldMatcher(options.matcher);
                this.element.select2(options);
                if (typeof this.value !== 'undefined') {
                    this.setElementValue(this.value);
                }
            });
        }
        else {
            this.element.select2(options);
        }
        this.renderer.setProperty(this.selector.nativeElement, 'disabled', this.disabled);
    }
    setElementValue(newValue) {
        // this.zone.run(() => {
        if (Array.isArray(newValue)) {
            for (const option of this.selector.nativeElement.options) {
                this.renderer.setProperty(option, 'selected', (newValue.indexOf(option.value) > -1));
            }
        }
        else {
            this.renderer.setProperty(this.selector.nativeElement, 'value', newValue);
        }
        if (this.element) {
            this.element.trigger('change.select2');
        }
        // });
    }
    writeValue(value) {
        if (value !== undefined) {
            this.value = value;
            this.setElementValue(value);
        }
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
        this.valueChanged.subscribe(fn);
    }
    registerOnTouched() {
    }
};
tslib_1.__decorate([
    ViewChild('selector', { static: true }),
    tslib_1.__metadata("design:type", ElementRef)
], NgSelect2Component.prototype, "selector", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], NgSelect2Component.prototype, "data", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], NgSelect2Component.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], NgSelect2Component.prototype, "dropdownParent", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], NgSelect2Component.prototype, "allowClear", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], NgSelect2Component.prototype, "value", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], NgSelect2Component.prototype, "width", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], NgSelect2Component.prototype, "disabled", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], NgSelect2Component.prototype, "options", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], NgSelect2Component.prototype, "valueChanged", void 0);
NgSelect2Component = NgSelect2Component_1 = tslib_1.__decorate([
    Component({
        selector: 'ng-select2',
        template: "<select #selector>\n  <ng-content select=\"option, optgroup\">\n  </ng-content>\n</select>\n",
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NgSelect2Component_1),
                multi: true,
            },
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [Renderer2, NgZone, ElementRef])
], NgSelect2Component);
export { NgSelect2Component };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc2VsZWN0Mi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1zZWxlY3QyLyIsInNvdXJjZXMiOlsibGliL25nLXNlbGVjdDIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQWlDO0FBQ2pDLE9BQU8sRUFDTCxVQUFVLEVBRVYsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFFVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBSU4sTUFBTSxFQUNOLFNBQVMsRUFFVCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQW1CekUsSUFBYSxrQkFBa0IsMEJBQS9CLE1BQWEsa0JBQWtCO0lBK0I3Qix5QkFBeUI7SUFFekIsWUFBb0IsUUFBbUIsRUFBUyxJQUFZLEVBQVMsUUFBb0I7UUFBckUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFZO1FBM0J6Rix3QkFBd0I7UUFDZixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUVqQixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUdwQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBUTVCLDJCQUEyQjtRQUNsQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBSzFCLGdDQUFnQztRQUN0QixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFcEMsWUFBTyxHQUFRLFNBQVMsQ0FBQztRQUN6QixVQUFLLEdBQUcsS0FBSyxDQUFDO1FBaUx0QixvQkFBZSxHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUE3S3RDLENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsT0FBTztTQUNSO0lBQ0gsQ0FBQztJQUVELFFBQVE7UUFD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Q3RCLHdHQUEwQztRQUMxQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtRQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtRQUMvQyxTQUFTLEVBQUU7WUFDVDtnQkFDRSxPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLG9CQUFrQixDQUFDO2dCQUNqRCxLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0Y7S0FDRixDQUFDOzZDQWtDOEIsU0FBUyxFQUFlLE1BQU0sRUFBbUIsVUFBVTtHQWpDOUUsa0JBQWtCLENBd045QjtTQXhOWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInNlbGVjdDJcIiAvPlxuaW1wb3J0IHtcbiAgZm9yd2FyZFJlZixcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRG9DaGVjayxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTZWxlY3QyT3B0aW9uRGF0YSB9IGZyb20gJy4vbmctc2VsZWN0Mi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgT3B0aW9ucyB9IGZyb20gJ3NlbGVjdDInO1xuXG5kZWNsYXJlIHZhciBqUXVlcnk6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctc2VsZWN0MicsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZy1zZWxlY3QyLmNvbXBvbmVudC5odG1sJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdTZWxlY3QyQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5nU2VsZWN0MkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIERvQ2hlY2ssIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQFZpZXdDaGlsZCgnc2VsZWN0b3InLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZWxlY3RvcjogRWxlbWVudFJlZjtcblxuICAvLyBkYXRhIGZvciBzZWxlY3QyIGRyb3AgZG93blxuICBASW5wdXQoKSBkYXRhOiBBcnJheTxTZWxlY3QyT3B0aW9uRGF0YT47XG5cbiAgLy8gdmFsdWUgZm9yIHBsYWNlaG9sZGVyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJyc7XG5cbiAgQElucHV0KCkgZHJvcGRvd25QYXJlbnQgPSAnJztcblxuXG4gIEBJbnB1dCgpIGFsbG93Q2xlYXIgPSBmYWxzZTtcblxuICAvLyB2YWx1ZSBmb3Igc2VsZWN0MlxuICBASW5wdXQoKSB2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgLy8gd2lkdGggb2Ygc2VsZWN0MiBpbnB1dFxuICBASW5wdXQoKSB3aWR0aDogc3RyaW5nO1xuXG4gIC8vIGVuYWJsZSAvIGRpc2FibGUgc2VsZWN0MlxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8vIGFsbCBhZGRpdGlvbmFsIG9wdGlvbnNcbiAgQElucHV0KCkgb3B0aW9uczogT3B0aW9ucztcblxuICAvLyBlbWl0dGVyIHdoZW4gdmFsdWUgaXMgY2hhbmdlZFxuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgZWxlbWVudDogYW55ID0gdW5kZWZpbmVkO1xuICBwcml2YXRlIGNoZWNrID0gZmFsc2U7XG4gIC8vIHByaXZhdGUgc3R5bGUgPSBgQ1NTYDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyB6b25lOiBOZ1pvbmUsIHB1YmxpYyBfZWxlbWVudDogRWxlbWVudFJlZikge1xuICB9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIGlmICghdGhpcy5lbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gaWYgKHRoaXMuY3NzSW1wb3J0KSB7XG4gICAgLy8gICBjb25zdCBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICAvLyAgIGNvbnN0IGxpbms6IGFueSA9IGhlYWQuY2hpbGRyZW5baGVhZC5jaGlsZHJlbi5sZW5ndGggLSAxXTtcblxuICAgIC8vICAgaWYgKCFsaW5rLnZlcnNpb24pIHtcbiAgICAvLyAgICAgY29uc3QgbmV3TGluayA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChoZWFkLCAnc3R5bGUnKTtcbiAgICAvLyAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkobmV3TGluaywgJ3R5cGUnLCAndGV4dC9jc3MnKTtcbiAgICAvLyAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkobmV3TGluaywgJ3ZlcnNpb24nLCAnc2VsZWN0MicpO1xuICAgIC8vICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRQcm9wZXJ0eShuZXdMaW5rLCAnaW5uZXJIVE1MJywgdGhpcy5zdHlsZSk7XG4gICAgLy8gICB9XG4gICAgLy8gfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuXG4gICAgaWYgKCF0aGlzLmVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1snZGF0YSddICYmIEpTT04uc3RyaW5naWZ5KGNoYW5nZXNbJ2RhdGEnXS5wcmV2aW91c1ZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkoY2hhbmdlc1snZGF0YSddLmN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgIHRoaXMuaW5pdFBsdWdpbigpO1xuXG4gICAgICBjb25zdCBuZXdWYWx1ZTogc3RyaW5nIHwgc3RyaW5nW10gPSB0aGlzLnZhbHVlO1xuICAgICAgdGhpcy5zZXRFbGVtZW50VmFsdWUobmV3VmFsdWUpO1xuICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UobmV3VmFsdWUpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzWyd2YWx1ZSddICYmIGNoYW5nZXNbJ3ZhbHVlJ10ucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlc1sndmFsdWUnXS5jdXJyZW50VmFsdWUpIHtcblxuICAgICAgY29uc3QgbmV3VmFsdWU6IHN0cmluZyA9IGNoYW5nZXNbJ3ZhbHVlJ10uY3VycmVudFZhbHVlO1xuXG4gICAgICB0aGlzLnNldEVsZW1lbnRWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgdmFsdWU6IG5ld1ZhbHVlLFxuICAgICAgICBkYXRhOiB0aGlzLmVsZW1lbnQuc2VsZWN0MignZGF0YScpLFxuICAgICAgfSk7XG4gICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ2Rpc2FibGVkJ10gJiYgY2hhbmdlc1snZGlzYWJsZWQnXS5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzWydkaXNhYmxlZCddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQsICdkaXNhYmxlZCcsIHRoaXMuZGlzYWJsZWQpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzWydwbGFjZWhvbGRlciddICYmIGNoYW5nZXNbJ3BsYWNlaG9sZGVyJ10ucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlc1sncGxhY2Vob2xkZXInXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5kYXRhKCdzZWxlY3QyJykuJGNvbnRhaW5lci5maW5kKCcuc2VsZWN0Mi1zZWxlY3Rpb25fX3BsYWNlaG9sZGVyJykudGV4dCh0aGlzLnBsYWNlaG9sZGVyKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1snZHJvcGRvd25QYXJlbnQnXSAmJiBjaGFuZ2VzWydkcm9wZG93blBhcmVudCddLnByZXZpb3VzVmFsdWUgIT09IGNoYW5nZXNbJ2Ryb3Bkb3duUGFyZW50J10uY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQsICdkYXRhLWRyb3Bkb3duUGFyZW50JywgdGhpcy5kcm9wZG93blBhcmVudCk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ2FsbG93Q2xlYXInXSAmJiBjaGFuZ2VzWydhbGxvd0NsZWFyJ10ucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlc1snYWxsb3dDbGVhciddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnZGF0YS1hbGxvdy1jbGVhcicsIHRoaXMuYWxsb3dDbGVhci50b1N0cmluZygpKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0galF1ZXJ5KHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnZGF0YS1kcm9wZG93blBhcmVudCcsIHRoaXMuZHJvcGRvd25QYXJlbnQpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2RhdGEtYWxsb3ctY2xlYXInLCB0aGlzLmFsbG93Q2xlYXIudG9TdHJpbmcoKSk7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50KTtcblxuICAgIHRoaXMuaW5pdFBsdWdpbigpO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5zZXRFbGVtZW50VmFsdWUodGhpcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50Lm9uKCdzZWxlY3QyOnNlbGVjdCBzZWxlY3QyOnVuc2VsZWN0JywgKGU6IGFueSkgPT4ge1xuICAgICAgLy8gY29uc3QgbmV3VmFsdWU6IHN0cmluZyA9IChlLnR5cGUgPT09ICdzZWxlY3QyOnVuc2VsZWN0JykgPyAnJyA6IHRoaXMuZWxlbWVudC52YWwoKTtcbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5lbGVtZW50LnZhbCgpO1xuXG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgdmFsdWU6IG5ld1ZhbHVlLFxuICAgICAgICBkYXRhOiB0aGlzLmVsZW1lbnQuc2VsZWN0MignZGF0YScpLFxuICAgICAgfSk7XG4gICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShuZXdWYWx1ZSk7XG4gICAgICB0aGlzLnNldEVsZW1lbnRWYWx1ZShuZXdWYWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50KSB7XG4gICAgICB0aGlzLmVsZW1lbnQub2ZmKCdzZWxlY3QyOnNlbGVjdCcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5pdFBsdWdpbigpIHtcbiAgICBpZiAoIXRoaXMuZWxlbWVudC5zZWxlY3QyKSB7XG4gICAgICBpZiAoIXRoaXMuY2hlY2spIHtcbiAgICAgICAgdGhpcy5jaGVjayA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUubG9nKCdQbGVhc2UgYWRkIFNlbGVjdDIgbGlicmFyeSAoanMgZmlsZSkgdG8gdGhlIHByb2plY3QuJyArXG4gICAgICAgICAgJ1lvdSBjYW4gZG93bmxvYWQgaXQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vc2VsZWN0Mi9zZWxlY3QyL3RyZWUvbWFzdGVyL2Rpc3QvanMuJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJZiBzZWxlY3QyIGFscmVhZHkgaW5pdGlhbGl6ZWQgcmVtb3ZlIGhpbSBhbmQgcmVtb3ZlIGFsbCB0YWdzIGluc2lkZVxuICAgIGlmICh0aGlzLmVsZW1lbnQuaGFzQ2xhc3MoJ3NlbGVjdDItaGlkZGVuLWFjY2Vzc2libGUnKSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5lbGVtZW50LnNlbGVjdDIoJ2Rlc3Ryb3knKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnaW5uZXJIVE1MJywgJycpO1xuICAgIH1cblxuICAgIGxldCBvcHRpb25zOiBPcHRpb25zID0ge1xuICAgICAgZGF0YTogdGhpcy5kYXRhLFxuICAgICAgd2lkdGg6ICh0aGlzLndpZHRoKSA/IHRoaXMud2lkdGggOiAncmVzb2x2ZScsXG4gICAgICBwbGFjZWhvbGRlcjogdGhpcy5wbGFjZWhvbGRlclxuICAgIH07XG5cbiAgICBpZiAodGhpcy5kcm9wZG93blBhcmVudCkge1xuICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgZGF0YTogdGhpcy5kYXRhLFxuICAgICAgICB3aWR0aDogKHRoaXMud2lkdGgpID8gdGhpcy53aWR0aCA6ICdyZXNvbHZlJyxcbiAgICAgICAgZHJvcGRvd25QYXJlbnQ6IGpRdWVyeSgnIycgKyB0aGlzLmRyb3Bkb3duUGFyZW50KSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbihvcHRpb25zLCB0aGlzLm9wdGlvbnMpO1xuXG4gICAgaWYgKG9wdGlvbnMubWF0Y2hlcikge1xuICAgICAgalF1ZXJ5LmZuLnNlbGVjdDIuYW1kLnJlcXVpcmUoWydzZWxlY3QyL2NvbXBhdC9tYXRjaGVyJ10sIChvbGRNYXRjaGVyOiBhbnkpID0+IHtcbiAgICAgICAgb3B0aW9ucy5tYXRjaGVyID0gb2xkTWF0Y2hlcihvcHRpb25zLm1hdGNoZXIpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuc2VsZWN0MihvcHRpb25zKTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMudmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhpcy5zZXRFbGVtZW50VmFsdWUodGhpcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsZW1lbnQuc2VsZWN0MihvcHRpb25zKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJywgdGhpcy5kaXNhYmxlZCk7XG4gIH1cblxuICBwcml2YXRlIHNldEVsZW1lbnRWYWx1ZShuZXdWYWx1ZTogc3RyaW5nIHwgc3RyaW5nW10pIHtcblxuICAgIC8vIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobmV3VmFsdWUpKSB7XG5cbiAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudC5vcHRpb25zKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkob3B0aW9uLCAnc2VsZWN0ZWQnLCAobmV3VmFsdWUuaW5kZXhPZihvcHRpb24udmFsdWUpID4gLTEpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5lbGVtZW50KSB7XG4gICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcignY2hhbmdlLnNlbGVjdDInKTtcbiAgICB9XG4gICAgLy8gfSk7XG4gIH1cblxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuXG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuc2V0RWxlbWVudFZhbHVlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcm9wYWdhdGVDaGFuZ2UgPSAodmFsdWU6IGFueSkgPT4geyB9O1xuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gICAgdGhpcy52YWx1ZUNoYW5nZWQuc3Vic2NyaWJlKGZuKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKCkge1xuICB9XG59XG4iXX0=