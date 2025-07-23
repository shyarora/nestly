import { gql } from "@apollo/client";

export const GET_ME = gql`
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

export const VALIDATE_TOKEN = gql`
  query ValidateToken {
    validateToken
  }
`;

export const GOOGLE_AUTH = gql`
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

export const REFRESH_TOKEN = gql`
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

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const UPDATE_PROFILE = gql`
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

export const VERIFY_PHONE = gql`
  mutation VerifyPhone($input: VerifyPhoneInput!) {
    verifyPhone(input: $input)
  }
`;

export const UPDATE_USER_ROLES = gql`
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
