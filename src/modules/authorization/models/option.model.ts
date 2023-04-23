export interface AuthorizationOptions<T = string> {
  modelPath: string;
  policyAdapter: T;
  isGlobal?: boolean;
}
