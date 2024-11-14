import { useAppDispatch } from '@/hooks';
import { useEffect } from 'react';

export default function useWorkloadHistory() {
  const dispatch = useAppDispatch();

  const data = [
    {
      EndDateTime: '2023-08-31T09:04:31.94',
      ProductName: 'Delivered',
      Quantity: 1,
    },
    {
      EndDateTime: '2023-08-31T09:04:31.94',
      ProductName: 'Extra',
      Quantity: 6,
    },
  ];
  const kolies = [
    {
      KTId: 26,
      KolliInfo: [[1], [2]],
      ProjectId: 15,
      Status: 4,
      WorkloadGuId: 'd73599a5-e7e0-4d85-9251-edd51f0e2080',
    },
    {
      KTId: 13,
      KolliInfo: [[9], [5]],
      ProjectId: 2,
      Status: 4,
      WorkloadGuId: '8a54c4e1-be6f-4d4e-a124-6790e4954949',
    },
  ];

  useEffect(() => {
    var array: number[] = [];
    kolies.map((item: { KTId: number }) => {
      array.push(item.KTId);
    });
    let ktid = array.join();
    const payload = {
      kTId: ktid,
    };
    // dispatch(getProductHistory(payload));
  }, []);

  return {
    dispatch,
    data,
    kolies,
  };
}
