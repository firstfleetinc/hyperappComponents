require('es6-promise').polyfill();
import 'whatwg-fetch'
import { h, app } from "hyperapp"
import { actions } from './actions'
import { Route } from "@hyperapp/router"
import { Home } from './Pages/Home'



export const view = (state, actions) => {
  
  return (
    <div>
    <Route path="/" render={Home(state, actions)} />
    </div >
  )

}