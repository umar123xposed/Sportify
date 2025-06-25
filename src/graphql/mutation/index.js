/* eslint-disable */

import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      message
      statusCode
      data {
        id
        phone
        full_name
        user_name
        email
        has_team
        picture
        account_type
        is_active
        isPayment
        is_notification
        profile_complete
        has_profile
        has_player
        created_at
        updated_at
        package_details
        role {
          name
          id
          created_at
        }
        meta
      }
      access_token
      refresh_token
    }
  }
`;

export const LOGOUT = gql`
mutation Logout($fcm: String) {
  logout(fcm: $fcm) {
    statusCode
    message
  }
}
`
//forget password
export const RESET = gql`
  mutation Mutation($input: RequestPasswordInput!) {
    requestPassowrd(input: $input) {
      message
      statusCode
      data
    }
  }
`

export const OTP = gql`
mutation Mutation($input: RequestVerifyInput!) {
  requestVerify(input: $input) {
    message
    statusCode
    data
  }
}

`


export const NEW_PASSWORD = gql`
mutation ResestPassword($input: ResetPasswordInput!) {
  resestPassword(input: $input) {
    message
    statusCode
  }
}
`



export const REFRESH_TOKEN = gql`
mutation RefreshToken($input: refreshTokenInput) {
  refreshToken(input: $input) {
    message
    data {
      accessToken
      refreshToken
    }
  }
}`

export const ADD_CATEGORY = gql`
  mutation Mutation($input: CreateCategoryInput!, $icon: Upload!) {
    createCategory(input: $input, icon: $icon) {
      message
      statusCode
    }
  }
`

export const DELETE_CATEGORY = gql`
mutation DeleteCategory($deleteCategoryId: Int!) {
  deleteCategory(id: $deleteCategoryId) {
    message
    statusCode
  }
}`

export const UPDATE_CATEGORY = gql`
mutation UpdateCategory($input: UpdateCategoryInput!, $icon: Upload) {
  updateCategory(input: $input, icon: $icon) {
    message
    statusCode
  }
}`


export const REFRESH = gql`
mutation Refresh($refreshToken: String!) {
  refresh(refreshToken: $refreshToken) {

    message
    statusCode
    accessToken
    refreshToken
  }
}`

export const SIGNUP = gql`
mutation Mutation($input: SignupInput!) {
  signup(input: $input) {
    access_token
    data {
    id
      account_type
      created_at
      email
      user_name
    }
    message
    refresh_token
    statusCode
  }
}`


export const COMPELETE_PROFILE = gql`
mutation Mutation($input: CompleteProfileInput!) {
  completeProfile(input: $input) {
    data
    message
    statusCode
  }
}`


export const CREATE_CHILD = gql`

mutation Mutation($input: ChildInput!) {
  createChildAccount(input: $input) {
    statusCode
    message
  }
}`

export const SEND_INVITE = gql`

mutation Mutation($sendInviteId: Int!) {
  sendInvite(id: $sendInviteId) {
    statusCode
    message
  }
}`

export const UPDATE_CHILD = gql`
mutation Mutation($input: ChildUpdateInput!) {
  updateChildAccount(input: $input) {
    message
    statusCode
  }
}`

export const CODE_PURCHASE = gql`
mutation Mutation($input: CreateCodePurchaseInput!) {
  createCodePurchase(input: $input) {
    statusCode
    message
    data {
      id
      user_id
      user {
        id
        phone
        full_name
        email
        picture
        account_type
        is_active
        is_notification
        profile_complete
        has_player
        created_at
        updated_at
        role {
          name
          id
          created_at
        }
        meta
      }
      parent_id
      package_id
      package {
        id
        name
        description
        price
        qr_type
        duration
        is_active
        created_at
        updated_at
      }
      price
      qr_code
      status
      subscription
      expires_at
      created_at
      updated_at
    }
  }
}`

export const UPDATE_CHILD_ACCOUNT = gql`
mutation UpdatePlayerProfile($input: UpdatePlayerProfileInput!) {
  updatePlayerProfile(input: $input) {
    message
    statusCode
  }
}`

export const UPDATE_CHILD_SPORT = gql`
mutation UpdateSportsProfile($input: UpdateSportsProfileInput!) {
  updateSportsProfile(input: $input) {
    message
    statusCode
  }
}`


export const CONTACT_FORM = gql`
  mutation Mutation($input: ContactInput!) {
    contactform(input: $input) {
      statusCode
      message
    }
 }`

export const CREATE_TEAM = gql`

mutation Mutation($input: CreateTeamInput!, $logo: Upload) {
  createTeam(input: $input, logo: $logo) {
    message
    statusCode
    data {
      id
      team_id
      name
      logo
      qr_code
      tie
      win
      loss
      user {
        id
        phone
        full_name
        email
        picture
        account_type
        is_active
        is_notification
        profile_complete
        has_player
        created_at
        updated_at
        role {
          id
          name
          created_at
        }
        meta
      }
    }
  }
}
`

export const UPDATE_PROFILE = gql`
mutation UpdateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    data {
      id
      phone
      full_name
      email
      picture
      account_type
      is_active
      is_notification
      profile_complete
      has_player
      created_at
      updated_at
      role {
        id
        name
        created_at
      }
      meta
    }
    message
    statusCode
  }
}`

export const UPDATE_TEAM = gql`
mutation Mutation($input: UpdateTeamInput!, $logo: Upload) {
  updateTeam(input: $input, logo: $logo) {
    message
    statusCode
    data {
      id
      team_id
      name
      logo
      team_level
      win
      loss
      tie

      status
      created_at
      updated_at
    }
  }
}
`
export const CHANGE_NOTIFICATION_STATUS = gql`
mutation Mutation($input: UpdateInviteInput!) {
  acceptRejectInvite(input: $input) {
    statusCode
    message
  }
}`

export const READ_NOTIFICATIONS = gql`
  mutation Mutation {
    readNotifications {
      statusCode
      message
    }
  }
`;
export const PLACE_ORDER = gql`
mutation Mutation($input: CreateVendorOrderInput!) {
  createVendorOrder(input: $input) {
    message
    statusCode
  }
}`

export const COACH_PURCHASE = gql`
mutation CreateCoachPurchase($input: CreateCoachPurchaseInput!) {
  createCoachPurchase(input: $input) {
    message
    statusCode
    data {
      id
      user_id
      user {
        id
        picture
        role {
          id
        }
      }
      parent_id
      package_id
      package {
        id
        name
        description
      }
      price
      qr_code
      status
      subscription
      expires_at
      created_at
      updated_at
    }
  }
}`


export const Create_Child = gql`
mutation CreateChildAccount($input: ChildCreateInput!) {
  createChildAccount(input: $input) {
    message
    statusCode
  }
}`

export const Create_Highlight = gql`
mutation CreateHighlight($input: CreateHighlightInput!) {
  createHighlight(input: $input) {
    id
    title
    media
    updated_at
  }
}`

export const Create_Sport = gql`
mutation AddSportProfile($input: addSportProfileInput!) {
  addSportProfile(input: $input) {
    message
    statusCode
  }
}`

export const RECRUITER_PURCHASE = gql`
mutation createRecuiterPurchase($input: CreateRecruiterPurchaseInput!) {
  createRecuiterPurchase(input: $input) {
    message
    statusCode
    data {
      id
      user_id
      user {
        id
        picture
        role {
          id
        }
      }
      parent_id
      package_id
      package {
        id
        name
        description
      }
      price
      qr_code
      status
      subscription
      expires_at
      created_at
      updated_at
    }
  }
}`

export const UPGRADE_SPORT_PROFILE = gql`
mutation UpgradeSportsProfile($input: UpgradeSportsProfileInput!) {
  upgradeSportsProfile(input: $input) {
    message
    statusCode
  }
}`

export const DELETE_FOLDER = gql`

mutation Mutation($input: DeleteFolderInput!) {
  deleteFolder(input: $input) {
    message
    statusCode
    data {
      id
      name
      user_id
      created_at
      updated_at
    }
  }
}`

export const CREATE_FOLDER = gql`
mutation Mutation($input: CreateFolderInput!) {
  createFolder(input: $input) {
    message
    statusCode
    data {
      created_at
      id
      name
      updated_at
      user_id
    }
  }
}`

export const UPDATE_FOLDER = gql`

mutation UpdateFolder($input: UpdateFolderInput!) {
  updateFolder(input: $input) {
    message
    statusCode
    data {
      id
      name
      user_id
      created_at
      updated_at
    }
  }
}`

export const Follow_Player = gql`
mutation FollowPlayer($input: FollowPlayerInput!) {
  followPlayer(input: $input) {
    message
    statusCode
    data
  }
}`

export const Accept_Reject_Follow = gql`
mutation AcceptRejectFollow($input: UpdateFollowInput!) {
  acceptRejectFollow(input: $input) {
    message
    statusCode
  }
}`

export const Player_React = gql`
mutation PlayerReaction($input: AddReactionInput!) {
  playerReaction(input: $input) {
    message
    statusCode
    data
  }
}`


export const AddPlayerToFolder = gql`
  mutation Mutation($input: AddPlayerToFolderInput!) {
    addPlayerToFolder(input: $input) {
      message
      statusCode
    }
  }
`

export const Delete_Highlight = gql`
mutation DeleteHighlight($deleteHighlightId: Int!) {
  deleteHighlight(id: $deleteHighlightId) {
    message
    statusCode
  }
}`






export const Create_Post = gql`
mutation Mutation($input: CreatePostInput!, $images: [Upload]) {
  createPost(input: $input, images: $images) {
    message
    statusCode
    data {
      comments_count
      content
      id
      images
      my_reaction
      reactions
      updated_at
      user {
        full_name
        id
        picture
      }
    }
  }
}`

export const Like_Post = gql`
mutation LikePost($input: LikePostInput!) {
  likePost(input: $input) {
    message
    statusCode
  }
}`

export const Create_Comment = gql`
mutation Mutation($input: CreatePostCommentInput!) {
  createPostComment(input: $input) {
    message
    statusCode
    data {
      id
      comment
      post_id
      updated_at
      user_id
      user {
        id
        full_name
        picture
      }
    }
  }
}`

export const Delete_Comment = gql`
mutation DeletePostComment($deletePostCommentId: Int!) {
  deletePostComment(id: $deletePostCommentId) {
    message
    statusCode
  }
}`


export const RemoveOrMovePlayerFromFolderCall = gql`
  mutation Mutation($input: PlayerFolderInput!) {
    removeOrMovePlayerFromFolder(input: $input) {
      message
      statusCode
    }
  }
`

export const REQUEST_PASSWORD= gql`
mutation RequestPassowrd($input: RequestPasswordInput!) {
  requestPassowrd(input: $input) {
    message
    statusCode
    data
  }
}`

export const VERIFY_REQUEST=gql`
mutation RequestVerify($input: RequestVerifyInput!) {
  requestVerify(input: $input) {
    message
    statusCode
    data
  }
}`

export const RESET_PASSWORD=gql`
mutation ResestPassword($input: ResetPasswordInput!) {
  resestPassword(input: $input) {
    message
    statusCode
  }
}`

export const REQUEST_USERNAME= gql`
mutation RequestUserName($input: RequestUserNameInput!) {
  requestUserName(input: $input) {
    message
    statusCode
  }
}`


export const Accpet_Reject_Team_Invite = gql`
mutation AcceptRejectTeamInvite($input: UpdateInviteInput!) {
  acceptRejectTeamInvite(input: $input) {
    message
    statusCode
  }
}`

export const Update_Team = gql`
mutation UpdateTeam($input: UpdateTeamInput!, $logo: Upload) {
  updateTeam(input: $input, logo: $logo) {
    message
    statusCode
  }
}`

export const Update_Team_Members = gql`
mutation UpdateTeamMembers($input: AppMembersInput!) {
  updateTeamMembers(input: $input) {
    message
    statusCode
  }
}`