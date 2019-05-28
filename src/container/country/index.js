import React, { Component } from 'react'
import { connect } from "react-redux";
import _ from 'lodash'

import { CountryActions } from '@/store/actionCreators'

import CountryComponent from '@/component/country'

class CountryContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemsCnt: 50,
      isAddCountry: false
    }

    this.searchCountries = _.debounce(this.searchCountries, 300);
  }

  componentDidMount() {
    CountryActions.getCountries()
    window.addEventListener('scroll', this.getCountriesByScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.getCountriesByScroll)
  }

  changeSearchText = e => {
    CountryActions.changeSearchText({
      searchText: e.target.value
    })

    this.searchCountries()
  }

  searchCountries = () => {
    CountryActions.searchCountries()
  }

  orderCountries = (orderType, _orderBy) => {
    const orderBy = this.props.orderType !== orderType ? 'asc' : _orderBy
    CountryActions.orderCountries({
      orderType,
      orderBy
    })
  }

  deleteCountry = index => {
    CountryActions.deleteCountry({ index })
  }

  getCountriesByScroll = () => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
    let clientHeight = document.documentElement.clientHeight

    if (scrollTop + clientHeight === scrollHeight) {
      this.setState({
        itemsCnt: this.state.itemsCnt + 50
      })
    }
  }

  toggleIsAddCountry = () => {
    this.setState({
      isAddCountry: !this.state.isAddCountry
    })
  }

  addCountry = values => {
    CountryActions.addCountry({
      ...values,
      alpha2Code: values.alpha2Code.toUpperCase()
    })
    this.toggleIsAddCountry()
  }

  render() {
    const {
      countriesError,
      countries,
      searchedCountries,
      searchText,
      orderType,
      orderBy
    } = this.props

    const {
      itemsCnt,
      isAddCountry
    } = this.state

    return countriesError ? <div>API 에러 발생!!</div> : (
      <CountryComponent
        itemsCnt={itemsCnt}
        isAddCountry={isAddCountry}
        countries={countries}
        searchedCountries={searchedCountries}
        searchText={searchText}
        orderType={orderType}
        orderBy={orderBy}
        changeSearchText={this.changeSearchText}
        orderCountries={this.orderCountries}
        deleteCountry={this.deleteCountry}
        addCountry={this.addCountry}
        toggleIsAddCountry={this.toggleIsAddCountry}
      />
    )
  }
}

export default connect(state => ({
  ...state.country
}))(CountryContainer);