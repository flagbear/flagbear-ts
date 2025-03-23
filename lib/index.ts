import { flagbear as tg } from './flagbear'
import { ReleaseToggle as rt } from '@flagbear/flagbear-core'
import { ContextToggle as ct } from '@flagbear/flagbear-core'
import { Conditions as c } from '@flagbear/flagbear-core'

export type ReleaseToggle = rt
export type ContextToggle = ct
export type Conditions = c

export const flagbear = tg
