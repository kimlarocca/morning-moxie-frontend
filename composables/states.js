// global state for the current user
export const useCurrentUser = () => useState( 'useCurrentUser', () => null )

// global state for the current user's profile
export const useCurrentUserProfile = () => useState( 'useCurrentUserProfile', () => null )

// global state for the main menu
export const useMainMenu = () => useState( 'useMainMenu', () => false )

// global state for the login menu
export const useLoginMenu = () => useState( 'useLoginMenu', () => false )