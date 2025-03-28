import { mapArrayofToggles, strategyMaps, Toggle } from '@flagbear/flagbear-core'
import axios from 'axios'

export class flagbear {
  private toggles?: any
  private url: string
  private ready = false
  private debug: boolean

  constructor(url: string, refreshRate: number, defaults?: Toggle[], debug: boolean = false) {
    this.toggles = defaults ? mapArrayofToggles(defaults) : undefined
    setInterval(this.refreshCache, refreshRate * 1000)
    setTimeout(this.refreshCache, 0)
    this.url = url
    this.debug = debug
  }

  public isEnabled(prop: string, context?: any) {
    return this.toggles !== undefined && this.toggles[prop] !== undefined ? this.getValue(prop, context) : false
  }

  public onReady(): Promise<void> {
    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        if (!this.ready) return
        resolve()
        clearInterval(intervalId)
      }, 0)
    })
  }

  private getValue(prop: string, context: any) {
    try {
      const toggle = this.toggles[prop]
      return strategyMaps[toggle.type](toggle, context)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      return false
    }
  }

  private refreshCache = async () => {
    try {
      this.toggles = mapArrayofToggles((await axios.get(this.url)).data.toggles)
      this.ready = true
    } catch (error) {
      if (this.debug) {
        console.error('flagbear error', error)
      }
      this.ready = true
    }
  }
}
