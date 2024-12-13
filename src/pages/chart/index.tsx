import { useEffect, useRef, useState } from 'react';


import {
  Chart as ChartJS,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  InteractionItem,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Doughnut, getElementAtEvent } from 'react-chartjs-2';
import styled from 'styled-components';

import LoadingSpinner from '@components/loading-spinner';
import { BACKGROUND_COLORS, BORDER_COLORS } from '@constants/chart-color';
import usePageTransition from '@hooks/use-page-transition';
import { useAppSelector } from '@store/hooks';
import { useGetSpendingMoneyForChartQuery } from '@store/query/calendar-query';

import CategorySpending from './components/category-spending';
import ChartNavBar from './components/chart-nav-bar';
import EmptyDoughnut from './components/empty-doughnut';
import EmptySpending from './components/empty-spending';
import makePercentage from './utils/make-percentage';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, Title);

function Chart() {
  const { chartDate, chartType } = useAppSelector((state) => state.chart);
  const [year, month] = [
    format(chartDate, 'yyyy'),
    chartType === 'year' ? null : format(chartDate, 'MM'),
  ];
  const [clickedIdx, setClickedIdx] = useState(-1);

  const pageTransition = usePageTransition();
  const chartRef = useRef<ChartJS<'doughnut'>>(null);
  const categoryBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (clickedIdx !== -1 && categoryBoxRef.current) {
      const activeItem = categoryBoxRef.current.children[
        clickedIdx
      ] as HTMLElement;

      if (activeItem) {
        categoryBoxRef.current.scrollTo({
          top: activeItem.offsetTop - categoryBoxRef.current.offsetTop - 5,
          behavior: 'smooth',
        });
      }
    }
  }, [clickedIdx]);

  const { data, isLoading, isError } = useGetSpendingMoneyForChartQuery({
    year,
    month,
  });

  if (isLoading)
    return (
      <S.Container {...pageTransition}>
        <ChartNavBar onClickIdxInit={() => setClickedIdx(-1)} />

        <LoadingSpinner height={`calc(100% - 44px)`} />
      </S.Container>
    );
  if (isError) return <div>Error...</div>;

  const { total, spendingMoneysForChart } = data!;

  const [labels, money] = [
    spendingMoneysForChart.map((s) => s[0]),
    spendingMoneysForChart.map((s) => parseInt(s[1])),
  ];

  const setElementAtEvent = (element: InteractionItem[]) => {
    if (!element.length) return;

    const { index: idx } = element[0];

    setClickedIdx((prev) => {
      if (prev === idx) return -1;
      return idx;
    });
  };

  const onClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { current: doughnut } = chartRef;

    if (!doughnut) {
      return;
    }

    setElementAtEvent(getElementAtEvent(doughnut as ChartJS, event));
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: '금액',
        data: money,
        backgroundColor: BACKGROUND_COLORS,
        borderColor: BORDER_COLORS,
        borderWidth: 1,
        datalabels: {
          display: true,
        },
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    plugins: {
      datalabels: {
        color: 'black',
        display: true,
        font: {
          size: 12,
        },
        formatter: (value: number, context) => {
          const label = context.chart.data.labels?.[context.dataIndex] || '';
          return `${label}\n${makePercentage(value, total)}`;
        },
        textAlign: 'center',
      },
      tooltip: {
        enabled: true,
      },
      legend: {
        display: false,
        position: 'top',
        onClick: () => {},
      },
      title: {
        display: true,
        text: `지출: ${total.toLocaleString()}원`,
        font: {
          size: 15, // 제목 글씨 크기
          weight: 'normal',
        },
        color: '#333', // 제목 색상
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        bottom: 10,
      },
    },
    cutout: '30%',
    maintainAspectRatio: false,
  };

  return (
    <S.Container {...pageTransition}>
      <ChartNavBar onClickIdxInit={() => setClickedIdx(-1)} />
      <S.DoughnutBox>
        {spendingMoneysForChart.length ? (
          <Doughnut
            ref={chartRef}
            options={options}
            data={chartData}
            onClick={onClick}
          />
        ) : (
          <EmptyDoughnut />
        )}
      </S.DoughnutBox>
      <S.CategorySpendingBox
        ref={categoryBoxRef}
        $isEmptySpending={!spendingMoneysForChart.length}
      >
        {spendingMoneysForChart.length ? (
          spendingMoneysForChart.map((spendingMoney, idx) => (
            <CategorySpending
              key={spendingMoney[0]}
              category={spendingMoney[0]}
              percentage={makePercentage(+spendingMoney[1], total)}
              total={+spendingMoney[1]}
              idx={idx}
              onClick={() => {
                setClickedIdx((prev) => {
                  if (prev === idx) return -1;
                  return idx;
                });
              }}
              isClicked={idx === clickedIdx}
              initialSpendings={spendingMoneysForChart[idx][2]}
            />
          ))
        ) : (
          <EmptySpending />
        )}
      </S.CategorySpendingBox>
    </S.Container>
  );
}

export default Chart;

const S = {
  Container: styled(motion.div)`
    background-color: var(--white);
    height: 100dvh;
  `,
  DoughnutBox: styled.div`
    display: flex;
    justify-content: center;
    height: calc(60% - 10dvh);
  `,
  CategorySpendingBox: styled.div<{ $isEmptySpending: boolean }>`
    height: 40%;
    border-top: 1px solid var(--gray01);
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding-block: 10px;
    padding-inline: 15px;
    overflow-y: auto;
    position: ${({ $isEmptySpending }) => $isEmptySpending && 'relative'};
  `,
};
