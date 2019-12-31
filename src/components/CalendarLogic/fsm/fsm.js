export const fsm = {
  id: 'Calendar',
  initial: 'dateView',
  context: {
    internalDate: null,
    selectedDate: null,
    nodes: [],
    maxNodes: {},
    period: {},
    onSelect: () => {},
  },
  states: {
    dateView: {
      on: {
        INIT_DATE_VIEW: [
          {
            actions: ['initDateView'],
            target: ['#Calendar.dateView'],
          },
        ],
        SELECT_DATE: [
          {
            actions: ['selectDate'],
            target: ['#Calendar.dateView'],
          },
        ],
        GO_NEXT_MONTH: [
          {
            actions: ['goNextMonth'],
            target: ['#Calendar.dateView'],
          },
        ],
        GO_PREV_MONTH: [
          {
            actions: ['goPrevMonth'],
            target: ['#Calendar.dateView'],
          },
        ],
        GO_MONTH_VIEW: [
          {
            actions: ['goMonthView'],
            target: ['#Calendar.monthView'],
          },
        ],
      },
      order: 0,
    },
    monthView: {
      on: {
        SELECT_MONTH: [
          {
            actions: ['selectMonth'],
            target: ['#Calendar.dateView'],
          },
        ],
        GO_NEXT_YEAR: [
          {
            actions: ['goNextYear'],
            target: ['#Calendar.monthView'],
          },
        ],
        GO_PREV_YEAR: [
          {
            actions: ['goPrevYear'],
            target: ['#Calendar.monthView'],
          },
        ],
        GO_YEAR_VIEW: [
          {
            actions: ['goYearView'],
            target: ['#Calendar.yearView'],
          },
        ],
      },
      order: 1,
    },
    yearView: {
      on: {
        SELECT_YEAR: [
          {
            actions: ['selectYear'],
            target: ['#Calendar.monthView'],
          },
        ],
        GO_NEXT_PERIOD: [
          {
            actions: ['goNextPeriod'],
            target: ['#Calendar.yearView'],
          },
        ],
        GO_PREV_PERIOD: [
          {
            actions: ['goPrevPeriod'],
            target: ['#Calendar.yearView'],
          },
        ],
        GO_DATE_VIEW: [
          {
            actions: ['goDateView'],
            target: ['#Calendar.dateView'],
          },
        ],
      },
      order: 2,
    },
  },
}
