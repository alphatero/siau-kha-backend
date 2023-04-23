export interface IAuthorizationOptions<T = string> {
  modelPath: string;
  policyAdapter: T;
  global?: boolean;
}
