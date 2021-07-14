// import {MiddlewareSequence} from '@loopback/rest';

// export class MySequence extends MiddlewareSequence { }

import {AuthenticateFn, AuthenticationBindings, AUTHENTICATION_STRATEGY_NOT_FOUND, USER_PROFILE_NOT_FOUND} from '@loopback/authentication';
import {inject} from '@loopback/context';
import {
  FindRoute,
  InvokeMethod,
  ParseParams,
  Reject,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler
} from '@loopback/rest';

const SequenceActions = RestBindings.SequenceActions;

export class MySequence implements SequenceHandler {
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
    @inject(AuthenticationBindings.AUTH_ACTION)
    protected authenticateRequest: AuthenticateFn,
  ) { }

  async handle(context: RequestContext) {
    try {
      const {request, response} = context;
      const route = this.findRoute(request);
      await this.authenticateRequest(request);
      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);
      this.send(response, result);
    } catch (error) {
      if (error.code == AUTHENTICATION_STRATEGY_NOT_FOUND ||
        error.code == USER_PROFILE_NOT_FOUND
      ) {
        Object.assign(error, {statusCode: 404});
      }
      this.reject(context, error);


    }
  }
}

