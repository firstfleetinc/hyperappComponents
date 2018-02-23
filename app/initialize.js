import { h, app } from "hyperapp"
import logger from "@hyperapp/logger"
import { actions } from './actions'
import { state } from './state'
import { view } from './view'
import { Link, Route, location } from "@hyperapp/router"

document.addEventListener("DOMContentLoaded", function (event) {

    const main = logger({
        log(prevState, action, nextState) {
          console.log(prevState);
          console.log(action);
          console.log(nextState);
        }
      })(app)(state, actions, view, document.getElementById('main'))
    
      const unsubscribe = location.subscribe(main.location)
});