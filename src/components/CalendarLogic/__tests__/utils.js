import { range } from 'lodash'
import {
  getDateList,
  getMonthList,
  getYearList,
  getDateListPair,
  getYearListPair,
} from '../utils'

describe('getDateList', () => {
  it('should return a date list based on the given date', () => {
    expect(getDateList(new Date('2019-12-26'))).toEqual(range(1, 31 + 1))
    expect(getDateList(new Date('2020-02-01'))).toEqual(range(1, 29 + 1))
  })
})

describe('getMonthList', () => {
  it('should always return a month list which contains all months', () => {
    expect(getMonthList(new Date('2019-12-26'))).toEqual(range(1, 12 + 1))
    expect(getMonthList(new Date('2020-02-01'))).toEqual(range(1, 12 + 1))
  })
})

describe('getYearList', () => {
  it('should return a year list based on the given date and period', () => {
    expect(getYearList(new Date('2019-01-11'), { period: 5 })).toEqual(
      range(2015, 2020)
    )
    expect(getYearList(new Date('2020-01-11'), { period: 5 })).toEqual(
      range(2020, 2025)
    )
    expect(getYearList(new Date('2019-01-11'), { period: 10 })).toEqual(
      range(2010, 2020)
    )
    expect(getYearList(new Date('2020-01-11'), { period: 10 })).toEqual(
      range(2020, 2030)
    )
  })
})

describe('getDateListPair', () => {
  it('should get an object that contains `prev`, `curr` and `next` lists', () => {
    expect(getDateListPair(new Date('2020-01-11'))).toEqual({
      prev: getDateList(new Date('2019-12-11')),
      curr: getDateList(new Date('2020-01-11')),
      next: getDateList(new Date('2020-02-11')),
    })

    expect(getDateListPair(new Date('2020-12-31'))).toEqual({
      prev: getDateList(new Date('2019-11-30')),
      curr: getDateList(new Date('2020-12-31')),
      next: getDateList(new Date('2020-01-31')),
    })
  })
})

describe('getYearListPair', () => {
  it('should get an object that contains `prev`, `curr` and `next` lists', () => {
    expect(getYearListPair(new Date('2019-01-11'), { period: 10 })).toEqual({
      prev: getYearList(new Date('2018-01-11'), { period: 10 }),
      curr: getYearList(new Date('2019-01-11'), { period: 10 }),
      next: getYearList(new Date('2020-01-11'), { period: 10 }),
    })

    expect(getYearListPair(new Date('2020-12-31'), { period: 10 })).toEqual({
      prev: getYearList(new Date('2019-12-31'), { period: 10 }),
      curr: getYearList(new Date('2020-12-31'), { period: 10 }),
      next: getYearList(new Date('2021-12-31'), { period: 10 }),
    })
  })
})
