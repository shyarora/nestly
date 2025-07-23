import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: User;
};

export type GoogleAuthInput = {
  googleIdToken: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  googleAuth: AuthPayload;
  logout: Scalars['Boolean']['output'];
  refreshToken: AuthPayload;
  updateProfile: User;
  updateUserRoles: User;
  verifyPhone: Scalars['Boolean']['output'];
};


export type MutationGoogleAuthArgs = {
  input: GoogleAuthInput;
};


export type MutationRefreshTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


export type MutationUpdateUserRolesArgs = {
  roles: Array<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};


export type MutationVerifyPhoneArgs = {
  input: VerifyPhoneInput;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
  livez: Scalars['String']['output'];
  me?: Maybe<User>;
  readyz: Scalars['String']['output'];
  validateToken: Scalars['Boolean']['output'];
};

export type UpdateProfileInput = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isPhoneVerified: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  roles: Array<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type VerifyPhoneInput = {
  phone: Scalars['String']['input'];
  verificationCode: Scalars['String']['input'];
};

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, avatar?: string | null, phone?: string | null, isPhoneVerified: boolean, roles: Array<string>, createdAt: string, updatedAt: string } | null };

export type ValidateTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidateTokenQuery = { __typename?: 'Query', validateToken: boolean };

export type GoogleAuthMutationVariables = Exact<{
  input: GoogleAuthInput;
}>;


export type GoogleAuthMutation = { __typename?: 'Mutation', googleAuth: { __typename?: 'AuthPayload', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, avatar?: string | null, phone?: string | null, isPhoneVerified: boolean, roles: Array<string>, createdAt: string, updatedAt: string } } };

export type RefreshTokenMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'AuthPayload', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, avatar?: string | null, phone?: string | null, isPhoneVerified: boolean, roles: Array<string>, createdAt: string, updatedAt: string } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, avatar?: string | null, phone?: string | null, isPhoneVerified: boolean, roles: Array<string>, createdAt: string, updatedAt: string } };

export type VerifyPhoneMutationVariables = Exact<{
  input: VerifyPhoneInput;
}>;


export type VerifyPhoneMutation = { __typename?: 'Mutation', verifyPhone: boolean };

export type UpdateUserRolesMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  roles: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type UpdateUserRolesMutation = { __typename?: 'Mutation', updateUserRoles: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, avatar?: string | null, phone?: string | null, isPhoneVerified: boolean, roles: Array<string>, createdAt: string, updatedAt: string } };

export type GetPropertiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPropertiesQuery = { __typename: 'Query' };

export type GetPropertyByIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPropertyByIdQuery = { __typename: 'Query' };


export const GetMeDocument = gql`
    query GetMe {
  me {
    id
    email
    firstName
    lastName
    avatar
    phone
    isPhoneVerified
    roles
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export function useGetMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeSuspenseQueryHookResult = ReturnType<typeof useGetMeSuspenseQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const ValidateTokenDocument = gql`
    query ValidateToken {
  validateToken
}
    `;

/**
 * __useValidateTokenQuery__
 *
 * To run a query within a React component, call `useValidateTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useValidateTokenQuery(baseOptions?: Apollo.QueryHookOptions<ValidateTokenQuery, ValidateTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidateTokenQuery, ValidateTokenQueryVariables>(ValidateTokenDocument, options);
      }
export function useValidateTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidateTokenQuery, ValidateTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidateTokenQuery, ValidateTokenQueryVariables>(ValidateTokenDocument, options);
        }
export function useValidateTokenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ValidateTokenQuery, ValidateTokenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ValidateTokenQuery, ValidateTokenQueryVariables>(ValidateTokenDocument, options);
        }
export type ValidateTokenQueryHookResult = ReturnType<typeof useValidateTokenQuery>;
export type ValidateTokenLazyQueryHookResult = ReturnType<typeof useValidateTokenLazyQuery>;
export type ValidateTokenSuspenseQueryHookResult = ReturnType<typeof useValidateTokenSuspenseQuery>;
export type ValidateTokenQueryResult = Apollo.QueryResult<ValidateTokenQuery, ValidateTokenQueryVariables>;
export const GoogleAuthDocument = gql`
    mutation GoogleAuth($input: GoogleAuthInput!) {
  googleAuth(input: $input) {
    user {
      id
      email
      firstName
      lastName
      avatar
      phone
      isPhoneVerified
      roles
      createdAt
      updatedAt
    }
    accessToken
    refreshToken
  }
}
    `;
export type GoogleAuthMutationFn = Apollo.MutationFunction<GoogleAuthMutation, GoogleAuthMutationVariables>;

/**
 * __useGoogleAuthMutation__
 *
 * To run a mutation, you first call `useGoogleAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGoogleAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [googleAuthMutation, { data, loading, error }] = useGoogleAuthMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGoogleAuthMutation(baseOptions?: Apollo.MutationHookOptions<GoogleAuthMutation, GoogleAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GoogleAuthMutation, GoogleAuthMutationVariables>(GoogleAuthDocument, options);
      }
export type GoogleAuthMutationHookResult = ReturnType<typeof useGoogleAuthMutation>;
export type GoogleAuthMutationResult = Apollo.MutationResult<GoogleAuthMutation>;
export type GoogleAuthMutationOptions = Apollo.BaseMutationOptions<GoogleAuthMutation, GoogleAuthMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation RefreshToken($token: String!) {
  refreshToken(token: $token) {
    user {
      id
      email
      firstName
      lastName
      avatar
      phone
      isPhoneVerified
      roles
      createdAt
      updatedAt
    }
    accessToken
    refreshToken
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    id
    email
    firstName
    lastName
    avatar
    phone
    isPhoneVerified
    roles
    createdAt
    updatedAt
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const VerifyPhoneDocument = gql`
    mutation VerifyPhone($input: VerifyPhoneInput!) {
  verifyPhone(input: $input)
}
    `;
export type VerifyPhoneMutationFn = Apollo.MutationFunction<VerifyPhoneMutation, VerifyPhoneMutationVariables>;

/**
 * __useVerifyPhoneMutation__
 *
 * To run a mutation, you first call `useVerifyPhoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyPhoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyPhoneMutation, { data, loading, error }] = useVerifyPhoneMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyPhoneMutation(baseOptions?: Apollo.MutationHookOptions<VerifyPhoneMutation, VerifyPhoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyPhoneMutation, VerifyPhoneMutationVariables>(VerifyPhoneDocument, options);
      }
export type VerifyPhoneMutationHookResult = ReturnType<typeof useVerifyPhoneMutation>;
export type VerifyPhoneMutationResult = Apollo.MutationResult<VerifyPhoneMutation>;
export type VerifyPhoneMutationOptions = Apollo.BaseMutationOptions<VerifyPhoneMutation, VerifyPhoneMutationVariables>;
export const UpdateUserRolesDocument = gql`
    mutation UpdateUserRoles($userId: ID!, $roles: [String!]!) {
  updateUserRoles(userId: $userId, roles: $roles) {
    id
    email
    firstName
    lastName
    avatar
    phone
    isPhoneVerified
    roles
    createdAt
    updatedAt
  }
}
    `;
export type UpdateUserRolesMutationFn = Apollo.MutationFunction<UpdateUserRolesMutation, UpdateUserRolesMutationVariables>;

/**
 * __useUpdateUserRolesMutation__
 *
 * To run a mutation, you first call `useUpdateUserRolesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserRolesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserRolesMutation, { data, loading, error }] = useUpdateUserRolesMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      roles: // value for 'roles'
 *   },
 * });
 */
export function useUpdateUserRolesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserRolesMutation, UpdateUserRolesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserRolesMutation, UpdateUserRolesMutationVariables>(UpdateUserRolesDocument, options);
      }
export type UpdateUserRolesMutationHookResult = ReturnType<typeof useUpdateUserRolesMutation>;
export type UpdateUserRolesMutationResult = Apollo.MutationResult<UpdateUserRolesMutation>;
export type UpdateUserRolesMutationOptions = Apollo.BaseMutationOptions<UpdateUserRolesMutation, UpdateUserRolesMutationVariables>;
export const GetPropertiesDocument = gql`
    query GetProperties {
  __typename
}
    `;

/**
 * __useGetPropertiesQuery__
 *
 * To run a query within a React component, call `useGetPropertiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPropertiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPropertiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPropertiesQuery(baseOptions?: Apollo.QueryHookOptions<GetPropertiesQuery, GetPropertiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPropertiesQuery, GetPropertiesQueryVariables>(GetPropertiesDocument, options);
      }
export function useGetPropertiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPropertiesQuery, GetPropertiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPropertiesQuery, GetPropertiesQueryVariables>(GetPropertiesDocument, options);
        }
export function useGetPropertiesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPropertiesQuery, GetPropertiesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPropertiesQuery, GetPropertiesQueryVariables>(GetPropertiesDocument, options);
        }
export type GetPropertiesQueryHookResult = ReturnType<typeof useGetPropertiesQuery>;
export type GetPropertiesLazyQueryHookResult = ReturnType<typeof useGetPropertiesLazyQuery>;
export type GetPropertiesSuspenseQueryHookResult = ReturnType<typeof useGetPropertiesSuspenseQuery>;
export type GetPropertiesQueryResult = Apollo.QueryResult<GetPropertiesQuery, GetPropertiesQueryVariables>;
export const GetPropertyByIdDocument = gql`
    query GetPropertyById {
  __typename
}
    `;

/**
 * __useGetPropertyByIdQuery__
 *
 * To run a query within a React component, call `useGetPropertyByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPropertyByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPropertyByIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPropertyByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetPropertyByIdQuery, GetPropertyByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPropertyByIdQuery, GetPropertyByIdQueryVariables>(GetPropertyByIdDocument, options);
      }
export function useGetPropertyByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPropertyByIdQuery, GetPropertyByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPropertyByIdQuery, GetPropertyByIdQueryVariables>(GetPropertyByIdDocument, options);
        }
export function useGetPropertyByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPropertyByIdQuery, GetPropertyByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPropertyByIdQuery, GetPropertyByIdQueryVariables>(GetPropertyByIdDocument, options);
        }
export type GetPropertyByIdQueryHookResult = ReturnType<typeof useGetPropertyByIdQuery>;
export type GetPropertyByIdLazyQueryHookResult = ReturnType<typeof useGetPropertyByIdLazyQuery>;
export type GetPropertyByIdSuspenseQueryHookResult = ReturnType<typeof useGetPropertyByIdSuspenseQuery>;
export type GetPropertyByIdQueryResult = Apollo.QueryResult<GetPropertyByIdQuery, GetPropertyByIdQueryVariables>;