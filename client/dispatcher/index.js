import Flux from 'flux'
import assign from 'object-assign'

let AppDispatcher = assign(new Flux.Dispatcher(), {
	handleViewAction: (action) => {
		this.dispatch({
			source: 'VIEW_ACTION',
			action: action
		});
	}
});

export default AppDispatcher