import { createAction, handleActions } from 'redux-actions'
import _ from 'lodash'

import CountryActions from '@/fetchActions/country'

import { sortByKeyDesc, sortByKeyAsc } from '@/utils/sortByKey'

const GET_COUNTRIES_SUCCESS = 'GET_COUNTRIES_SUCCESS'
const GET_COUNTRIES_ERROR = 'GET_COUNTRIES_ERROR'
const CHANGE_SEARCH_TEXT = 'CHANGE_SEARCH_TEXT'
const SEARCH_COUNTRIES = 'SEARCH_COUNTRIES'
const ORDER_COUNTRIES = 'ORDER_COUNTRIES'
const DELETE_COUNTRY = 'DELETE_COUNTRY'
const ADD_COUNTRY = 'ADD_COUNTRY'


/**
 * redux-thunk 미들웨어 사용.
 * API 결과 값을 받아 온 뒤 dispatch(비동기 store)
 * 
 * 국가 전체 가져오기
 */
export const getCountries = () => async dispatch => {
  try {
    const response = await CountryActions.getCountries()
    dispatch({
      type: GET_COUNTRIES_SUCCESS,
      countries: response.data
    })
  } catch (err) {
    /**
     * 에러 발생시 화면에 출력
     */
    dispatch({ type: GET_COUNTRIES_ERROR })
  }
}

const _getCountriesSuccess = (state, { countries }) => {
  return {
    ...state,
    countries,
    searchedCountries: countries
  }
}

const _getCountriesError = state => {
  return {
    ...state,
    countries: [],
    countriesError: true
  }
}

/**
 * 검색어 onChnage
 */

export const changeSearchText = createAction(CHANGE_SEARCH_TEXT)
const _changeSearchText = (state, { payload }) => ({
  ...state,
  ...payload
})

/**
 * 검색 버튼 클릭(통합 검색)
 * 대소문자 구분 x
 * 부분 일치
 */

const findCountries = ({ searchText, countries }) => {
  // 대소문자 구분을 하지 않기 위해 소문자로 변경
  const _searchText = searchText.toLowerCase()
  const searchedCountries = countries.filter(country => {
    const _country = Object.entries(country).some(row => {
      // 대소문자 구분을 하지 않기 위해 소문자로 변경
      // 숫자를 string 으로 변경해서 indexOf 사용
      const value = typeof row[1] === 'string' ? row[1].toLowerCase() : String(row[1])
      if (value.indexOf(_searchText) >= 0) {
        return true
      } else {
        return false
      }
    })

    return _country
  })

  return searchedCountries
}

export const searchCountries = createAction(SEARCH_COUNTRIES)
const _searchCountries = state => {
  const searchedCountries = findCountries(state)

  return {
    ...state,
    orderBy: '',
    orderType: '',
    searchedCountries
  }
}

/**
 * 정렬 기능
 */
export const orderCountries = createAction(ORDER_COUNTRIES)
const _orderCountries = (state, { payload }) => {
  const { orderBy, orderType } = payload
  let searchedCountries
  if (orderBy === 'desc') {
    searchedCountries = sortByKeyDesc(state.searchedCountries, orderType)
  } else {
    searchedCountries = sortByKeyAsc(state.searchedCountries, orderType)
  }
  return {
    ...state,
    searchedCountries,
    orderBy,
    orderType
  }
}

/**
 * 국가 삭제
 */
export const deleteCountry = createAction(DELETE_COUNTRY)
const _deleteCountry = (state, { payload }) => {
  const {
    index
  } = payload

  const searchedCountries = state.searchedCountries.map(row => ({ ...row }))
  const countries = state.countries.map(row => ({ ...row }))

  const targetCountry = searchedCountries[index]
  const targetOriginIndex = _.findIndex(countries, country => (
    country.alpha2Code === targetCountry.alpha2Code
  ))

  searchedCountries.splice(index, 1)
  countries.splice(targetOriginIndex, 1)

  return {
    ...state,
    searchedCountries,
    countries
  }
}

/**
 * 국가 추가
 * 현재 정렬중이면 정렬
 */
export const addCountry = createAction(ADD_COUNTRY)
const _addCountry = (state, { payload }) => {
  let countries = state.countries.map(row => ({ ...row }))
  countries.push(payload)

  let searchedCountries = findCountries({
    searchText: state.searchText,
    countries
  })

  if (state.orderBy && state.orderType) {
    if (state.orderBy === 'asc') {
      searchedCountries = sortByKeyAsc(searchedCountries, state.orderType)
    } else {
      searchedCountries = sortByKeyDesc(searchedCountries, state.orderType)
    }
  }
  return {
    ...state,
    countries,
    searchedCountries
  }
}

const initialState = {
  countries: [],
  countriesError: false,
  searchText: '',
  searchedCountries: [],
  orderBy: '',
  orderType: ''
}

export default handleActions({
  [GET_COUNTRIES_SUCCESS]: _getCountriesSuccess,
  [GET_COUNTRIES_ERROR]: _getCountriesError,
  [CHANGE_SEARCH_TEXT]: _changeSearchText,
  [SEARCH_COUNTRIES]: _searchCountries,
  [ORDER_COUNTRIES]: _orderCountries,
  [DELETE_COUNTRY]: _deleteCountry,
  [ADD_COUNTRY]: _addCountry
}, initialState);