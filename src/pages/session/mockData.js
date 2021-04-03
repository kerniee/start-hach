import {colors, barColors} from "../../components/Colors";

const columnColors = barColors;

const series = [
  {
    name: 'Buffer',
    data: [
      {
        x: 'Content 1',
        y: [
          new Date('2019-03-05T03:00:00').getTime(),
          new Date('2019-03-05T03:30:00').getTime()
        ]
      },
      {
        x: 'Content 2',
        y: [
          new Date('2019-03-05T03:20:00').getTime(),
          new Date('2019-03-05T03:50:00').getTime()
        ]
      },
      {
        x: 'Content 2',
        y: [
          new Date('2019-03-05T03:40:00').getTime(),
          new Date('2019-03-05T04:00:00').getTime()
        ]
      },
      {
        x: 'Content 3',
        y: [
          new Date('2019-03-05T02:50:00').getTime(),
          new Date('2019-03-05T02:55:00').getTime()
        ]
      },
      {
        x: 'Content 3',
        y: [
          new Date('2019-03-05T03:00:00').getTime(),
          new Date('2019-03-05T03:10:00').getTime()
        ]
      },
      {
        x: 'Content 4',
        y: [
          new Date('2019-03-05T03:30:00').getTime(),
          new Date('2019-03-05T03:40:00').getTime()
        ]
      },
      {
        x: 'Content 2',
        y: [
          new Date('2019-03-05T05:00:00').getTime(),
          new Date('2019-03-05T05:10:00').getTime()
        ]
      }
    ]
  },
  {
    name: 'Pause',
    data: [
      {
        x: 'Content 1',
        y: [
          new Date('2019-03-05T03:10:00').getTime(),
          new Date('2019-03-05T03:20:00').getTime()
        ]
      },
      {
        x: 'Content 2',
        y: [
          new Date('2019-03-05T03:50:00').getTime(),
          new Date('2019-03-05T04:10:00').getTime()
        ]
      },
      {
        x: 'Content 3',
        y: [
          new Date('2019-03-05T04:30:00').getTime(),
          new Date('2019-03-05T04:40:00').getTime()
        ]
      },
      {
        x: 'Content 4',
        y: [
          new Date('2019-03-05T04:40:00').getTime(),
          new Date('2019-03-05T04:45:00').getTime()
        ]
      },
      {
        x: 'Content 4',
        y: [
          new Date('2019-03-05T03:05:00').getTime(),
          new Date('2019-03-05T03:20:00').getTime()
        ]
      }
    ]
  },
  {
    name: 'Error',
    data: [
      {
        x: 'Content 1',
        y: [
          new Date('2019-03-05T03:45:00').getTime(),
          new Date('2019-03-05T03:46:00').getTime()
        ]
      },
      {
        x: 'Content 2',
        y: [
          new Date('2019-03-05T03:00:00').getTime(),
          new Date('2019-03-05T03:10:00').getTime()
        ]
      },
    ]
  }
]

const options = {
  chart: {
    height: 450,
    type: 'rangeBar',
    animations: {
      enabled: false
    }
  },
  markers: {
    size: 0
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '80%'
    }
  },
  xaxis: {
    type: 'datetime',
    labels: {
      style: {
        colors: colors.textColor,
        fontSize: "14px",
      },
    },
    axisBorder: {
      show: true,
      color: colors.gridLineColor
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: colors.textColor,
        fontSize: "14px",
      },
    },
    axisBorder: {
      show: true,
      color: colors.textColor
    },
  },
  colors: columnColors,
  tooltip: {
    theme: "dark",
    x: {
      format: 'yy.MM.dd HH:mm:ss',
    }
  },
  grid: {
    borderColor: colors.gridLineColor,
  },
  stroke: {
    width: 1
  },
  fill: {
    type: 'solid',
    opacity: 0.6
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    show: true,
    labels: {
      colors: colors.textColor,
    },
    itemMargin: {
      horizontal: 10,
      vertical: 5
    },
  }
}

export {series, options};