import {describe, expect, test} from "@jest/globals"
import { getMatchedData } from "@/helper"
import config from "@/config.json"

describe("helper", () => {
  const mockData = {"date":20210307,"state":"CA","positive":3501394,"probableCases":null,"negative":null,"pending":null,"totalTestResultsSource":"totalTestsViral","totalTestResults":49646014,"hospitalizedCurrently":4291,"hospitalizedCumulative":null,"inIcuCurrently":1159,"inIcuCumulative":null,"onVentilatorCurrently":null,"onVentilatorCumulative":null,"recovered":null,"lastUpdateEt":"3/7/2021 02:59","dateModified":"2021-03-07T02:59:00Z","checkTimeEt":"03/06 21:59","death":54124,"hospitalized":null,"hospitalizedDischarged":null,"dateChecked":"2021-03-07T02:59:00Z","totalTestsViral":49646014,"positiveTestsViral":null,"negativeTestsViral":null,"positiveCasesViral":3501394,"deathConfirmed":null,"deathProbable":null,"totalTestEncountersViral":null,"totalTestsPeopleViral":null,"totalTestsAntibody":null,"positiveTestsAntibody":null,"negativeTestsAntibody":null,"totalTestsPeopleAntibody":null,"positiveTestsPeopleAntibody":null,"negativeTestsPeopleAntibody":null,"totalTestsPeopleAntigen":null,"positiveTestsPeopleAntigen":null,"totalTestsAntigen":null,"positiveTestsAntigen":null,"fips":"06","positiveIncrease":3816,"negativeIncrease":0,"total":3501394,"totalTestResultsIncrease":133186,"posNeg":3501394,"dataQualityGrade":null,"deathIncrease":258,"hospitalizedIncrease":0,"hash":"63c5c0fd2daef2fb65150e9db486de98ed3f7b72","commercialScore":0,"negativeRegularScore":0,"negativeScore":0,"positiveScore":0,"score":0,"grade":""}
  const simpleSchema = [{
    label: "Date",
    key: "date",
    isDate: "true"
  },
  {
    label: "Cases",
    key: "positive"
  }]
  const nestedSchema = [{
    "label": "Total Test Results",
    "key": [
      {
        "label": "Positive + Negative",
        "key": "totalTestResults"
      }
    ]
  }]
  const schema = config.schema.stateHistory.data
  const simpleSchemaExtpected = [
    { "isDate": true, "isNumber": false, "label": "Date", "value": 20210307 },
    { "isDate": false, "isNumber": true, "label": "Cases", "value": 3501394 }
  ]
  const nestedSchemaExtpected = [
    {"childItems": 1, "label": "Total Test Results", "value": ""},
    {"isDate": false, "isNumber": true, "label": "Positive + Negative", "value": 49646014}
  ]
  const expectedResult = [
    {"isDate": true, "isNumber": false, "label": "Date", "value": 20210307},
    {"isDate": false, "isNumber": true, "label": "Cases", "value": 3501394},
    {"isDate": false, "isNumber": true, "label": "Negative Tests", "value": null},
    {"isDate": false, "isNumber": true, "label": "Hospitalized", "value": 4291},
    {"isDate": false, "isNumber": true, "label": "In ICU", "value": 1159},
    {"isDate": false, "isNumber": true, "label": "On Ventilator", "value": null},
    {"isDate": false, "isNumber": true, "label": "Total Test Results", "value": 49646014}
  ]

  test("mock data simple schema test", () => {
    const result = getMatchedData(mockData, simpleSchema)
    expect(result).toStrictEqual(simpleSchemaExtpected)
  })

  test("mock data nested schema test", () => {
    const result = getMatchedData(mockData, nestedSchema)
    expect(result).toStrictEqual(nestedSchemaExtpected)
  })

  test("mock data real schema test", () => {
    const result = getMatchedData(mockData, schema)
    expect(result).toStrictEqual(expectedResult)
  })
})
