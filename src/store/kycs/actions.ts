import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { GetKYCImageRequest, GetKYCImageResponse, GetKYCsRequest, GetKYCsResponse } from './types'
import { KYCsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { KYCMutations } from './mutations'
import { notificationPush, notificationPop } from '../notifications/helper'
import { MutationTypes as NotificationMutationTypes } from '../notifications/mutation-types'
import { Notification } from '../notifications/types'
import { api } from 'src/boot/axios'
import { API } from './const'
import { AxiosResponse } from 'axios'

interface KYCActions {
  [ActionTypes.GetKYCs]({
    commit
  }: AugmentedActionContext<
    KYCsState,
    RootState,
    KYCMutations<KYCsState>>,
    req: GetKYCsRequest): void

  [ActionTypes.GetKYCImage]({
    commit
  }: AugmentedActionContext<
    KYCsState,
    RootState,
    KYCMutations<KYCsState>>,
    req: GetKYCImageRequest): void
}

const actions: ActionTree<KYCsState, RootState> = {
  [ActionTypes.GetKYCs] ({ commit }, req: GetKYCsRequest) {
    let waitingNotification: Notification
    if (req.Message.Waiting) {
      waitingNotification = notificationPush(req.Message.ModuleKey, req.Message.Waiting)
      commit(NotificationMutationTypes.Push, waitingNotification)
    }
    api
      .post<GetKYCsRequest, AxiosResponse<GetKYCsResponse>>(API.GET_KYCS, req)
      .then((response: AxiosResponse<GetKYCsResponse>) => {
        commit(MutationTypes.SetKYCs, response.data.Infos)
        if (waitingNotification) {
          commit(NotificationMutationTypes.Pop, notificationPop(waitingNotification))
        }
      })
      .catch((err: Error) => {
        const error = req.Message.Error
        if (error) {
          error.Description = err.message
          const errorNotification = notificationPush(req.Message.ModuleKey, error)
          commit(NotificationMutationTypes.Push, errorNotification)
        }
      })
  },

  [ActionTypes.GetKYCImage] ({ commit }, req: GetKYCImageRequest) {
    let waitingNotification: Notification
    if (req.Message.Waiting) {
      waitingNotification = notificationPush(req.Message.ModuleKey, req.Message.Waiting)
      commit(NotificationMutationTypes.Push, waitingNotification)
    }
    api
      .post<GetKYCImageRequest, AxiosResponse<GetKYCImageResponse>>(API.GET_KYC_IMAGE, req)
      .then((response: AxiosResponse<GetKYCImageResponse>) => {
        commit(MutationTypes.SetKYCImage, {
          KYCID: req.KYCID,
          ImageType: req.ImageType,
          URI: req.URI,
          Base64: response.data.Info
        })
        if (waitingNotification) {
          commit(NotificationMutationTypes.Pop, notificationPop(waitingNotification))
        }
      })
      .catch((err: Error) => {
        const error = req.Message.Error
        if (error) {
          error.Description = err.message
          const errorNotification = notificationPush(req.Message.ModuleKey, error)
          commit(NotificationMutationTypes.Push, errorNotification)
        }
      })
  }
}

export {
  actions,
  KYCActions
}
