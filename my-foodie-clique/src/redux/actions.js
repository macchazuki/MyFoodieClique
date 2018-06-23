import fire from '../fire'

export function startAddingVenue(venue) {
    return (dispatch) => {
        return fire.database.ref('venues').update({[venue.id]: venue}).then(() => {
            dispatch(addVenue(venue))
        }).catch((error) => {
            console.log(error)
        })
    }
} 


export function addVenue(venue) {
    return {
        type: 'ADD_VENUE',
        venue
    }
}