import { isEqual } from 'lodash';
import { action, observable } from 'mobx';

type IApiMethod = (...args: any[]) => Promise<any>;
interface IApiCall {
  args: any[];
  result: object | null;
}

export class Request {
  @observable public didFail: boolean = false;
  @observable public error: any = null;
  @observable public isExecuting: boolean = false;
  @observable public wasExecuted: boolean = false;
  @observable public result: any = null;

  private method: IApiMethod;
  private isCached: boolean;
  private apiCalls: IApiCall[] = [];
  private currentApiCall: IApiCall | null = null;
  private isInvalidated: boolean = true;
  private isWaitingForResponse: boolean = false;

  constructor(method: IApiMethod, isCached = true) {
    this.method = method;
    this.isCached = isCached;
  }

  public execute(...args: any[]) {
    if (this.isCached) {
      if (this.isWaitingForResponse) { return this; }

      const existingApiCall = this.findApiCall(args);

      if (existingApiCall && existingApiCall !== this.currentApiCall) {
        this.isInvalidated = true;
        this.currentApiCall = existingApiCall;
      } else if (!existingApiCall) {
        this.isInvalidated = true;
        this.currentApiCall = this.addApiCall(args);
      }

      if (!this.isInvalidated) { return this; }

      setTimeout(action(() => {
        this.isExecuting = true;
        if (existingApiCall) {
          this.result = existingApiCall.result;
        }
      }), 0);

    }

    setTimeout(action(async () => {
      try {
        this.isWaitingForResponse = true;
        this.didFail = false;
        this.isExecuting = true;
        this.wasExecuted = true;
        this.result = await this.method(...args);
        this.isExecuting = false;
        this.isWaitingForResponse = false;
        this.isInvalidated = false;
      } catch (err) {
        this.didFail = true;
        this.error = err;
      }
    }), 1);

    return this;
  }

  public invalidate(options = { immediately: false }) {
    this.isInvalidated = true;
    if (options.immediately && this.currentApiCall) {
      return this.execute(...this.currentApiCall.args);
    }
    return this;
  }

  public patch(modify: any) {
    return new Promise((resolve) => {
      setTimeout(action(() => {
        const override = modify(this.result);
        if (override !== undefined) { this.result = override; }
        if (this.currentApiCall) { this.currentApiCall.result = this.result; }
        resolve(this);
      }), 0);
    });
  }

  public reset() {
    this.didFail = false;
    this.error = null;
    this.isExecuting = false;
    this.wasExecuted = false;
    this.result = null;

    return this;
  }

  private addApiCall(args: any[]) {
    const newCall: IApiCall = { args, result: null };
    this.apiCalls.push(newCall);
    return newCall;
  }

  private findApiCall(args: any[]) {
    return this.apiCalls.find((c) => isEqual(c.args, args));
  }
}
