import { gql } from "@apollo/client";

// query
export const healthCheck        = gql`query healthCheck { healthCheck }`;
export const queryPing          = gql`query ping { ping }`;
export const querySuppliers     = gql`query suppliers( $input: SearchInput ) { suppliers( input: $input) }`;
export const querySupplierById  = gql`query supplierById($id: ID!) { supplierById(_id: $id) }`;
export const queryMe            = gql`query me{me}`;
export const queryUserById      = gql`query userById($id: ID!) { userById(_id: $id) }`;
export const queryUsers         = gql`query users($input: PagingInput ) { users(input: $input) }`;
export const queryRoleByIds     = gql`query roleByIds($input: [String]) { roleByIds(input: $input) }`;
export const queryBanks         = gql`query banks{ banks }`;
export const queryBankById      = gql`query bankById($id: ID!) { bankById(_id: $id) }`;
export const queryBankByIds     = gql`query bankByIds($ids: [ID]!) { bankByIds(_ids: $ids) }`;
export const queryBookBuyTransitions = gql`query bookBuyTransitions { bookBuyTransitions }`;
export const queryHistoryTransitions = gql`query historyTransitions { historyTransitions }`;
export const queryFriendProfile      = gql`query friendProfile($id: ID!) { friendProfile(_id: $id) }`;
export const queryBuyById         = gql`query buyById($id: ID!) { buyById(_id: $id) }`;
export const queryBuys            = gql`query buys { buys }`;
export const queryNotifications   = gql`query notifications { notifications }`;
export const queryCommentById     = gql`query commentById($id: ID!) { commentById(_id: $id) }`;
export const queryBookmarks       = gql`query bookmarks{ bookmarks }`;
export const querySubscribes      = gql`query subscribes{ subscribes }`;
export const queryDblog           = gql`query dblog{ dblog }`;
export const queryProducers       = gql`query producers{ producers }`;
export const queryManageLotterys      = gql`query manageLotterys{ manageLotterys }`;
export const queryManageLotteryById   = gql`query manageLotteryById($id: ID!){ manageLotteryById(_id: $id) }`;
export const queryDeposits            = gql`query deposits( $input: JSON ) { deposits( input: $input) }`;
export const queryWithdraws           = gql`query withdraws( $input: JSON ) { withdraws( input: $input) }`;
export const queryDateLotterys    = gql`query dateLotterys { dateLotterys }`;
export const queryDateLotteryById = gql`query dateLotteryById($id: ID!) { dateLotteryById(_id: $id) }`;
export const queryAdminHome       = gql`query adminHome { adminHome }`;
export const queryAdminBanks      = gql`query adminBanks { adminBanks }`;
export const queryAdminDeposits   = gql`query adminDeposits{ adminDeposits }`;
export const queryAdminWithdraws  = gql`query adminWithdraws{ adminWithdraws }`;
export const queryManageSuppliers = gql`query manageSuppliers{ manageSuppliers }`;
export const queryContents        = gql`query contents { contents }`;
export const queryContentById     = gql`query contentById($id: ID!) { contentById(_id: $id) }`;

// mutation
export const mutationCheck_db   = gql`mutation check_db{ check_db }`;
export const mutationLogin      = gql`mutation login($input: LoginInput) { login(input: $input) }`;
export const mutationLoginWithSocial = gql`mutation loginWithSocial($input: LoginWithSocialInput) { loginWithSocial(input: $input) }`;
export const mutationRegister   = gql`mutation register($input: RegisterInput) { register(input: $input) }`;
export const mutationMe         = gql`mutation me($input: JSON){ me(input: $input) }`;
export const mutationBook       = gql`mutation book($input: BookInput) { book(input: $input) }`;
export const mutationBuy        = gql`mutation buy($id: ID!) { buy(_id: $id) }`;
export const mutationCancelTransition        = gql`mutation cancelTransition($id: ID!) { cancelTransition(_id: $id) }`;
export const mutationLottery   = gql`mutation lottery($input: SupplierInput) { lottery(input: $input) }`;
export const mutationDeposit    = gql`mutation deposit($input: DepositInput){ deposit(input: $input) }`;
export const mutationWithdraw   = gql`mutation withdraw($input: WithdrawInput){ withdraw(input: $input) }`;
export const mutationBank       = gql`mutation bank($input: BankInput){ bank(input: $input) }`;
export const mutationFollow     = gql`mutation follow($id: ID!) { follow(_id: $id) }`;
export const mutationDatesLottery = gql`mutation datesLottery($input: [Date]){ datesLottery(input: $input) }`;
export const mutationNotification = gql`mutation notification($id: ID!) { notification(_id: $id) }`;
export const mutationComment      = gql`mutation comment($input: JSON) { comment(input: $input) }`;
export const mutationContactUs    = gql`mutation contactUs($input: ContactUsInput) { contactUs(input: $input) }`;
export const mutationSubscribe    = gql`mutation subscribe($id: ID!) { subscribe(_id: $id) }`;
export const mutationSearch       = gql`mutation search($input: SearchInput) { search(input: $input) }`;
export const mutationAdminDeposit   = gql`mutation adminDeposit($input: JSON){ adminDeposit(input: $input) }`;
export const mutationAdminWithdraw  = gql`mutation adminWithdraw($input: JSON){ adminWithdraw(input: $input) }`;
export const mutationManageLottery  = gql`mutation manageLottery($input: ManageLotteryInput) { manageLottery(input: $input) }`;
export const mutationForceLogout    = gql`mutation forceLogout($input: JSON){ forceLogout(input: $input) }`;
export const mutationExpireLottery    = gql`mutation expireLottery($input: JSON){ expireLottery(input: $input) }`;
export const mutationCalculateLottery    = gql`mutation calculateLottery($input: JSON){ calculateLottery(input: $input) }`;
export const mutationContent        = gql`mutation content($input: JSON){ content(input: $input) }`;

export const mutationPay            = gql`mutation pay($input: JSON){ pay(input: $input) }`;
export const mutationLotteryClone   = gql`mutation lotteryClone($id: ID!){ lotteryClone(_id: $id) }`;

// subscription 
export const subscriptionMe            = gql`subscription me($userId: ID!){ me(userId: $userId) }`;
export const subscriptionSupplierById  = gql`subscription subscriptionSupplierById($id: ID!){ subscriptionSupplierById(_id: $id) }`;
export const subscriptionSuppliers     = gql`subscription subscriptionSuppliers($supplierIds: String!) { subscriptionSuppliers(supplierIds: $supplierIds) }`;
export const subscriptionAdmin         = gql`subscription subscriptionAdmin($sessionId: ID!){ subscriptionAdmin(sessionId: $sessionId) }`;
export const subscriptionCommentById   = gql`subscription subscriptionCommentById($id:ID!){ subscriptionCommentById(_id:$id) }`;

////// conversation  conversation  conversationId: ID!, startId: ID
export const queryConversations = gql`query conversations{ conversations }`;
export const queryMessage       = gql`query message($conversationId: ID!, $startId: ID){ message(conversationId: $conversationId, startId: $startId) }`;
export const mutationMessage = gql`mutation message( $mode: MessageMode!, $input: JSON ) { message( mode: $mode, input: $input ) }`;
export const mutationConversation = gql`mutation conversation($mode: ConversationMode!, $id: ID!){ conversation(mode: $mode, _id: $id) }`;
export const subMessage = gql`subscription subMessage($userId: ID!, $conversationId: ID!) { subMessage( userId: $userId, conversationId: $conversationId)  }`;
export const gqlUpdateMessageRead = gql`mutation UpdateMessageRead($conversationId: ID!) { updateMessageRead( conversationId: $conversationId)}`;

// gql`query bankByIds($ids: [ID]!) { bankByIds(_ids: $ids) }`;
export const subConversations = gql`subscription conversations( $userId: ID! ){ conversations(userId: $userId) }`;
export const gqlUser = gql`query User($id: ID){ user(_id: $id) }`;
export const gqlUsers = gql`query users($page: Int, $perPage: Int){ users( page: $page perPage: $perPage ) }`;


export const queryMembers             = gql`query members { members }`;
export const queryFiles               = gql`query files { files }`;
export const queryMlmById             = gql`query mlmById($id: ID!) { mlmById(_id: $id) }`;
export const mutationTest_addmember   = gql`mutation test_addmember($input: MemberInput) { test_addmember(input: $input) }`;
export const mutationMlm              = gql`mutation test_addmlm($input: MLMInput) { test_addmlm(input: $input) }`;

export const userConnected            = gql`subscription userConnected { userConnected }`;

export const mutationTest_upload      = gql`mutation test_upload($input: JSON) { test_upload(input: $input) }`;