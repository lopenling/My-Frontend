import mitt from 'mitt'

export type Events = {
  'open-alert': {
    appearance: 'success' | 'error'
    message: string
    timeAlive?: number
  }
  'close-alert': undefined
}

export default mitt<Events>()
