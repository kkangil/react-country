import React from 'react'
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

import {
  FormGroup,
  Button,
  Label,
  FieldForm,
  FieldError
} from '@/style'

export default (props) => {
  const {
    countries,
    addCountry,
    toggleIsAddCountry
  } = props

  const validationSchema = Yup.object().shape({
    alpha2Code: Yup.string()
      .test("duplCode", "중복된 코드가 존재합니다.", value => {
        return value ? !countries.filter(country => country.alpha2Code.toLowerCase() === value.toLowerCase()).length : true
      })
      .length(2, "코드는 2자로 입력해주세요.")
      .matches(/^[a-z]+$/i, "코드는 영문만 가능합니다.")
      .required("코드를 입력해 주세요."),
    capital: Yup.string()
      .test("duplCapital", "중복된 수도가 존재합니다.", value => {
        return value ? !countries.filter(country => country.capital.toLowerCase() === value.toLowerCase()).length : true
      })
      .required("수도를 입력해 주세요."),
    name: Yup.string()
      .test("duplName", "중복된 이름이 존재합니다.", value => {
        return value ? !countries.filter(country => country.name.toLowerCase() === value.toLowerCase()).length : true
      })
      .required('이름을 입력해주세요.'),
    region: Yup.string()
      .required('대륙을 입력해주세요.'),
    callingCodes: Yup.array().of(
      Yup.string()
        .test("duplCallingCode", "중복된 국가 전화번호 입니다.", value => {
          if (value) {
            const _countries = countries.filter(country => {
              const duplCallingCodes = country.callingCodes.filter(code => code === value)
              return !!duplCallingCodes.length
            })

            return !_countries.length
          } else {
            return true
          }
        })
        .matches(/^[0-9]+$/i, "국가 전화번호는 숫자만 가능합니다.")
        .required('국가 전화번호를 입력해주세요.')
    ),
  })

  return (
    <Formik
      initialValues={{
        alpha2Code: "",
        capital: "",
        name: "",
        region: "",
        callingCodes: ['']
      }}
      validationSchema={validationSchema}
      onSubmit={values => addCountry(values)}
    >
      {({ values, errors, touched, handleChange }) => (
        <Form>
          <FormGroup>
            <Label>코드</Label>
            <FieldForm>
              <Field
                className="form-control"
                name="alpha2Code"
                id="alpha2Code"
                onChange={handleChange}
              />
            </FieldForm>
          </FormGroup>
          {errors.alpha2Code && touched.alpha2Code ? (
            <FieldError>
              {errors.alpha2Code}
            </FieldError>
          ) : null}
          <FormGroup>
            <Label>수도</Label>
            <FieldForm>
              <Field
                className="form-control"
                name="capital"
                id="capital"
                onChange={handleChange}
              />
            </FieldForm>
          </FormGroup>
          {errors.capital && touched.capital ? (
            <FieldError>
              {errors.capital}
            </FieldError>
          ) : null}
          <FormGroup>
            <Label>이름</Label>
            <FieldForm>
              <Field
                className="form-control"
                name="name"
                id="name"
                onChange={handleChange}
              />
            </FieldForm>
          </FormGroup>
          {errors.name && touched.name ? (
            <FieldError>
              {errors.name}
            </FieldError>
          ) : null}
          <FormGroup>
            <Label>대륙</Label>
            <FieldForm>
              <Field
                className="form-control"
                name="region"
                id="region"
                onChange={handleChange}
              />
            </FieldForm>
          </FormGroup>
          {errors.region && touched.region ? (
            <FieldError>
              {errors.region}
            </FieldError>
          ) : null}
          <FormGroup>
            <Label
              isFlex={true}
            >국가 전화번호</Label>
          </FormGroup>
          <FieldArray
            name="callingCodes"
            render={arrayHelpers => (
              <div>
                <Button
                  marginBottom="10"
                  onClick={() => arrayHelpers.insert(0, '')}
                >전화번호 추가</Button>
                {
                  values.callingCodes.map((_, index) => (
                    <div key={index}>
                      <FieldForm marginBottom="5">
                        <Field name={`callingCodes.${index}`} />
                        <Button
                          bgColor="#fe3064"
                          marginLeft="10"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          -
                    </Button>
                      </FieldForm>
                      {errors.callingCodes && touched.callingCodes ? (
                        <FieldError>
                          {errors.callingCodes[index]}
                        </FieldError>
                      ) : null}
                    </div>
                  ))
                }
              </div>
            )}
          />
          <Button marginTop="10" marginBottom="10" type="submit">추가</Button>
          <Button marginLeft="10" bgColor="#fe3064" onClick={toggleIsAddCountry}>취소</Button>
        </Form>
      )}
    </Formik>
  )
}