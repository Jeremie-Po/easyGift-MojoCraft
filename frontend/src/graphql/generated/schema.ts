import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTimeISO: any;
};

export type Avatar = {
  __typename?: 'Avatar';
  id: Scalars['Int'];
  name: Scalars['String'];
  type: Scalars['String'];
  url: Scalars['String'];
};

export type Discussion = {
  __typename?: 'Discussion';
  created_at: Scalars['String'];
  group: Group;
  id: Scalars['Int'];
  modified_at: Scalars['String'];
  userDiscussion: User;
  users: Array<User>;
};

export type Group = {
  __typename?: 'Group';
  avatar: Avatar;
  created_at: Scalars['String'];
  discussions: Array<Discussion>;
  event_date?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  modified_at: Scalars['String'];
  name: Scalars['String'];
  userToGroups: Array<UserToGroup>;
};

export type GroupDiscussionsResponse = {
  __typename?: 'GroupDiscussionsResponse';
  discussions: Array<Discussion>;
  groupAvatarUrl: Scalars['String'];
  groupName: Scalars['String'];
};

export type InputLogin = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type InputRegister = {
  avatar?: InputMaybe<ObjectId>;
  birthday?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
  pseudo?: InputMaybe<Scalars['String']>;
};

export type InputRegistrationWithToken = {
  password: Scalars['String'];
  pseudo: Scalars['String'];
  token: Scalars['String'];
};

export type InputUpdateAvatar = {
  avatarId: Scalars['Int'];
};

export type InputUpdatePassword = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type InputUpdateUser = {
  email?: InputMaybe<Scalars['String']>;
  pseudo?: InputMaybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String'];
  created_at: Scalars['String'];
  discussion: Discussion;
  id: Scalars['Int'];
  modified_at: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addNewGroup: Group;
  addNewMembersToGroup: Group;
  createMessage: Message;
  forgotPassword: ResponseMessage;
  register: UserWithoutPassword;
  registrationWithToken: UserWithoutPassword;
  resetPassword: ResponseMessage;
  updateAvatar: UserWithoutPasswordAvatar;
  updateGroup: Group;
  updateGroupAvatar: Group;
  updatePassword: ResponseMessage;
  updateUser: UserWithoutPassword;
};


export type MutationAddNewGroupArgs = {
  data: NewGroupInput;
};


export type MutationAddNewMembersToGroupArgs = {
  data: AddNewMemberToGroup;
  groupId: Scalars['Float'];
};


export type MutationCreateMessageArgs = {
  content: Scalars['String'];
  discussionId: Scalars['Float'];
  userId: Scalars['Float'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: InputRegister;
};


export type MutationRegistrationWithTokenArgs = {
  data: InputRegistrationWithToken;
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationUpdateAvatarArgs = {
  data: InputUpdateAvatar;
};


export type MutationUpdateGroupArgs = {
  data: UpdateGroupInput;
  groupId: Scalars['Float'];
};


export type MutationUpdateGroupAvatarArgs = {
  avatar_id: Scalars['Float'];
  group_id: Scalars['Float'];
};


export type MutationUpdatePasswordArgs = {
  data: InputUpdatePassword;
};


export type MutationUpdateUserArgs = {
  data: InputUpdateUser;
};

export type NewGroupInput = {
  emailUsers: Array<Scalars['String']>;
  event_date: Scalars['String'];
  name: Scalars['String'];
};

export type ObjectId = {
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getDiscussionById: Discussion;
  getDiscussions: Array<Discussion>;
  getDiscussionsByGroupIdWithoutCtxUser: GroupDiscussionsResponse;
  getGroupById: Group;
  getMessagesByDisscution: Array<Message>;
  getUserByToken: User;
  getUserInfos: UserInfos;
  getUsersByGroup: Array<Group>;
  groupAvatars: Array<Avatar>;
  groups: Array<Group>;
  login: ResponseMessage;
  logout: ResponseMessage;
  profilAvatars: Array<Avatar>;
  testAuthorized: ResponseMessage;
  userGroups: Array<Group>;
  users: Array<User>;
  usersToGroups: Array<UserToGroup>;
};


export type QueryGetDiscussionByIdArgs = {
  discussionId: Scalars['Float'];
};


export type QueryGetDiscussionsByGroupIdWithoutCtxUserArgs = {
  groupId: Scalars['Float'];
};


export type QueryGetGroupByIdArgs = {
  groupId: Scalars['Int'];
};


export type QueryGetMessagesByDisscutionArgs = {
  discussionId: Scalars['Float'];
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
};


export type QueryGetUserByTokenArgs = {
  token: Scalars['String'];
};


export type QueryGetUsersByGroupArgs = {
  id: Scalars['Float'];
};


export type QueryLoginArgs = {
  infos: InputLogin;
};

export type ResponseMessage = {
  __typename?: 'ResponseMessage';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newDiscussion: Discussion;
  newMessage: Message;
};


export type SubscriptionNewMessageArgs = {
  discussionId: Scalars['Float'];
};

export type UpdateGroupInput = {
  event_date?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Avatar>;
  birthday?: Maybe<Scalars['DateTimeISO']>;
  created_at: Scalars['String'];
  discussions: Array<Discussion>;
  email: Scalars['String'];
  id: Scalars['Int'];
  modified_at: Scalars['String'];
  pseudo: Scalars['String'];
  userToGroups: Array<UserToGroup>;
  validated_email?: Maybe<Scalars['DateTimeISO']>;
};

export type UserInfos = {
  __typename?: 'UserInfos';
  avatar?: Maybe<Avatar>;
  email: Scalars['String'];
  id: Scalars['String'];
  pseudo: Scalars['String'];
};

export type UserToGroup = {
  __typename?: 'UserToGroup';
  created_at: Scalars['String'];
  group_id: Scalars['Float'];
  id: Scalars['Int'];
  is_admin: Scalars['Boolean'];
  modified_at: Scalars['String'];
  user: User;
  user_id: Scalars['Float'];
};

export type UserWithoutPassword = {
  __typename?: 'UserWithoutPassword';
  email: Scalars['String'];
  pseudo: Scalars['String'];
};

export type UserWithoutPasswordAvatar = {
  __typename?: 'UserWithoutPasswordAvatar';
  avatar: Avatar;
  email: Scalars['String'];
  pseudo: Scalars['String'];
};

export type AddNewMemberToGroup = {
  emailUsers: Array<Scalars['String']>;
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ResponseMessage', success: boolean, message: string } };

export type ResetPasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'ResponseMessage', success: boolean, message: string } };

export type UpdateAvatarMutationVariables = Exact<{
  data: InputUpdateAvatar;
}>;


export type UpdateAvatarMutation = { __typename?: 'Mutation', updateAvatar: { __typename?: 'UserWithoutPasswordAvatar', email: string, pseudo: string, avatar: { __typename?: 'Avatar', url: string, id: number, name: string } } };

export type UpdateGroupMutationVariables = Exact<{
  data: UpdateGroupInput;
  groupId: Scalars['Float'];
}>;


export type UpdateGroupMutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'Group', created_at: string, event_date?: string | null, id: number, name: string, avatar: { __typename?: 'Avatar', id: number, url: string }, userToGroups: Array<{ __typename?: 'UserToGroup', is_admin: boolean, group_id: number, user_id: number, user: { __typename?: 'User', birthday?: any | null, email: string, id: number, pseudo: string, avatar?: { __typename?: 'Avatar', id: number, url: string } | null } }> } };

export type AddNewGroupMutationVariables = Exact<{
  data: NewGroupInput;
}>;


export type AddNewGroupMutation = { __typename?: 'Mutation', addNewGroup: { __typename?: 'Group', id: number, name: string, event_date?: string | null, avatar: { __typename?: 'Avatar', id: number, name: string } } };

export type AddNewMembersToGroupMutationVariables = Exact<{
  data: AddNewMemberToGroup;
  groupId: Scalars['Float'];
}>;


export type AddNewMembersToGroupMutation = { __typename?: 'Mutation', addNewMembersToGroup: { __typename?: 'Group', created_at: string, event_date?: string | null, id: number, name: string, avatar: { __typename?: 'Avatar', id: number, url: string }, userToGroups: Array<{ __typename?: 'UserToGroup', is_admin: boolean, group_id: number, user_id: number, user: { __typename?: 'User', birthday?: any | null, email: string, id: number, pseudo: string, avatar?: { __typename?: 'Avatar', id: number, url: string } | null } }> } };

export type AddNewMessageSubscriptionVariables = Exact<{
  discussionId: Scalars['Float'];
}>;


export type AddNewMessageSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'Message', id: number, content: string, created_at: string, modified_at: string, user: { __typename?: 'User', id: number, pseudo: string, avatar?: { __typename?: 'Avatar', url: string } | null } } };

export type CreateMessageMutationVariables = Exact<{
  discussionId: Scalars['Float'];
  userId: Scalars['Float'];
  content: Scalars['String'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', id: number, content: string, created_at: string, modified_at: string, user: { __typename?: 'User', id: number, pseudo: string, avatar?: { __typename?: 'Avatar', url: string } | null }, discussion: { __typename?: 'Discussion', id: number } } };

export type GetDiscussionsByGroupIdWithoutCtxUserQueryVariables = Exact<{
  groupId: Scalars['Float'];
}>;


export type GetDiscussionsByGroupIdWithoutCtxUserQuery = { __typename?: 'Query', getDiscussionsByGroupIdWithoutCtxUser: { __typename?: 'GroupDiscussionsResponse', groupAvatarUrl: string, groupName: string, discussions: Array<{ __typename?: 'Discussion', id: number, userDiscussion: { __typename?: 'User', pseudo: string, id: number, avatar?: { __typename?: 'Avatar', url: string } | null } }> } };

export type GroupAvatarsQueryVariables = Exact<{ [key: string]: never; }>;


export type GroupAvatarsQuery = { __typename?: 'Query', groupAvatars: Array<{ __typename?: 'Avatar', id: number, name: string, type: string, url: string }> };

export type GetGroupByIdQueryVariables = Exact<{
  groupId: Scalars['Int'];
}>;


export type GetGroupByIdQuery = { __typename?: 'Query', getGroupById: { __typename?: 'Group', id: number, name: string, created_at: string, event_date?: string | null, userToGroups: Array<{ __typename?: 'UserToGroup', is_admin: boolean, user_id: number, group_id: number, user: { __typename?: 'User', email: string, pseudo: string, avatar?: { __typename?: 'Avatar', id: number, url: string, name: string } | null } }>, avatar: { __typename?: 'Avatar', id: number, url: string, name: string }, discussions: Array<{ __typename?: 'Discussion', id: number, userDiscussion: { __typename?: 'User', id: number } }> } };

export type GetMessagesByDisscutionQueryVariables = Exact<{
  discussionId: Scalars['Float'];
  offset: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type GetMessagesByDisscutionQuery = { __typename?: 'Query', getMessagesByDisscution: Array<{ __typename?: 'Message', id: number, content: string, created_at: string, modified_at: string, user: { __typename?: 'User', id: number, pseudo: string, avatar?: { __typename?: 'Avatar', url: string } | null } }> };

export type ProfilAvatarsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfilAvatarsQuery = { __typename?: 'Query', profilAvatars: Array<{ __typename?: 'Avatar', id: number, name: string, url: string }> };

export type GetUserByTokenQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type GetUserByTokenQuery = { __typename?: 'Query', getUserByToken: { __typename?: 'User', email: string, pseudo: string } };

export type UserGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserGroupsQuery = { __typename?: 'Query', userGroups: Array<{ __typename?: 'Group', id: number, name: string, event_date?: string | null, created_at: string, avatar: { __typename?: 'Avatar', id: number, name: string, url: string }, userToGroups: Array<{ __typename?: 'UserToGroup', id: number, user: { __typename?: 'User', id: number, pseudo: string, email: string, avatar?: { __typename?: 'Avatar', id: number, name: string, url: string } | null } }>, discussions: Array<{ __typename?: 'Discussion', id: number, users: Array<{ __typename?: 'User', id: number, pseudo: string, avatar?: { __typename?: 'Avatar', id: number, url: string } | null }>, userDiscussion: { __typename?: 'User', id: number, pseudo: string } }> }> };

export type GetUserInfosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserInfosQuery = { __typename?: 'Query', getUserInfos: { __typename?: 'UserInfos', id: string, email: string, pseudo: string, avatar?: { __typename?: 'Avatar', id: number, name: string, url: string } | null } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', email: string, id: number, pseudo: string, avatar?: { __typename?: 'Avatar', url: string } | null }> };

export type LoginQueryVariables = Exact<{
  infos: InputLogin;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'ResponseMessage', message: string, success: boolean } };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout: { __typename?: 'ResponseMessage', success: boolean, message: string } };

export type RegisterUserMutationVariables = Exact<{
  data: InputRegister;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', register: { __typename?: 'UserWithoutPassword', email: string, pseudo: string } };

export type RegisterWithTokenMutationVariables = Exact<{
  data: InputRegistrationWithToken;
}>;


export type RegisterWithTokenMutation = { __typename?: 'Mutation', registrationWithToken: { __typename?: 'UserWithoutPassword', email: string, pseudo: string } };

export type UpdateGroupAvatarMutationVariables = Exact<{
  avatarId: Scalars['Float'];
  groupId: Scalars['Float'];
}>;


export type UpdateGroupAvatarMutation = { __typename?: 'Mutation', updateGroupAvatar: { __typename?: 'Group', id: number, name: string, created_at: string, modified_at: string, event_date?: string | null, avatar: { __typename?: 'Avatar', name: string, type: string, url: string } } };

export type UpdatePasswordMutationVariables = Exact<{
  data: InputUpdatePassword;
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword: { __typename?: 'ResponseMessage', success: boolean, message: string } };

export type UpdateUserMutationVariables = Exact<{
  data: InputUpdateUser;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserWithoutPassword', email: string, pseudo: string } };


export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    success
    message
  }
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($newPassword: String!, $token: String!) {
  resetPassword(newPassword: $newPassword, token: $token) {
    success
    message
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const UpdateAvatarDocument = gql`
    mutation UpdateAvatar($data: InputUpdateAvatar!) {
  updateAvatar(data: $data) {
    email
    pseudo
    avatar {
      url
      id
      name
    }
  }
}
    `;
export type UpdateAvatarMutationFn = Apollo.MutationFunction<UpdateAvatarMutation, UpdateAvatarMutationVariables>;

/**
 * __useUpdateAvatarMutation__
 *
 * To run a mutation, you first call `useUpdateAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAvatarMutation, { data, loading, error }] = useUpdateAvatarMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateAvatarMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAvatarMutation, UpdateAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAvatarMutation, UpdateAvatarMutationVariables>(UpdateAvatarDocument, options);
      }
export type UpdateAvatarMutationHookResult = ReturnType<typeof useUpdateAvatarMutation>;
export type UpdateAvatarMutationResult = Apollo.MutationResult<UpdateAvatarMutation>;
export type UpdateAvatarMutationOptions = Apollo.BaseMutationOptions<UpdateAvatarMutation, UpdateAvatarMutationVariables>;
export const UpdateGroupDocument = gql`
    mutation UpdateGroup($data: UpdateGroupInput!, $groupId: Float!) {
  updateGroup(data: $data, groupId: $groupId) {
    avatar {
      id
      url
    }
    created_at
    event_date
    id
    name
    userToGroups {
      is_admin
      group_id
      user_id
      user {
        avatar {
          id
          url
        }
        birthday
        email
        id
        pseudo
      }
    }
  }
}
    `;
export type UpdateGroupMutationFn = Apollo.MutationFunction<UpdateGroupMutation, UpdateGroupMutationVariables>;

/**
 * __useUpdateGroupMutation__
 *
 * To run a mutation, you first call `useUpdateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupMutation, { data, loading, error }] = useUpdateGroupMutation({
 *   variables: {
 *      data: // value for 'data'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useUpdateGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGroupMutation, UpdateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGroupMutation, UpdateGroupMutationVariables>(UpdateGroupDocument, options);
      }
export type UpdateGroupMutationHookResult = ReturnType<typeof useUpdateGroupMutation>;
export type UpdateGroupMutationResult = Apollo.MutationResult<UpdateGroupMutation>;
export type UpdateGroupMutationOptions = Apollo.BaseMutationOptions<UpdateGroupMutation, UpdateGroupMutationVariables>;
export const AddNewGroupDocument = gql`
    mutation AddNewGroup($data: NewGroupInput!) {
  addNewGroup(data: $data) {
    id
    name
    event_date
    avatar {
      id
      name
    }
  }
}
    `;
export type AddNewGroupMutationFn = Apollo.MutationFunction<AddNewGroupMutation, AddNewGroupMutationVariables>;

/**
 * __useAddNewGroupMutation__
 *
 * To run a mutation, you first call `useAddNewGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNewGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNewGroupMutation, { data, loading, error }] = useAddNewGroupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddNewGroupMutation(baseOptions?: Apollo.MutationHookOptions<AddNewGroupMutation, AddNewGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddNewGroupMutation, AddNewGroupMutationVariables>(AddNewGroupDocument, options);
      }
export type AddNewGroupMutationHookResult = ReturnType<typeof useAddNewGroupMutation>;
export type AddNewGroupMutationResult = Apollo.MutationResult<AddNewGroupMutation>;
export type AddNewGroupMutationOptions = Apollo.BaseMutationOptions<AddNewGroupMutation, AddNewGroupMutationVariables>;
export const AddNewMembersToGroupDocument = gql`
    mutation AddNewMembersToGroup($data: addNewMemberToGroup!, $groupId: Float!) {
  addNewMembersToGroup(data: $data, groupId: $groupId) {
    avatar {
      id
      url
    }
    created_at
    event_date
    id
    name
    userToGroups {
      is_admin
      group_id
      user_id
      user {
        avatar {
          id
          url
        }
        birthday
        email
        id
        pseudo
      }
    }
  }
}
    `;
export type AddNewMembersToGroupMutationFn = Apollo.MutationFunction<AddNewMembersToGroupMutation, AddNewMembersToGroupMutationVariables>;

/**
 * __useAddNewMembersToGroupMutation__
 *
 * To run a mutation, you first call `useAddNewMembersToGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNewMembersToGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNewMembersToGroupMutation, { data, loading, error }] = useAddNewMembersToGroupMutation({
 *   variables: {
 *      data: // value for 'data'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useAddNewMembersToGroupMutation(baseOptions?: Apollo.MutationHookOptions<AddNewMembersToGroupMutation, AddNewMembersToGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddNewMembersToGroupMutation, AddNewMembersToGroupMutationVariables>(AddNewMembersToGroupDocument, options);
      }
export type AddNewMembersToGroupMutationHookResult = ReturnType<typeof useAddNewMembersToGroupMutation>;
export type AddNewMembersToGroupMutationResult = Apollo.MutationResult<AddNewMembersToGroupMutation>;
export type AddNewMembersToGroupMutationOptions = Apollo.BaseMutationOptions<AddNewMembersToGroupMutation, AddNewMembersToGroupMutationVariables>;
export const AddNewMessageDocument = gql`
    subscription addNewMessage($discussionId: Float!) {
  newMessage(discussionId: $discussionId) {
    id
    content
    user {
      id
      pseudo
      avatar {
        url
      }
    }
    created_at
    modified_at
  }
}
    `;

/**
 * __useAddNewMessageSubscription__
 *
 * To run a query within a React component, call `useAddNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAddNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddNewMessageSubscription({
 *   variables: {
 *      discussionId: // value for 'discussionId'
 *   },
 * });
 */
export function useAddNewMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<AddNewMessageSubscription, AddNewMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<AddNewMessageSubscription, AddNewMessageSubscriptionVariables>(AddNewMessageDocument, options);
      }
export type AddNewMessageSubscriptionHookResult = ReturnType<typeof useAddNewMessageSubscription>;
export type AddNewMessageSubscriptionResult = Apollo.SubscriptionResult<AddNewMessageSubscription>;
export const CreateMessageDocument = gql`
    mutation createMessage($discussionId: Float!, $userId: Float!, $content: String!) {
  createMessage(discussionId: $discussionId, userId: $userId, content: $content) {
    id
    content
    user {
      id
      pseudo
      avatar {
        url
      }
    }
    discussion {
      id
    }
    created_at
    modified_at
  }
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      discussionId: // value for 'discussionId'
 *      userId: // value for 'userId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const GetDiscussionsByGroupIdWithoutCtxUserDocument = gql`
    query GetDiscussionsByGroupIdWithoutCtxUser($groupId: Float!) {
  getDiscussionsByGroupIdWithoutCtxUser(groupId: $groupId) {
    groupAvatarUrl
    groupName
    discussions {
      id
      userDiscussion {
        pseudo
        id
        avatar {
          url
        }
      }
    }
  }
}
    `;

/**
 * __useGetDiscussionsByGroupIdWithoutCtxUserQuery__
 *
 * To run a query within a React component, call `useGetDiscussionsByGroupIdWithoutCtxUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDiscussionsByGroupIdWithoutCtxUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDiscussionsByGroupIdWithoutCtxUserQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGetDiscussionsByGroupIdWithoutCtxUserQuery(baseOptions: Apollo.QueryHookOptions<GetDiscussionsByGroupIdWithoutCtxUserQuery, GetDiscussionsByGroupIdWithoutCtxUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDiscussionsByGroupIdWithoutCtxUserQuery, GetDiscussionsByGroupIdWithoutCtxUserQueryVariables>(GetDiscussionsByGroupIdWithoutCtxUserDocument, options);
      }
export function useGetDiscussionsByGroupIdWithoutCtxUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDiscussionsByGroupIdWithoutCtxUserQuery, GetDiscussionsByGroupIdWithoutCtxUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDiscussionsByGroupIdWithoutCtxUserQuery, GetDiscussionsByGroupIdWithoutCtxUserQueryVariables>(GetDiscussionsByGroupIdWithoutCtxUserDocument, options);
        }
export type GetDiscussionsByGroupIdWithoutCtxUserQueryHookResult = ReturnType<typeof useGetDiscussionsByGroupIdWithoutCtxUserQuery>;
export type GetDiscussionsByGroupIdWithoutCtxUserLazyQueryHookResult = ReturnType<typeof useGetDiscussionsByGroupIdWithoutCtxUserLazyQuery>;
export type GetDiscussionsByGroupIdWithoutCtxUserQueryResult = Apollo.QueryResult<GetDiscussionsByGroupIdWithoutCtxUserQuery, GetDiscussionsByGroupIdWithoutCtxUserQueryVariables>;
export const GroupAvatarsDocument = gql`
    query groupAvatars {
  groupAvatars {
    id
    name
    type
    url
  }
}
    `;

/**
 * __useGroupAvatarsQuery__
 *
 * To run a query within a React component, call `useGroupAvatarsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupAvatarsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupAvatarsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGroupAvatarsQuery(baseOptions?: Apollo.QueryHookOptions<GroupAvatarsQuery, GroupAvatarsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GroupAvatarsQuery, GroupAvatarsQueryVariables>(GroupAvatarsDocument, options);
      }
export function useGroupAvatarsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GroupAvatarsQuery, GroupAvatarsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GroupAvatarsQuery, GroupAvatarsQueryVariables>(GroupAvatarsDocument, options);
        }
export type GroupAvatarsQueryHookResult = ReturnType<typeof useGroupAvatarsQuery>;
export type GroupAvatarsLazyQueryHookResult = ReturnType<typeof useGroupAvatarsLazyQuery>;
export type GroupAvatarsQueryResult = Apollo.QueryResult<GroupAvatarsQuery, GroupAvatarsQueryVariables>;
export const GetGroupByIdDocument = gql`
    query GetGroupById($groupId: Int!) {
  getGroupById(groupId: $groupId) {
    id
    name
    created_at
    event_date
    userToGroups {
      is_admin
      user_id
      group_id
      user {
        avatar {
          id
          url
          name
        }
        email
        pseudo
      }
    }
    avatar {
      id
      url
      name
    }
    discussions {
      id
      userDiscussion {
        id
      }
    }
  }
}
    `;

/**
 * __useGetGroupByIdQuery__
 *
 * To run a query within a React component, call `useGetGroupByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupByIdQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGetGroupByIdQuery(baseOptions: Apollo.QueryHookOptions<GetGroupByIdQuery, GetGroupByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupByIdQuery, GetGroupByIdQueryVariables>(GetGroupByIdDocument, options);
      }
export function useGetGroupByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupByIdQuery, GetGroupByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupByIdQuery, GetGroupByIdQueryVariables>(GetGroupByIdDocument, options);
        }
export type GetGroupByIdQueryHookResult = ReturnType<typeof useGetGroupByIdQuery>;
export type GetGroupByIdLazyQueryHookResult = ReturnType<typeof useGetGroupByIdLazyQuery>;
export type GetGroupByIdQueryResult = Apollo.QueryResult<GetGroupByIdQuery, GetGroupByIdQueryVariables>;
export const GetMessagesByDisscutionDocument = gql`
    query getMessagesByDisscution($discussionId: Float!, $offset: Int!, $limit: Int!) {
  getMessagesByDisscution(
    discussionId: $discussionId
    offset: $offset
    limit: $limit
  ) {
    id
    content
    user {
      id
      pseudo
      avatar {
        url
      }
    }
    created_at
    modified_at
  }
}
    `;

/**
 * __useGetMessagesByDisscutionQuery__
 *
 * To run a query within a React component, call `useGetMessagesByDisscutionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesByDisscutionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesByDisscutionQuery({
 *   variables: {
 *      discussionId: // value for 'discussionId'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetMessagesByDisscutionQuery(baseOptions: Apollo.QueryHookOptions<GetMessagesByDisscutionQuery, GetMessagesByDisscutionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesByDisscutionQuery, GetMessagesByDisscutionQueryVariables>(GetMessagesByDisscutionDocument, options);
      }
export function useGetMessagesByDisscutionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesByDisscutionQuery, GetMessagesByDisscutionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesByDisscutionQuery, GetMessagesByDisscutionQueryVariables>(GetMessagesByDisscutionDocument, options);
        }
export type GetMessagesByDisscutionQueryHookResult = ReturnType<typeof useGetMessagesByDisscutionQuery>;
export type GetMessagesByDisscutionLazyQueryHookResult = ReturnType<typeof useGetMessagesByDisscutionLazyQuery>;
export type GetMessagesByDisscutionQueryResult = Apollo.QueryResult<GetMessagesByDisscutionQuery, GetMessagesByDisscutionQueryVariables>;
export const ProfilAvatarsDocument = gql`
    query ProfilAvatars {
  profilAvatars {
    id
    name
    url
  }
}
    `;

/**
 * __useProfilAvatarsQuery__
 *
 * To run a query within a React component, call `useProfilAvatarsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfilAvatarsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfilAvatarsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfilAvatarsQuery(baseOptions?: Apollo.QueryHookOptions<ProfilAvatarsQuery, ProfilAvatarsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfilAvatarsQuery, ProfilAvatarsQueryVariables>(ProfilAvatarsDocument, options);
      }
export function useProfilAvatarsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfilAvatarsQuery, ProfilAvatarsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfilAvatarsQuery, ProfilAvatarsQueryVariables>(ProfilAvatarsDocument, options);
        }
export type ProfilAvatarsQueryHookResult = ReturnType<typeof useProfilAvatarsQuery>;
export type ProfilAvatarsLazyQueryHookResult = ReturnType<typeof useProfilAvatarsLazyQuery>;
export type ProfilAvatarsQueryResult = Apollo.QueryResult<ProfilAvatarsQuery, ProfilAvatarsQueryVariables>;
export const GetUserByTokenDocument = gql`
    query GetUserByToken($token: String!) {
  getUserByToken(token: $token) {
    email
    pseudo
  }
}
    `;

/**
 * __useGetUserByTokenQuery__
 *
 * To run a query within a React component, call `useGetUserByTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useGetUserByTokenQuery(baseOptions: Apollo.QueryHookOptions<GetUserByTokenQuery, GetUserByTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByTokenQuery, GetUserByTokenQueryVariables>(GetUserByTokenDocument, options);
      }
export function useGetUserByTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByTokenQuery, GetUserByTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByTokenQuery, GetUserByTokenQueryVariables>(GetUserByTokenDocument, options);
        }
export type GetUserByTokenQueryHookResult = ReturnType<typeof useGetUserByTokenQuery>;
export type GetUserByTokenLazyQueryHookResult = ReturnType<typeof useGetUserByTokenLazyQuery>;
export type GetUserByTokenQueryResult = Apollo.QueryResult<GetUserByTokenQuery, GetUserByTokenQueryVariables>;
export const UserGroupsDocument = gql`
    query UserGroups {
  userGroups {
    id
    name
    event_date
    created_at
    avatar {
      id
      name
      url
    }
    userToGroups {
      id
      user {
        id
        pseudo
        avatar {
          id
          name
          url
        }
        email
      }
    }
    discussions {
      id
      users {
        id
        pseudo
        avatar {
          id
          url
        }
      }
      userDiscussion {
        id
        pseudo
      }
    }
  }
}
    `;

/**
 * __useUserGroupsQuery__
 *
 * To run a query within a React component, call `useUserGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserGroupsQuery(baseOptions?: Apollo.QueryHookOptions<UserGroupsQuery, UserGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserGroupsQuery, UserGroupsQueryVariables>(UserGroupsDocument, options);
      }
export function useUserGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserGroupsQuery, UserGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserGroupsQuery, UserGroupsQueryVariables>(UserGroupsDocument, options);
        }
export type UserGroupsQueryHookResult = ReturnType<typeof useUserGroupsQuery>;
export type UserGroupsLazyQueryHookResult = ReturnType<typeof useUserGroupsLazyQuery>;
export type UserGroupsQueryResult = Apollo.QueryResult<UserGroupsQuery, UserGroupsQueryVariables>;
export const GetUserInfosDocument = gql`
    query GetUserInfos {
  getUserInfos {
    id
    email
    pseudo
    avatar {
      id
      name
      url
    }
  }
}
    `;

/**
 * __useGetUserInfosQuery__
 *
 * To run a query within a React component, call `useGetUserInfosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserInfosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserInfosQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserInfosQuery(baseOptions?: Apollo.QueryHookOptions<GetUserInfosQuery, GetUserInfosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserInfosQuery, GetUserInfosQueryVariables>(GetUserInfosDocument, options);
      }
export function useGetUserInfosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserInfosQuery, GetUserInfosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserInfosQuery, GetUserInfosQueryVariables>(GetUserInfosDocument, options);
        }
export type GetUserInfosQueryHookResult = ReturnType<typeof useGetUserInfosQuery>;
export type GetUserInfosLazyQueryHookResult = ReturnType<typeof useGetUserInfosLazyQuery>;
export type GetUserInfosQueryResult = Apollo.QueryResult<GetUserInfosQuery, GetUserInfosQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    email
    id
    pseudo
    avatar {
      url
    }
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const LoginDocument = gql`
    query Login($infos: InputLogin!) {
  login(infos: $infos) {
    message
    success
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const LogoutDocument = gql`
    query Logout {
  logout {
    success
    message
  }
}
    `;

/**
 * __useLogoutQuery__
 *
 * To run a query within a React component, call `useLogoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useLogoutQuery(baseOptions?: Apollo.QueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
      }
export function useLogoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export type LogoutQueryHookResult = ReturnType<typeof useLogoutQuery>;
export type LogoutLazyQueryHookResult = ReturnType<typeof useLogoutLazyQuery>;
export type LogoutQueryResult = Apollo.QueryResult<LogoutQuery, LogoutQueryVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($data: InputRegister!) {
  register(data: $data) {
    email
    pseudo
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const RegisterWithTokenDocument = gql`
    mutation registerWithToken($data: InputRegistrationWithToken!) {
  registrationWithToken(data: $data) {
    email
    pseudo
  }
}
    `;
export type RegisterWithTokenMutationFn = Apollo.MutationFunction<RegisterWithTokenMutation, RegisterWithTokenMutationVariables>;

/**
 * __useRegisterWithTokenMutation__
 *
 * To run a mutation, you first call `useRegisterWithTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterWithTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerWithTokenMutation, { data, loading, error }] = useRegisterWithTokenMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterWithTokenMutation(baseOptions?: Apollo.MutationHookOptions<RegisterWithTokenMutation, RegisterWithTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterWithTokenMutation, RegisterWithTokenMutationVariables>(RegisterWithTokenDocument, options);
      }
export type RegisterWithTokenMutationHookResult = ReturnType<typeof useRegisterWithTokenMutation>;
export type RegisterWithTokenMutationResult = Apollo.MutationResult<RegisterWithTokenMutation>;
export type RegisterWithTokenMutationOptions = Apollo.BaseMutationOptions<RegisterWithTokenMutation, RegisterWithTokenMutationVariables>;
export const UpdateGroupAvatarDocument = gql`
    mutation UpdateGroupAvatar($avatarId: Float!, $groupId: Float!) {
  updateGroupAvatar(avatar_id: $avatarId, group_id: $groupId) {
    id
    name
    created_at
    modified_at
    avatar {
      name
      type
      url
    }
    event_date
  }
}
    `;
export type UpdateGroupAvatarMutationFn = Apollo.MutationFunction<UpdateGroupAvatarMutation, UpdateGroupAvatarMutationVariables>;

/**
 * __useUpdateGroupAvatarMutation__
 *
 * To run a mutation, you first call `useUpdateGroupAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupAvatarMutation, { data, loading, error }] = useUpdateGroupAvatarMutation({
 *   variables: {
 *      avatarId: // value for 'avatarId'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useUpdateGroupAvatarMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGroupAvatarMutation, UpdateGroupAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGroupAvatarMutation, UpdateGroupAvatarMutationVariables>(UpdateGroupAvatarDocument, options);
      }
export type UpdateGroupAvatarMutationHookResult = ReturnType<typeof useUpdateGroupAvatarMutation>;
export type UpdateGroupAvatarMutationResult = Apollo.MutationResult<UpdateGroupAvatarMutation>;
export type UpdateGroupAvatarMutationOptions = Apollo.BaseMutationOptions<UpdateGroupAvatarMutation, UpdateGroupAvatarMutationVariables>;
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($data: InputUpdatePassword!) {
  updatePassword(data: $data) {
    success
    message
  }
}
    `;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, options);
      }
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($data: InputUpdateUser!) {
  updateUser(data: $data) {
    email
    pseudo
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;