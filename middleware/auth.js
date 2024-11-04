import {
  useCurrentUserProfile
} from '~/composables/states'

export default defineNuxtRouteMiddleware( async () => {
  const currentUser = useSupabaseUser()
  const currentUserProfile = useCurrentUserProfile()
  const client = useSupabaseClient()
  const session = useSupabaseSession()

  // client.auth.onAuthStateChange( async () => {
  //   user = await client.auth.getUser()
  // } )

  // function that gets a user profile
  const getProfile = async () => {
    const {
      data,
      error
    } = await client
      .from( 'profiles' )
      .select( '*' )
      .eq( 'id', currentUser.value.id )
      .single()
    if ( error ) {
      console.error( error )
    } else if ( data ) {
      currentUserProfile.value = data
    }
  }

  // check supabase session for logged in user
  // if ( user?.data?.user ) {
  //   currentUser.value = user?.data?.user
  // } else if ( session?.data?.session?.user ) {
  //   currentUser.value = session?.data?.session?.user
  // }

  // if the user is not authorized, redirect them to the login page
  // if they are, get their profile data
  if ( !session.value ) {
    return navigateTo( '/index' )
  }
  // if ( !currentUser.value ) {
  //   return navigateTo( '/index' )
  // }
  else if ( !currentUserProfile.value ) {
    getProfile()
  }
} )