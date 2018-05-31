import { location } from "@hyperapp/router"

export const actions = {
  location: location.actions,
  showModal: value => (state, actions) => {
    return {showModal: true}
  },
  hideModal: value => (state, actions) => {
    return {showModal: false}
  },
}