/* eslint-disable */

import { gql } from "@apollo/client";

export const CHECK_USERNAME = gql`
query CheckUsername($input: UsernameInput!) {
  checkUsername(input: $input) {
    message
    statusCode
  }
}`;

export const GET_ALL_ROLLS = gql`
  query Query {
    allRole {
      id
      name
      created_at
    }
  }
`;

export const GET_USER_ROLL = gql`
  query Query($input: UserByRoleInput!) {
    allUserByRole(input: $input) {
      total
      nextPage
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
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query AllCategory($input: AllCategoryInput!) {
    allCategory(input: $input) {
      data {
        id
        name
        type
        icon
        created_at
        updated_at
      }
      nextPage
      total
    }
  }
`;

export const ListPlayerCoach = gql`
query TeamPlayersBySportId($input: TeamPlayersBySportIdInput) {
  teamPlayersBySportId(input: $input) {
    data {
      id
      status
      player_profile_detail {
        id
        sport {
          name
          id
        }
        players_profile {
          dob
          nick_name
          gender
          player_id
          
          user {
            id
            user_name
            phone
            full_name
            email
            picture
            account_type
            is_active
            is_notification
            profile_complete
            is_verified
            has_player
            has_profile
            created_at
            updated_at
        
            meta
         
            isPayment
            has_team
            package_details
          }
        }
      }
    }
    nextCursor
  }
}`

export const ListPlayer = gql`
  query Query($input: ListPlayerInput!) {
    listPlayer(input: $input) {
      nextPage
      data {
        id
        player_id
        nick_name
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
      }
      total
    }
  }
`;

export const MY_INVITES = gql`
query Query($input: MyInvitesInput!) {
  myInvites(input: $input) {
    data {
      id
      player_id
      nick_name
      user_id
      user {
        id
        phone
        full_name
        user_name
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
      status
      created_at
      updated_at
    }
    nextCursor
  }
}`

export const MY_INVITES_REQUEST = gql`
query MyInvites($input: MyInvitesInput!) {
  myInvites(input: $input) {
    nextCursor
    data {
      id
      player_id
      nick_name
      user_id

      parent {
        id
        phone
        full_name
        email
        picture
        account_type
        is_active
        is_notification
        profile_complete
        is_verified
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
      status
      created_at
      updated_at
    }
  }
}
`

export const PLAYER_PROFILE_DETAIL = gql`
query Query($input: PlayerProfileDetailInput!) {
  playerProfileDetail(input: $input) {
    id
    player_id
    nick_name
    user_id
    user {
      id
      phone
      full_name
      user_name
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
    dob
    gender
    social
    profile_type
    profile_detail
  }
}`

export const PLAYER_QR_CODE = gql`
  query Query($input: PlayerQRCodeInput!) {
    playerQRCode(input: $input) {
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
          id
          name
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
`;

export const GET_ALL_PACKAGES = gql`
query Data($input: AllPackageInput!) {
  getAllPackages(input: $input) {
    data {
      id
      name
      description
      price
      details
      qr_type
      duration
      is_active
      created_at
      updated_at
    }
    nextPage
    total
  }
}`

export const GET_MY_PROFILE = gql`
query MyPlayerProfile {
  myPlayerProfile {
    id
    player_id
    profile_type
    nick_name
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
      user_name
      role {
        id
        name
        created_at
      }
      meta
    }
    status
    created_at
    updated_at
  }
}`

export const GET_PROFILE = gql`
query Query {
  profileDetail {
    id
    phone
    full_name
    email
    user_name
    picture
    account_type
    is_active
    is_notification
    profile_complete
    has_player
    created_at
    updated_at
    meta
    role {
      created_at
      id
      name
    }
    meta
  }
}`
export const GET_ALL_TEAMS = gql`
  query GetAllTeams($input: PaginationInput!) {
    getAllTeams(input: $input) {
      data {
        id
        team_id
        name
        logo
        team_level
        win
        loss
        tie
user {
        id
        full_name
      }
        qr_code
      }
      nextCursor
    }
  }
`;

export const GET_TEAM_DETAILS = gql`
  query ExampleQuery($getTeamDetailId: Int!) {
    getTeamDetail(id: $getTeamDetailId) {
      id
      logo
      loss
      name
      qr_code
      team_id
      team_level
      website_url
      players_count
      coaches_count
      tie
      win
      user {
        id
        full_name
      }
    }
  }
`;



export const All_ORGANIZATIONS = gql`
query ListOrganizations {
  listOrganizations {
    data {
      id
      code
      name
      type
      phone
      address

    }
  }
}`

export const GET_ORG_TEAMS = gql`
query GetTeamsByOrganization($input: PaginationInput!) {
  getTeamsByOrganization(input: $input) {
    data {
      id
      name
      logo
      team_id
      players {
        id
      }
    }
    nextCursor
   }
}`

export const GET_ALL_NOTIFICATIONS = gql`
query Query($input: AllNotificationInput!) {
  getAllNotifications(input: $input) {
    total
    nextPage
    data {
      id
      title
      data
      sent_by
      is_read
      created_at
      updated_at
      sender {
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
}`

export const GET_ALL_VENDOR_PACKAGES = gql`
query GetAllVendorPackages($input: AllVendorPackageInput!) {
  getAllVendorPackages(input: $input) {
    total
    nextPage
    data {
      id
      name
      price
      is_active
      created_at
      updated_at
      items {
        id
        name
        size
        color
        quantity
        image
        created_at
        updated_at
      }
    }
  }
}`

export const GET__ALL_ORDERS = gql`
query GetAllVendorOrders($input: AllVendorOrdersInput!) {
  getAllVendorOrders(input: $input) {
    total
    nextPage
    data {
      vendor_package {
        id
        name
        price
        is_active
        created_at
        updated_at
        measurements
        items {
          id
          name
          size
          color
          quantity
          image
          created_at
          updated_at
        }
      }
      vendor_order_items {
        id
        vendor_package_item {
          id
          name
          size
          color
          quantity
          image
          created_at
          updated_at
        }
        selected_size
        selected_color
      }
      updated_at
      total_price
      status
      quantity
      qr_code
      id
      commission_price
      address
    }
  }

}`;

export const GET_ORDERS_DRTAILS_BY_ID = gql`
  query GetVendorOrderDetail($getVendorOrderDetailId: Int!) {
    getVendorOrderDetail(id: $getVendorOrderDetailId) {
      vendor_package {
        id
        name
        price
        is_active
        created_at
        updated_at
        measurements
        items {
          id
          name
          size
          color
          quantity
          image
          created_at
          updated_at
        }
      }
      vendor_order_items {
        vendor_package_item {
          id
          name
          size
          color
          quantity
          image
          created_at
          updated_at
        }
        selected_size
        selected_color
        id
      }
      updated_at
      total_price
      status
      quantity
      qr_code
      id
      created_at
      commission_price
      address
    }
  }
`;

export const GET_TRACKSHIPMENT = gql`
  query TrackShipment($vendorOrderId: Int!) {
    trackShipment(vendor_order_id: $vendorOrderId) {
      id
      shipping_services
      shipping_status
      estimated_delivery_date
      delivery_date
      current_status
      activity
      delivery_information
      vendor_order {
        order_id
        quantity
      }
    }
  }
`;

export const Get_All_Sports = gql`
query ListSport($input: ListSportInput) {
  listSport(input: $input) {
    id
    name
    is_active
    created_at
    updated_at
  }
}`


export const Player_Profile = gql`
query PlayerProfile($input: PlayerProfileInput!) {
  playerProfile(input: $input) {
    id
    player_id
    nick_name
    is_connect
    user {
      id
      email
      created_at
      full_name
      has_player
      is_active
      meta
      phone
      picture
      role {
        name
      }
      profile_complete
    }
    is_following
    my_reaction
    reaction
    followers
    following
    has_advance
    height
    gender
    dob
    weight
  }
}`

export const All_Highlights = gql`
query AllHighlights($input: HighlightInput!) {
  allHighlights(input: $input) {
    nextCursor
    data {
      title
      updated_at
      media
      id
    }
  }
}`

export const Sport_List = gql`
query PlayerSportsProfile($input: PlayerSportProfileInput!) {
  playerSportsProfile(input: $input) {
    nextCursor
    data {
      sport_id
      id
      sport {
        name
        id
      }
      qr_code
      profile_type
      profile_detail
      players_profile {
        weight
        user {
          full_name
          picture
        }
        dob
        followers
        following
        gender
        height
        id
        nick_name
        player_id
        reaction
      }
    }
  }
}`

export const Get_User_Detail = gql`
query GetUserDetail($userId: Int) {
  getUserDetail(user_id: $userId) {
    email
    full_name
    has_player
    meta
    phone
    picture
    user_name
    role {
      name
    }
    player_profile {
      dob
      gender
      height
      nick_name
      weight
    }
  }
}`


export const Get_Sport_Details = gql`
query SportsProfileById($input: SportProfileIdInput!) {
  sportsProfileById(input: $input) {
    id
    profile_type
    sport_id
    sport {
      name
      id
    }
    profile_detail
    qr_code
    players_profile {
      id
      player_id
      nick_name
      gender
      height
      weight
      dob
      reaction
      followers
      following
      user {
        full_name
        picture
        phone
        email
        id
      }
    }
  }
}`


export const Get_ALL_FOLDERS = gql`
query GetAllFolders($input: PaginationFolderInput!) {
  getAllFolders(input: $input) {
    data {
      id
      name
      user_id
      created_at
      updated_at
    }
    nextCursor
  }

}`;

export const Get_All_Following = gql`
query GetAllFollowing($input: MyFollowingInput) {
  getAllFollowing(input: $input) {
    nextCursor
    data {
      id
      status
      updated_at
      players_profile {
        player_id
        user {
          full_name
          id
          picture
        }
      }
      user {
        id
        picture
        full_name
      }
    }
  }
}`

export const GET_FOLDER_BY_ID = gql`
query Data($input: GetFolderByIdInput!) {
  getFolderById(input: $input) {
    data {
      id
      name
      user_id
      player_saveds {
        id
        player_profile_id
        players_profile {
          id
          player_id
          nick_name

          gender
          height
          weight
          dob
          reaction
          followers
          following
          has_advance
        }
        player_id

        tags
        created_at
        updated_at
      }
      created_at
      updated_at
    }
  }
}`

export const All_User_By_Role = gql`
query AllUserByRole($input: UserByRoleInput!) {
  allUserByRole(input: $input) {
    total
    nextPage
    data {
      full_name
      picture
      id
      email
      
      user_name
      role {
        name
        id
      }
    }
  }
}`

export const GET_PLAYERPROFILE_BY_ID = gql`

query Data($input: PlayerProfileInput!) {
  playerProfile(input: $input) {
    id
    player_id
    nick_name
    user {
      id
      user_name
      phone
      full_name
      email
      picture
      account_type
      is_active
      is_notification
      profile_complete
      is_verified
      has_player
      has_profile
      created_at
      updated_at

      meta

      isPayment
      has_team
      package_details
    }
    gender
    height
    weight
    dob
    reaction
    followers
    following
    has_advance
  }
}`


export const Get_All_Reacts = gql`
query GetPlayerReactions($input: PlayerReactionsInput) {
  getPlayerReactions(input: $input) {
    nextCursor
    data {
      id
      players_profile {
        player_id
      }
      user {
        full_name
        picture
      }
    }
  }
}`
export const GET_FOLDER_DETAILS = gql`

query GetFolderPlayer($input: GetFolderPlayerInput!) {
  getFolderPlayer(input: $input) {
    nextCursor
    data {
      folder {
        id
        name
        created_at
      }
      player {


      id

      tags
      created_at
      updated_at
      players_profile {
        id
        nick_name
        player_id
        user {
          id
          picture
          full_name
        }
      }

      }
    }
  }

}`;

export const Get_All_Teams = gql`
query GetAllTeams($input: PaginationInput!) {
  getAllTeams(input: $input) {
    data {
      id
      logo
      name
      status
    }
    nextCursor
  }
}`

export const All_Comments = gql`
query GetAllPostComments($input: AllPostCommentInput!) {
  getAllPostComments(input: $input) {
    nextCursor
    data {
      id
      comment
      post_id
      user {
        full_name
        picture
        id
      }
    }
  }
}`


export const All_Community_Post = gql`
query AllPosts($input: AllPostInput!) {
  allPosts(input: $input) {
    data {
      comments_count
      content
      id
      images
      my_reaction
      reactions
      user_id
      updated_at
      user {
        full_name
        picture
      }
    }
    nextCursor
  }
}`


export const Single_Post = gql`
query PostDetail($postDetailId: Int!) {
  postDetail(id: $postDetailId) {
    comments_count
    content
    id
    images
    is_following
    my_reaction
      reactions
    updated_at
    user {
      full_name
      picture
      id
    }
  }
}`


export const All_teamMembersByTeamId = gql`
  query Query($input: TeamInvitesByTeamIdInput!) {
    teamMembersByTeamId(input: $input) {
      data {
        id
        player_profile_detail {
          id
          profile_detail
          sport {
            id
            name
          }
          profile_type
          players_profile {
            id
            player_id
            nick_name
          }
        }
        status
        created_at
        user {
          email
          id
          full_name
          picture
        }
      }
      nextCursor
    }
  }
`;

export const All_AllCoachUsers = gql`

query ExampleQuery($input: AllCoachUsersInput) {

  allCoachUsers(input: $input) {
    data {
      full_name
      id
      picture

    }
    nextCursor
  }


}`;

export const Get_Team_Invites = gql`
query TeamInvites($input: MyInvitesInput!) {
  teamInvites(input: $input) {
    nextCursor
    data {
     
      id
     
      status
      team {
        name
        logo
      }
    }
  }
}`