import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { MainBreadcrumbsState, state as emptyState } from './state'
import { MainBreadcrumbs } from './types'

type MainBreadcrumbsMutations<S = MainBreadcrumbsState> = {
  [MutationTypes.SetMainBreadcrumbs] (state: S, payload: Array<MainBreadcrumbs>): void
  [MutationTypes.SetError] (state: S, payload: string): void
  [MutationTypes.SetLoading] (state: S, payload: boolean): void
  [MutationTypes.Reset] (state: S): void
}

const mutations: MutationTree<MainBreadcrumbsState> & MainBreadcrumbsMutations = {
  [MutationTypes.SetMainBreadcrumbs] (state: MainBreadcrumbsState, payload: Array<MainBreadcrumbs>) {
    state.Infos = payload
  },
  [MutationTypes.SetError] (state: MainBreadcrumbsState, payload: string) {
    state.error = payload
  },
  [MutationTypes.SetLoading] (state: MainBreadcrumbsState, payload: boolean) {
    state.loading = payload
  },
  [MutationTypes.Reset] (state: MainBreadcrumbsState) {
    Object.assign(state, { ...emptyState })
  }
}

export { MainBreadcrumbsMutations, mutations }
