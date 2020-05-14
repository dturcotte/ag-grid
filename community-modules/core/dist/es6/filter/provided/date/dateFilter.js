/**
 * @ag-grid-community/core - Advanced Data Grid / Data Table supporting Javascript / React / AngularJS / Web Components
 * @version v23.1.1
 * @link http://www.ag-grid.com/
 * @license MIT
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { RefSelector } from '../../../widgets/componentAnnotations';
import { Autowired } from '../../../context/context';
import { DateCompWrapper } from './dateCompWrapper';
import { ConditionPosition, SimpleFilter } from '../simpleFilter';
import { ScalarFilter } from '../scalarFilter';
import { serialiseDate, parseDateTimeFromString } from '../../../utils/date';
import { setDisplayed } from '../../../utils/dom';
var DateFilter = /** @class */ (function (_super) {
    __extends(DateFilter, _super);
    function DateFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateFilter.prototype.mapRangeFromModel = function (filterModel) {
        // unlike the other filters, we do two things here:
        // 1) allow for different attribute names (same as done for other filters) (eg the 'from' and 'to'
        //    are in different locations in Date and Number filter models)
        // 2) convert the type (because Date filter uses Dates, however model is 'string')
        //
        // NOTE: The conversion of string to date also removes the timezone - i.e. when user picks
        //       a date from the UI, it will have timezone info in it. This is lost when creating
        //       the model. When we recreate the date again here, it's without a timezone.
        return {
            from: parseDateTimeFromString(filterModel.dateFrom),
            to: parseDateTimeFromString(filterModel.dateTo)
        };
    };
    DateFilter.prototype.setValueFromFloatingFilter = function (value) {
        if (value != null) {
            var dateFrom = parseDateTimeFromString(value);
            this.dateCondition1FromComp.setDate(dateFrom);
        }
        else {
            this.dateCondition1FromComp.setDate(null);
        }
        this.dateCondition1ToComp.setDate(null);
        this.dateCondition2FromComp.setDate(null);
        this.dateCondition2ToComp.setDate(null);
    };
    DateFilter.prototype.setConditionIntoUi = function (model, position) {
        var _a = model ?
            [parseDateTimeFromString(model.dateFrom), parseDateTimeFromString(model.dateTo)] :
            [null, null], dateFrom = _a[0], dateTo = _a[1];
        var _b = this.getFromToComponents(position), compFrom = _b[0], compTo = _b[1];
        compFrom.setDate(dateFrom);
        compTo.setDate(dateTo);
    };
    DateFilter.prototype.resetUiToDefaults = function (silent) {
        _super.prototype.resetUiToDefaults.call(this, silent);
        this.dateCondition1FromComp.setDate(null);
        this.dateCondition1ToComp.setDate(null);
        this.dateCondition2FromComp.setDate(null);
        this.dateCondition2ToComp.setDate(null);
    };
    DateFilter.prototype.comparator = function () {
        return this.dateFilterParams.comparator ? this.dateFilterParams.comparator : this.defaultComparator.bind(this);
    };
    DateFilter.prototype.defaultComparator = function (filterDate, cellValue) {
        // The default comparator assumes that the cellValue is a date
        var cellAsDate = cellValue;
        if (cellValue == null || cellAsDate < filterDate) {
            return -1;
        }
        if (cellAsDate > filterDate) {
            return 1;
        }
        return 0;
    };
    DateFilter.prototype.setParams = function (params) {
        _super.prototype.setParams.call(this, params);
        this.dateFilterParams = params;
        this.createDateComponents();
    };
    DateFilter.prototype.createDateComponents = function () {
        var _this = this;
        // params to pass to all four date comps
        var dateComponentParams = {
            onDateChanged: function () { return _this.onUiChanged(); },
            filterParams: this.dateFilterParams
        };
        this.dateCondition1FromComp = new DateCompWrapper(this.userComponentFactory, dateComponentParams, this.eCondition1PanelFrom);
        this.dateCondition1ToComp = new DateCompWrapper(this.userComponentFactory, dateComponentParams, this.eCondition1PanelTo);
        this.dateCondition2FromComp = new DateCompWrapper(this.userComponentFactory, dateComponentParams, this.eCondition2PanelFrom);
        this.dateCondition2ToComp = new DateCompWrapper(this.userComponentFactory, dateComponentParams, this.eCondition2PanelTo);
        this.addDestroyFunc(function () {
            _this.dateCondition1FromComp.destroy();
            _this.dateCondition1ToComp.destroy();
            _this.dateCondition2FromComp.destroy();
            _this.dateCondition2ToComp.destroy();
        });
    };
    DateFilter.prototype.getDefaultFilterOptions = function () {
        return DateFilter.DEFAULT_FILTER_OPTIONS;
    };
    DateFilter.prototype.createValueTemplate = function (position) {
        var pos = position === ConditionPosition.One ? '1' : '2';
        return /* html */ "\n            <div class=\"ag-filter-body\" ref=\"eCondition" + pos + "Body\">\n                <div class=\"ag-filter-from ag-filter-date-from\" ref=\"eCondition" + pos + "PanelFrom\">\n                </div>\n                <div class=\"ag-filter-to ag-filter-date-to\" ref=\"eCondition" + pos + "PanelTo\">\n                </div>\n            </div>";
    };
    DateFilter.prototype.isConditionUiComplete = function (position) {
        var positionOne = position === ConditionPosition.One;
        var option = positionOne ? this.getCondition1Type() : this.getCondition2Type();
        if (option === SimpleFilter.EMPTY) {
            return false;
        }
        if (this.doesFilterHaveHiddenInput(option)) {
            return true;
        }
        var _a = this.getFromToComponents(position), compFrom = _a[0], compTo = _a[1];
        return compFrom.getDate() != null && (option !== SimpleFilter.IN_RANGE || compTo.getDate() != null);
    };
    DateFilter.prototype.areSimpleModelsEqual = function (aSimple, bSimple) {
        return aSimple.dateFrom === bSimple.dateFrom
            && aSimple.dateTo === bSimple.dateTo
            && aSimple.type === bSimple.type;
    };
    // needed for creating filter model
    DateFilter.prototype.getFilterType = function () {
        return DateFilter.FILTER_TYPE;
    };
    DateFilter.prototype.createCondition = function (position) {
        var positionOne = position === ConditionPosition.One;
        var type = positionOne ? this.getCondition1Type() : this.getCondition2Type();
        var _a = this.getFromToComponents(position), compFrom = _a[0], compTo = _a[1];
        return {
            dateFrom: serialiseDate(compFrom.getDate()),
            dateTo: serialiseDate(compTo.getDate()),
            type: type,
            filterType: DateFilter.FILTER_TYPE
        };
    };
    DateFilter.prototype.resetPlaceholder = function () {
        var translate = this.gridOptionsWrapper.getLocaleTextFunc();
        var placeholder = translate('dateFormatOoo', 'yyyy-mm-dd');
        this.dateCondition1FromComp.setInputPlaceholder(placeholder);
        this.dateCondition1ToComp.setInputPlaceholder(placeholder);
        this.dateCondition2FromComp.setInputPlaceholder(placeholder);
        this.dateCondition2ToComp.setInputPlaceholder(placeholder);
    };
    DateFilter.prototype.updateUiVisibility = function () {
        _super.prototype.updateUiVisibility.call(this);
        this.resetPlaceholder();
        var condition1Type = this.getCondition1Type();
        setDisplayed(this.eCondition1PanelFrom, this.showValueFrom(condition1Type));
        setDisplayed(this.eCondition1PanelTo, this.showValueTo(condition1Type));
        var condition2Type = this.getCondition2Type();
        setDisplayed(this.eCondition2PanelFrom, this.showValueFrom(condition2Type));
        setDisplayed(this.eCondition2PanelTo, this.showValueTo(condition2Type));
    };
    DateFilter.prototype.getFromToComponents = function (position) {
        return position === ConditionPosition.One ?
            [this.dateCondition1FromComp, this.dateCondition1ToComp] :
            [this.dateCondition2FromComp, this.dateCondition2ToComp];
    };
    DateFilter.FILTER_TYPE = 'date';
    DateFilter.DEFAULT_FILTER_OPTIONS = [
        ScalarFilter.EQUALS,
        ScalarFilter.GREATER_THAN,
        ScalarFilter.LESS_THAN,
        ScalarFilter.NOT_EQUAL,
        ScalarFilter.IN_RANGE
    ];
    __decorate([
        RefSelector('eCondition1PanelFrom')
    ], DateFilter.prototype, "eCondition1PanelFrom", void 0);
    __decorate([
        RefSelector('eCondition1PanelTo')
    ], DateFilter.prototype, "eCondition1PanelTo", void 0);
    __decorate([
        RefSelector('eCondition2PanelFrom')
    ], DateFilter.prototype, "eCondition2PanelFrom", void 0);
    __decorate([
        RefSelector('eCondition2PanelTo')
    ], DateFilter.prototype, "eCondition2PanelTo", void 0);
    __decorate([
        Autowired('userComponentFactory')
    ], DateFilter.prototype, "userComponentFactory", void 0);
    return DateFilter;
}(ScalarFilter));
export { DateFilter };
