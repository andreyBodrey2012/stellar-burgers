import { expect, describe, it } from '@jest/globals';
import feedOrdersReducer, { FeedState, fetchFeed } from './feedSlice';

describe('проверка feed стора', () => {
  const initialState: FeedState = {
    isLoading: false,
    items: [],
    total: 0,
    totalToday: 0,
    error: null
  };

  it('проверка pending', () => {
    const newState = feedOrdersReducer(
      initialState,
      fetchFeed.pending('')
    );

    expect(newState).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('проверка fulfilled', () => {
    const feedOrder = {
        success: true,
        orders: [
          {
            _id: '68cc2657673086001ba88bfa',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa0943'
            ],
            status: 'done',
            name: 'Space флюоресцентный бургер',
            createdAt: '2025-09-18T15:33:43.464Z',
            updatedAt: '2025-09-18T15:33:44.788Z',
            number: 89001
          },
          {
            _id: '68cc1e15673086001ba88bf5',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa0948',
              '643d69a5c3f7b9001cfa0945',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Альфа-сахаридный флюоресцентный био-марсианский антарианский бургер',
            createdAt: '2025-09-18T14:58:29.382Z',
            updatedAt: '2025-09-18T14:58:30.741Z',
            number: 89000
          },
          {
            _id: '68cc10c9673086001ba88be7',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный бургер',
            createdAt: '2025-09-18T14:01:45.033Z',
            updatedAt: '2025-09-18T14:01:46.211Z',
            number: 88999
          },
          {
            _id: '68cc0fac673086001ba88be4',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный бургер',
            createdAt: '2025-09-18T13:57:00.749Z',
            updatedAt: '2025-09-18T13:57:01.933Z',
            number: 88998
          },
          {
            _id: '68cc0bd2673086001ba88bcd',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный био-марсианский бургер',
            createdAt: '2025-09-18T13:40:34.827Z',
            updatedAt: '2025-09-18T13:40:36.025Z',
            number: 88997
          },
          {
            _id: '68cc0bc5673086001ba88bcb',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa093c'
            ],
            status: 'done',
            name: 'Краторный био-марсианский бургер',
            createdAt: '2025-09-18T13:40:21.488Z',
            updatedAt: '2025-09-18T13:40:22.737Z',
            number: 88996
          },
          {
            _id: '68cc08c2673086001ba88bc6',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный био-марсианский бургер',
            createdAt: '2025-09-18T13:27:30.707Z',
            updatedAt: '2025-09-18T13:27:31.945Z',
            number: 88995
          },
          {
            _id: '68cc05f9673086001ba88bb2',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный био-марсианский бургер',
            createdAt: '2025-09-18T13:15:37.170Z',
            updatedAt: '2025-09-18T13:15:38.381Z',
            number: 88994
          },
          {
            _id: '68cbf64d673086001ba88b8f',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093c'
            ],
            status: 'done',
            name: 'Краторный люминесцентный бургер',
            createdAt: '2025-09-18T12:08:45.767Z',
            updatedAt: '2025-09-18T12:08:47.042Z',
            number: 88993
          },
          {
            _id: '68cbe45a673086001ba88b7d',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093e'
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный бургер',
            createdAt: '2025-09-18T10:52:10.716Z',
            updatedAt: '2025-09-18T10:52:11.903Z',
            number: 88992
          },
          {
            _id: '68cbdc88673086001ba88b77',
            ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0941'],
            status: 'done',
            name: 'Флюоресцентный био-марсианский бургер',
            createdAt: '2025-09-18T10:18:48.339Z',
            updatedAt: '2025-09-18T10:18:49.510Z',
            number: 88991
          },
          {
            _id: '68cbb3cb673086001ba88b4d',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa0942',
              '643d69a5c3f7b9001cfa093c'
            ],
            status: 'done',
            name: 'Краторный spicy бургер',
            createdAt: '2025-09-18T07:24:59.430Z',
            updatedAt: '2025-09-18T07:25:00.538Z',
            number: 88990
          },
          {
            _id: '68cbb362673086001ba88b4b',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa0940',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Био-марсианский флюоресцентный люминесцентный метеоритный бургер',
            createdAt: '2025-09-18T07:23:14.251Z',
            updatedAt: '2025-09-18T07:23:15.630Z',
            number: 88989
          },
          {
            _id: '68cbb31b673086001ba88b4a',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa0942',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093f',
              '643d69a5c3f7b9001cfa0949',
              '643d69a5c3f7b9001cfa093c'
            ],
            status: 'done',
            name: 'Space краторный бессмертный био-марсианский экзо-плантаго spicy люминесцентный бургер',
            createdAt: '2025-09-18T07:22:03.847Z',
            updatedAt: '2025-09-18T07:22:05.732Z',
            number: 88988
          },
          {
            _id: '68cbb05a673086001ba88b45',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093c'
            ],
            status: 'done',
            name: 'Краторный люминесцентный бургер',
            createdAt: '2025-09-18T07:10:18.210Z',
            updatedAt: '2025-09-18T07:10:19.385Z',
            number: 88987
          },
          {
            _id: '68cbafab673086001ba88b42',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa0946',
              '643d69a5c3f7b9001cfa0947',
              '643d69a5c3f7b9001cfa0947',
              '643d69a5c3f7b9001cfa093c'
            ],
            status: 'done',
            name: 'Краторный фалленианский минеральный люминесцентный бургер',
            createdAt: '2025-09-18T07:07:23.665Z',
            updatedAt: '2025-09-18T07:07:24.977Z',
            number: 88986
          },
          {
            _id: '68cbaa6f673086001ba88b3a',
            ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
            status: 'done',
            name: 'Краторный бургер',
            createdAt: '2025-09-18T06:45:03.358Z',
            updatedAt: '2025-09-18T06:45:04.408Z',
            number: 88985
          },
          {
            _id: '68cbaa52673086001ba88b39',
            ingredients: [
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный бургер',
            createdAt: '2025-09-18T06:44:34.195Z',
            updatedAt: '2025-09-18T06:44:35.510Z',
            number: 88984
          },
          {
            _id: '68cb9c55673086001ba88b2e',
            ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
            status: 'done',
            name: 'Флюоресцентный люминесцентный бургер',
            createdAt: '2025-09-18T05:44:53.560Z',
            updatedAt: '2025-09-18T05:44:54.672Z',
            number: 88983
          },
          {
            _id: '68cb8e2a673086001ba88b24',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa0940',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Space флюоресцентный метеоритный бургер',
            createdAt: '2025-09-18T04:44:26.967Z',
            updatedAt: '2025-09-18T04:44:28.027Z',
            number: 88982
          },
          {
            _id: '68cb8cc5673086001ba88b22',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa0947',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa0944',
              '643d69a5c3f7b9001cfa093c'
            ],
            status: 'done',
            name: 'Краторный традиционный-галактический фалленианский люминесцентный бургер',
            createdAt: '2025-09-18T04:38:29.269Z',
            updatedAt: '2025-09-18T04:38:30.510Z',
            number: 88981
          },
          {
            _id: '68cb8ab3673086001ba88b1d',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный био-марсианский бургер',
            createdAt: '2025-09-18T04:29:39.039Z',
            updatedAt: '2025-09-18T04:29:40.329Z',
            number: 88980
          },
          {
            _id: '68cb3f95673086001ba88aef',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный био-марсианский бургер',
            createdAt: '2025-09-17T23:09:09.055Z',
            updatedAt: '2025-09-17T23:09:10.346Z',
            number: 88979
          },
          {
            _id: '68cb3567673086001ba88ae1',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa0940',
              '643d69a5c3f7b9001cfa0940',
              '643d69a5c3f7b9001cfa0940',
              '643d69a5c3f7b9001cfa0940',
              '643d69a5c3f7b9001cfa0940',
              '643d69a5c3f7b9001cfa0940',
              '643d69a5c3f7b9001cfa093c'
            ],
            status: 'done',
            name: 'Краторный метеоритный бургер',
            createdAt: '2025-09-17T22:25:43.113Z',
            updatedAt: '2025-09-17T22:25:44.409Z',
            number: 88978
          },
          {
            _id: '68cb3488673086001ba88adf',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093f',
              '643d69a5c3f7b9001cfa0946',
              '643d69a5c3f7b9001cfa0948',
              '643d69a5c3f7b9001cfa094a',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa094a',
              '643d69a5c3f7b9001cfa0945',
              '643d69a5c3f7b9001cfa0945',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный антарианский астероидный бессмертный минеральный альфа-сахаридный люминесцентный бургер',
            createdAt: '2025-09-17T22:22:00.793Z',
            updatedAt: '2025-09-17T22:22:02.129Z',
            number: 88977
          },
          {
            _id: '68cb2f51673086001ba88ad6',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa093c'
            ],
            status: 'done',
            name: 'Краторный био-марсианский бургер',
            createdAt: '2025-09-17T21:59:45.692Z',
            updatedAt: '2025-09-17T21:59:46.888Z',
            number: 88976
          },
          {
            _id: '68cb2be7673086001ba88ad3',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa0942',
              '643d69a5c3f7b9001cfa0942',
              '643d69a5c3f7b9001cfa0942',
              '643d69a5c3f7b9001cfa0942',
              '643d69a5c3f7b9001cfa093c'
            ],
            status: 'done',
            name: 'Краторный spicy люминесцентный бургер',
            createdAt: '2025-09-17T21:45:11.106Z',
            updatedAt: '2025-09-17T21:45:12.439Z',
            number: 88975
          },
          {
            _id: '68cb2600673086001ba88acb',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный бургер',
            createdAt: '2025-09-17T21:20:00.580Z',
            updatedAt: '2025-09-17T21:20:01.743Z',
            number: 88974
          },
          {
            _id: '68cb1870673086001ba88abe',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa0947',
              '643d69a5c3f7b9001cfa0947',
              '643d69a5c3f7b9001cfa0946',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Фалленианский флюоресцентный минеральный люминесцентный бургер',
            createdAt: '2025-09-17T20:22:08.387Z',
            updatedAt: '2025-09-17T20:22:09.622Z',
            number: 88973
          },
          {
            _id: '68cb1665673086001ba88ab8',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa093c'
            ],
            status: 'done',
            name: 'Краторный био-марсианский бургер',
            createdAt: '2025-09-17T20:13:25.262Z',
            updatedAt: '2025-09-17T20:13:26.427Z',
            number: 88972
          },
          {
            _id: '68cb15ed673086001ba88ab7',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa0947',
              '643d69a5c3f7b9001cfa0949',
              '643d69a5c3f7b9001cfa094a',
              '643d69a5c3f7b9001cfa0942',
              '643d69a5c3f7b9001cfa094a',
              '643d69a5c3f7b9001cfa094a',
              '643d69a5c3f7b9001cfa094a'
            ],
            status: 'done',
            name: 'Флюоресцентный астероидный фалленианский экзо-плантаго spicy люминесцентный бургер',
            createdAt: '2025-09-17T20:11:25.835Z',
            updatedAt: '2025-09-17T20:11:26.893Z',
            number: 88971
          },
          {
            _id: '68cb1515673086001ba88aaf',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa0942',
              '643d69a5c3f7b9001cfa0942',
              '643d69a5c3f7b9001cfa0942',
              '643d69a5c3f7b9001cfa0942',
              '643d69a5c3f7b9001cfa0942',
              '643d69a5c3f7b9001cfa0944',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa093c'
            ],
            status: 'done',
            name: 'Краторный space spicy традиционный-галактический бургер',
            createdAt: '2025-09-17T20:07:49.798Z',
            updatedAt: '2025-09-17T20:07:51.118Z',
            number: 88970
          },
          {
            _id: '68cb14f4673086001ba88aad',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa0946',
              '643d69a5c3f7b9001cfa0940',
              '643d69a5c3f7b9001cfa094a',
              '643d69a5c3f7b9001cfa0940',
              '643d69a5c3f7b9001cfa0949',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный астероидный минеральный экзо-плантаго метеоритный бургер',
            createdAt: '2025-09-17T20:07:16.393Z',
            updatedAt: '2025-09-17T20:07:17.723Z',
            number: 88969
          },
          {
            _id: '68cb0f7b673086001ba88aa6',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa0942',
              '643d69a5c3f7b9001cfa0942',
              '643d69a5c3f7b9001cfa0942',
              '643d69a5c3f7b9001cfa0942',
              '643d69a5c3f7b9001cfa093c'
            ],
            status: 'done',
            name: 'Краторный spicy бургер',
            createdAt: '2025-09-17T19:43:55.203Z',
            updatedAt: '2025-09-17T19:43:56.416Z',
            number: 88968
          },
          {
            _id: '68cb0e5f673086001ba88aa3',
            ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
            status: 'done',
            name: 'Флюоресцентный бургер',
            createdAt: '2025-09-17T19:39:11.979Z',
            updatedAt: '2025-09-17T19:39:13.644Z',
            number: 88967
          },
          {
            _id: '68cb0e45673086001ba88aa1',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa0940',
              '643d69a5c3f7b9001cfa0947',
              '643d69a5c3f7b9001cfa0947',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный фалленианский люминесцентный метеоритный бургер',
            createdAt: '2025-09-17T19:38:45.567Z',
            updatedAt: '2025-09-17T19:38:46.787Z',
            number: 88966
          },
          {
            _id: '68cb0db1673086001ba88aa0',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa093c'
            ],
            status: 'done',
            name: 'Краторный био-марсианский бургер',
            createdAt: '2025-09-17T19:36:17.622Z',
            updatedAt: '2025-09-17T19:36:18.933Z',
            number: 88965
          },
          {
            _id: '68cb0ab7673086001ba88a9b',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa0940',
              '643d69a5c3f7b9001cfa0949',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Экзо-плантаго флюоресцентный метеоритный бургер',
            createdAt: '2025-09-17T19:23:35.486Z',
            updatedAt: '2025-09-17T19:23:36.626Z',
            number: 88964
          },
          {
            _id: '68cb086d673086001ba88a99',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный бургер',
            createdAt: '2025-09-17T19:13:49.563Z',
            updatedAt: '2025-09-17T19:13:50.818Z',
            number: 88963
          },
          {
            _id: '68cb07ae673086001ba88a96',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa093c'
            ],
            status: 'done',
            name: 'Краторный био-марсианский люминесцентный бургер',
            createdAt: '2025-09-17T19:10:38.457Z',
            updatedAt: '2025-09-17T19:10:39.687Z',
            number: 88962
          },
          {
            _id: '68cb06d7673086001ba88a92',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa094a',
              '643d69a5c3f7b9001cfa093c'
            ],
            status: 'done',
            name: 'Space астероидный краторный люминесцентный био-марсианский бургер',
            createdAt: '2025-09-17T19:07:03.365Z',
            updatedAt: '2025-09-17T19:07:04.517Z',
            number: 88961
          },
          {
            _id: '68cb0443673086001ba88a89',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный бургер',
            createdAt: '2025-09-17T18:56:03.409Z',
            updatedAt: '2025-09-17T18:56:04.717Z',
            number: 88960
          },
          {
            _id: '68cafca5673086001ba88a82',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa093c'
            ],
            status: 'done',
            name: 'Краторный био-марсианский бургер',
            createdAt: '2025-09-17T18:23:33.830Z',
            updatedAt: '2025-09-17T18:23:34.889Z',
            number: 88959
          },
          {
            _id: '68caedb9673086001ba88a5a',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093e'
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный бургер',
            createdAt: '2025-09-17T17:19:53.178Z',
            updatedAt: '2025-09-17T17:19:54.384Z',
            number: 88958
          },
          {
            _id: '68caedac673086001ba88a58',
            ingredients: [
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa093c'
            ],
            status: 'done',
            name: 'Краторный люминесцентный бургер',
            createdAt: '2025-09-17T17:19:40.379Z',
            updatedAt: '2025-09-17T17:19:41.609Z',
            number: 88957
          },
          {
            _id: '68caec68673086001ba88a4f',
            ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
            status: 'done',
            name: 'Флюоресцентный бургер',
            createdAt: '2025-09-17T17:14:16.705Z',
            updatedAt: '2025-09-17T17:14:18.018Z',
            number: 88956
          },
          {
            _id: '68cae9ee673086001ba88a45',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093e'
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный бургер',
            createdAt: '2025-09-17T17:03:42.630Z',
            updatedAt: '2025-09-17T17:03:45.476Z',
            number: 88955
          },
          {
            _id: '68cae7a3673086001ba88a41',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный бургер',
            createdAt: '2025-09-17T16:53:55.387Z',
            updatedAt: '2025-09-17T16:54:10.585Z',
            number: 88954
          },
          {
            _id: '68cae744673086001ba88a3b',
            ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
            status: 'done',
            name: 'Флюоресцентный бургер',
            createdAt: '2025-09-17T16:52:20.041Z',
            updatedAt: '2025-09-17T16:52:21.203Z',
            number: 88953
          },
          {
            _id: '68cae5ca673086001ba88a3a',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa0947',
              '643d69a5c3f7b9001cfa0949',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Экзо-плантаго флюоресцентный фалленианский бургер',
            createdAt: '2025-09-17T16:46:02.841Z',
            updatedAt: '2025-09-17T16:46:04.296Z',
            number: 88952
          }
        ],
        total: 88626,
        totalToday: 67
    };

    const newState = feedOrdersReducer(
      initialState,
      fetchFeed.fulfilled(feedOrder, '')
    );

    expect(newState).toEqual({
      ...initialState,
      items: feedOrder.orders,
      total: feedOrder.total,
      totalToday: feedOrder.totalToday
    });
  });

  it('проверка rejected', () => {
    const newState = feedOrdersReducer(
      initialState,
      fetchFeed.rejected(new Error('Error rejected'), '')
    );

    expect(newState).toEqual({
      ...initialState,
      error: 'Error rejected'
    });
  });
});
