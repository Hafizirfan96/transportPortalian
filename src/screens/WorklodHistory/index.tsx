import React from 'react';
import useWorkloadHistory from './useWorkloadHistory';
import WorkloadHistoryComponent from '@/components/Workload/WorkloadHistory';

function WorkloadHistory(props: any) {
  const { data } = useWorkloadHistory();

  return <WorkloadHistoryComponent data={data} />;
}

export default WorkloadHistory;
