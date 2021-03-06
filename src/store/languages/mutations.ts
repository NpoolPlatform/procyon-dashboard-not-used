import { LocaleMessages, VueMessageType } from 'vue-i18n'
import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { LanguagesState } from './state'
import { AppLangInfo, AppLanguage, Language } from './types'

type LanguageMutations<S = LanguagesState> = {
  [MutationTypes.SetLanguage] (state: S, payload: Language): void
  [MutationTypes.SetLangShort] (state: S, payload: string): void
  [MutationTypes.SetMessages] (state: S, payload: unknown): void
  [MutationTypes.SetAppLangInfos] (state: S, payload: Array<AppLangInfo>): void
  [MutationTypes.SetAppLanguage] (state: S, payload: AppLanguage): void
}

const mutations: MutationTree<LanguagesState> & LanguageMutations = {
  [MutationTypes.SetLanguage] (state: LanguagesState, payload: Language) {
    state.Languages.set(payload.Lang, payload)
  },
  [MutationTypes.SetLangShort] (state: LanguagesState, payload: string) {
    state.CurLang = payload
  },
  [MutationTypes.SetMessages] (state: LanguagesState, payload: LocaleMessages<VueMessageType>) {
    state.Messages = payload
  },
  [MutationTypes.SetAppLangInfos] (state: LanguagesState, payload: Array<AppLangInfo>): void {
    state.AppLangInfos = payload
  },
  [MutationTypes.SetAppLanguage] (state: LanguagesState, payload: AppLanguage) {
    let appLanguages = state.AppLanguages
    if (!appLanguages) {
      appLanguages = [] as Array<AppLanguage>
    }
    appLanguages?.push(payload)
    state.AppLanguages = appLanguages
  }
}

export { LanguageMutations, mutations }
