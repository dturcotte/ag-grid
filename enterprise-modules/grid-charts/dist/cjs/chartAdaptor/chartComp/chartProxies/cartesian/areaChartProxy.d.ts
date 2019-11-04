import { CartesianChartOptions, AreaSeriesOptions } from "@ag-grid-community/grid-core";
import { ChartProxyParams, UpdateChartParams } from "../chartProxy";
import { CartesianChartProxy } from "./cartesianChartProxy";
export declare class AreaChartProxy extends CartesianChartProxy<AreaSeriesOptions> {
    constructor(params: ChartProxyParams);
    private setAxisPadding;
    update(params: UpdateChartParams): void;
    private updateAreaChart;
    protected getDefaultOptions(): CartesianChartOptions<AreaSeriesOptions>;
    private getSeriesDefaults;
}