import React from 'react'
import {
  Wrapper,
  Table,
  FormGroup,
  FormControl,
  Button,
  OrderSpan
} from '@/style'
import AddFormComponent from './addForm'

export default (props) => {
  const {
    itemsCnt,
    isAddCountry,
    countries,
    searchedCountries,
    searchText,
    orderType,
    orderBy,

    changeSearchText,
    orderCountries,
    deleteCountry,
    addCountry,
    toggleIsAddCountry
  } = props

  const countryRows = []
  const _itemsCnt = searchedCountries.length < itemsCnt ? searchedCountries.length : itemsCnt

  for (let i = 0; i < _itemsCnt; i++) {
    const country = searchedCountries[i]
    countryRows.push(
      <tr key={country.alpha2Code}>
        <td>{country.alpha2Code}</td>
        <td>{country.capital}</td>
        <td>{country.name}</td>
        <td>{country.region}</td>
        <td>{country.callingCodes.join(', ')}</td>
        <td>
          <Button
            bgColor="#fe3064"
            onClick={() => deleteCountry(i)}
          >삭제</Button>
        </td>
      </tr>
    )
  }

  return (
    <Wrapper>
      <h1>국가 정보</h1>
      <FormGroup>
        <FormControl
          value={searchText}
          onChange={changeSearchText}
          placeholder="국가 정보 검색"
        />
      </FormGroup>
      {
        isAddCountry ? (
          <AddFormComponent
            countries={countries}
            addCountry={addCountry}
            toggleIsAddCountry={toggleIsAddCountry}
          />
        ) : (
            <Button marginTop="10" marginBottom="10" onClick={toggleIsAddCountry}>추가</Button>
          )
      }
      <Table>
        <thead>
          <tr>
            <th>코드
              <OrderSpan
                onClick={() =>
                  orderCountries('alpha2Code', orderBy === 'asc' ? 'desc' : 'asc')
                }
              >
                {orderType === 'alpha2Code' && orderBy === 'asc' ? '△' : '▽'}
              </OrderSpan>
            </th>
            <th>수도
              <OrderSpan
                onClick={() =>
                  orderCountries('capital', orderBy === 'asc' ? 'desc' : 'asc')
                }
              >
                {orderType === 'capital' && orderBy === 'asc' ? '△' : '▽'}
              </OrderSpan>
            </th>
            <th>이름
              <OrderSpan
                onClick={() =>
                  orderCountries('name', orderBy === 'asc' ? 'desc' : 'asc')
                }
              >
                {orderType === 'name' && orderBy === 'asc' ? '△' : '▽'}
              </OrderSpan>
            </th>
            <th>대륙
              <OrderSpan
                onClick={() =>
                  orderCountries('region', orderBy === 'asc' ? 'desc' : 'asc')
                }
              >
                {orderType === 'region' && orderBy === 'asc' ? '△' : '▽'}
              </OrderSpan>
            </th>
            <th>국가 전화번호
              <OrderSpan
                onClick={() =>
                  orderCountries('callingCodes', orderBy === 'asc' ? 'desc' : 'asc')
                }
              >
                {orderType === 'callingCodes' && orderBy === 'asc' ? '△' : '▽'}
              </OrderSpan>
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {countryRows}
        </tbody>
      </Table>
    </Wrapper>
  )
}