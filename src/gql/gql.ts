/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetMe {\n    me {\n      id\n      email\n      firstName\n      lastName\n      avatar\n      phone\n      isPhoneVerified\n      roles\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetMeDocument,
    "\n  query ValidateToken {\n    validateToken\n  }\n": typeof types.ValidateTokenDocument,
    "\n  mutation GoogleAuth($input: GoogleAuthInput!) {\n    googleAuth(input: $input) {\n      user {\n        id\n        email\n        firstName\n        lastName\n        avatar\n        phone\n        isPhoneVerified\n        roles\n        createdAt\n        updatedAt\n      }\n      accessToken\n      refreshToken\n    }\n  }\n": typeof types.GoogleAuthDocument,
    "\n  mutation RefreshToken($token: String!) {\n    refreshToken(token: $token) {\n      user {\n        id\n        email\n        firstName\n        lastName\n        avatar\n        phone\n        isPhoneVerified\n        roles\n        createdAt\n        updatedAt\n      }\n      accessToken\n      refreshToken\n    }\n  }\n": typeof types.RefreshTokenDocument,
    "\n  mutation Logout {\n    logout\n  }\n": typeof types.LogoutDocument,
    "\n  mutation UpdateProfile($input: UpdateProfileInput!) {\n    updateProfile(input: $input) {\n      id\n      email\n      firstName\n      lastName\n      avatar\n      phone\n      isPhoneVerified\n      roles\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateProfileDocument,
    "\n  mutation VerifyPhone($input: VerifyPhoneInput!) {\n    verifyPhone(input: $input)\n  }\n": typeof types.VerifyPhoneDocument,
    "\n  mutation UpdateUserRoles($userId: ID!, $roles: [String!]!) {\n    updateUserRoles(userId: $userId, roles: $roles) {\n      id\n      email\n      firstName\n      lastName\n      avatar\n      phone\n      isPhoneVerified\n      roles\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateUserRolesDocument,
};
const documents: Documents = {
    "\n  query GetMe {\n    me {\n      id\n      email\n      firstName\n      lastName\n      avatar\n      phone\n      isPhoneVerified\n      roles\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetMeDocument,
    "\n  query ValidateToken {\n    validateToken\n  }\n": types.ValidateTokenDocument,
    "\n  mutation GoogleAuth($input: GoogleAuthInput!) {\n    googleAuth(input: $input) {\n      user {\n        id\n        email\n        firstName\n        lastName\n        avatar\n        phone\n        isPhoneVerified\n        roles\n        createdAt\n        updatedAt\n      }\n      accessToken\n      refreshToken\n    }\n  }\n": types.GoogleAuthDocument,
    "\n  mutation RefreshToken($token: String!) {\n    refreshToken(token: $token) {\n      user {\n        id\n        email\n        firstName\n        lastName\n        avatar\n        phone\n        isPhoneVerified\n        roles\n        createdAt\n        updatedAt\n      }\n      accessToken\n      refreshToken\n    }\n  }\n": types.RefreshTokenDocument,
    "\n  mutation Logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n  mutation UpdateProfile($input: UpdateProfileInput!) {\n    updateProfile(input: $input) {\n      id\n      email\n      firstName\n      lastName\n      avatar\n      phone\n      isPhoneVerified\n      roles\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateProfileDocument,
    "\n  mutation VerifyPhone($input: VerifyPhoneInput!) {\n    verifyPhone(input: $input)\n  }\n": types.VerifyPhoneDocument,
    "\n  mutation UpdateUserRoles($userId: ID!, $roles: [String!]!) {\n    updateUserRoles(userId: $userId, roles: $roles) {\n      id\n      email\n      firstName\n      lastName\n      avatar\n      phone\n      isPhoneVerified\n      roles\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateUserRolesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMe {\n    me {\n      id\n      email\n      firstName\n      lastName\n      avatar\n      phone\n      isPhoneVerified\n      roles\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetMe {\n    me {\n      id\n      email\n      firstName\n      lastName\n      avatar\n      phone\n      isPhoneVerified\n      roles\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ValidateToken {\n    validateToken\n  }\n"): (typeof documents)["\n  query ValidateToken {\n    validateToken\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation GoogleAuth($input: GoogleAuthInput!) {\n    googleAuth(input: $input) {\n      user {\n        id\n        email\n        firstName\n        lastName\n        avatar\n        phone\n        isPhoneVerified\n        roles\n        createdAt\n        updatedAt\n      }\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation GoogleAuth($input: GoogleAuthInput!) {\n    googleAuth(input: $input) {\n      user {\n        id\n        email\n        firstName\n        lastName\n        avatar\n        phone\n        isPhoneVerified\n        roles\n        createdAt\n        updatedAt\n      }\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RefreshToken($token: String!) {\n    refreshToken(token: $token) {\n      user {\n        id\n        email\n        firstName\n        lastName\n        avatar\n        phone\n        isPhoneVerified\n        roles\n        createdAt\n        updatedAt\n      }\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation RefreshToken($token: String!) {\n    refreshToken(token: $token) {\n      user {\n        id\n        email\n        firstName\n        lastName\n        avatar\n        phone\n        isPhoneVerified\n        roles\n        createdAt\n        updatedAt\n      }\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logout\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateProfile($input: UpdateProfileInput!) {\n    updateProfile(input: $input) {\n      id\n      email\n      firstName\n      lastName\n      avatar\n      phone\n      isPhoneVerified\n      roles\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProfile($input: UpdateProfileInput!) {\n    updateProfile(input: $input) {\n      id\n      email\n      firstName\n      lastName\n      avatar\n      phone\n      isPhoneVerified\n      roles\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation VerifyPhone($input: VerifyPhoneInput!) {\n    verifyPhone(input: $input)\n  }\n"): (typeof documents)["\n  mutation VerifyPhone($input: VerifyPhoneInput!) {\n    verifyPhone(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUserRoles($userId: ID!, $roles: [String!]!) {\n    updateUserRoles(userId: $userId, roles: $roles) {\n      id\n      email\n      firstName\n      lastName\n      avatar\n      phone\n      isPhoneVerified\n      roles\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserRoles($userId: ID!, $roles: [String!]!) {\n    updateUserRoles(userId: $userId, roles: $roles) {\n      id\n      email\n      firstName\n      lastName\n      avatar\n      phone\n      isPhoneVerified\n      roles\n      createdAt\n      updatedAt\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;