import { range } from 'lodash'
import { getDateList, getMonthList, getYearList } from '../utils'

describe('get list', () => {
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
})
