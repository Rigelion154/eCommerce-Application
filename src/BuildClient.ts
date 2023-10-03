import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { apiConstants, apiScopes } from './core/constants/apiConstants';

export const projectKey: string = 'commerce-shop';
export const { clientId } = apiConstants;
export const { clientSecret } = apiConstants;
// export const scopes = [`manage_project:${projectKey}`];
export const scopes = Object.values(apiScopes);

const authMiddlewareOptions: AuthMiddlewareOptions = {
  // host: 'https://auth.us-central1.gcp.commercetools.com',
  host: apiConstants.authUrl,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  // host: 'https://api.us-central1.gcp.commercetools.com',
  host: apiConstants.apiUrl,
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
