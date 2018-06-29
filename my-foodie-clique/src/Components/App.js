import Main from './Main'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../redux/actions'
import {withRouter} from 'react-router'
function mapStateToProps(state) {
    return {
        venues: state.venues,
        currentUser: state.currentUser
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)

}

const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))

export default App