import { __values, __decorate, __metadata } from 'tslib';
import { ViewChild, ElementRef, Input, Output, Component, ViewEncapsulation, ChangeDetectionStrategy, forwardRef, Renderer2, NgZone, EventEmitter, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

var NgSelect2Component = /** @class */ (function () {
    // private style = `CSS`;
    function NgSelect2Component(renderer, zone, _element) {
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
        this.propagateChange = function (value) { };
    }
    NgSelect2Component_1 = NgSelect2Component;
    NgSelect2Component.prototype.ngDoCheck = function () {
        if (!this.element) {
            return;
        }
    };
    NgSelect2Component.prototype.ngOnInit = function () {
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
    };
    NgSelect2Component.prototype.ngOnChanges = function (changes) {
        if (!this.element) {
            return;
        }
        if (changes['data'] && JSON.stringify(changes['data'].previousValue) !== JSON.stringify(changes['data'].currentValue)) {
            this.initPlugin();
            var newValue = this.value;
            this.setElementValue(newValue);
            this.propagateChange(newValue);
        }
        if (changes['value'] && changes['value'].previousValue !== changes['value'].currentValue) {
            var newValue = changes['value'].currentValue;
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
    };
    NgSelect2Component.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.element = jQuery(this.selector.nativeElement);
        this.renderer.setAttribute(this.selector.nativeElement, 'data-dropdownParent', this.dropdownParent);
        this.renderer.setAttribute(this.selector.nativeElement, 'data-allow-clear', this.allowClear.toString());
        // console.log(this.selector.nativeElement);
        this.initPlugin();
        if (typeof this.value !== 'undefined') {
            this.setElementValue(this.value);
        }
        this.element.on('select2:select select2:unselect', function (e) {
            // const newValue: string = (e.type === 'select2:unselect') ? '' : this.element.val();
            var newValue = _this.element.val();
            _this.valueChanged.emit({
                value: newValue,
                data: _this.element.select2('data'),
            });
            _this.propagateChange(newValue);
            _this.setElementValue(newValue);
        });
    };
    NgSelect2Component.prototype.ngOnDestroy = function () {
        if (this.element) {
            this.element.off('select2:select');
        }
    };
    NgSelect2Component.prototype.initPlugin = function () {
        var _this = this;
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
        var options = {
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
            jQuery.fn.select2.amd.require(['select2/compat/matcher'], function (oldMatcher) {
                options.matcher = oldMatcher(options.matcher);
                _this.element.select2(options);
                if (typeof _this.value !== 'undefined') {
                    _this.setElementValue(_this.value);
                }
            });
        }
        else {
            this.element.select2(options);
        }
        this.renderer.setProperty(this.selector.nativeElement, 'disabled', this.disabled);
    };
    NgSelect2Component.prototype.setElementValue = function (newValue) {
        // this.zone.run(() => {
        var e_1, _a;
        if (Array.isArray(newValue)) {
            try {
                for (var _b = __values(this.selector.nativeElement.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var option = _c.value;
                    this.renderer.setProperty(option, 'selected', (newValue.indexOf(option.value) > -1));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            this.renderer.setProperty(this.selector.nativeElement, 'value', newValue);
        }
        if (this.element) {
            this.element.trigger('change.select2');
        }
        // });
    };
    NgSelect2Component.prototype.writeValue = function (value) {
        if (value !== undefined) {
            this.value = value;
            this.setElementValue(value);
        }
    };
    NgSelect2Component.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
        this.valueChanged.subscribe(fn);
    };
    NgSelect2Component.prototype.registerOnTouched = function () {
    };
    var NgSelect2Component_1;
    __decorate([
        ViewChild('selector', { static: true }),
        __metadata("design:type", ElementRef)
    ], NgSelect2Component.prototype, "selector", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], NgSelect2Component.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NgSelect2Component.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NgSelect2Component.prototype, "dropdownParent", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NgSelect2Component.prototype, "allowClear", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NgSelect2Component.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NgSelect2Component.prototype, "width", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NgSelect2Component.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NgSelect2Component.prototype, "options", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NgSelect2Component.prototype, "valueChanged", void 0);
    NgSelect2Component = NgSelect2Component_1 = __decorate([
        Component({
            selector: 'ng-select2',
            template: "<select #selector>\n  <ng-content select=\"option, optgroup\">\n  </ng-content>\n</select>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return NgSelect2Component_1; }),
                    multi: true,
                },
            ]
        }),
        __metadata("design:paramtypes", [Renderer2, NgZone, ElementRef])
    ], NgSelect2Component);
    return NgSelect2Component;
}());

var NgSelect2Module = /** @class */ (function () {
    function NgSelect2Module() {
    }
    NgSelect2Module = __decorate([
        NgModule({
            imports: [
                CommonModule
            ],
            declarations: [NgSelect2Component],
            exports: [NgSelect2Component]
        })
    ], NgSelect2Module);
    return NgSelect2Module;
}());

/*
 * Public API Surface of ng-select2
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgSelect2Component, NgSelect2Module };
//# sourceMappingURL=ng-select2.js.map
