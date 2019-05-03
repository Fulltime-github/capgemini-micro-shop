export default {
  component: 'buy-button',
  path: '/src/team-blue/buy-button/buy-button.js',
  events: ['blue:basket:changed'],
  attributes: {
    time: '1500'
  },
  functions: {
    start: () => {
      dashboard.targetComponent.start();
    },
    stop: () => {
      dashboard.targetComponent.stop();
    },
    resume: () => {
      dashboard.targetComponent.resume();
    }
  }
}
