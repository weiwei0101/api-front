import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import React, {  } from 'react';
import ReactECharts from 'echarts-for-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { listTopInvokeInterfaceInfoUsingGET } from '@/services/api-back/analysisController';

/**
 * 接口分析
 * @returns
 */
const InterfaceAnalysis: React.FC = () => {
  
  const [data, setData] = useState<API.InterfaceInfoVO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try{
      listTopInvokeInterfaceInfoUsingGET().then(res => {
        if(res.data){
          setData(res.data);
        }
      })
    }catch(e:any){

    }
    // todo 从远程获取数据库
  }, [])

  // 映射，{ value: 1048, name: 'Search Engine' }
  const charData = data.map(item => {
    return {
      value: item.totalNum,
      name: item.name
    }
  })
  
  const option = {
    title: {
      text: '调用次数最多的接口TOP3',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: charData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <PageContainer>
      <ReactECharts loadingOption={{
        showLoading: loading
      }} option={option} />
    </PageContainer>
  );
};
export default InterfaceAnalysis;
