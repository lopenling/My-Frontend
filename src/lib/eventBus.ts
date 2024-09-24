import mitt from 'mitt'

export type Events = {
  // Alerts
  'open::alert': {
    appearance: 'success' | 'error'
    message: string
    timeAlive?: number
  }
  'close::alert': undefined

  // Modals
  'open::modal::team::new': undefined
  'open::modal::team::leave': { id: number }
  'open::modal::team::rename': { id: number }
  // Let's experiment with single "close-modal" event for all modals
  // This assumes, that only one modal can be opened at a time
  // which so far seems to be the case
  'close::modal': undefined
}

export default mitt<Events>()
