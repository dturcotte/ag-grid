// @ag-grid-community/grid-react v22.0.0-beta.0
import { IComponent, WrapableInterface } from '@ag-grid-community/grid-core';
export declare abstract class BaseReactComponent implements IComponent<any>, WrapableInterface {
    hasMethod(name: string): boolean;
    callMethod(name: string, args: IArguments): void;
    addMethod(name: string, callback: Function): void;
    abstract getGui(): HTMLElement;
    abstract getFrameworkComponentInstance(): any;
}