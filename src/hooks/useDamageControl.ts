import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FileEntityType } from '@/enums';
import { useAppSelector } from '@/hooks';
import { navigate } from '@/navigators/Root';
import { getSelectedVehicleId } from '@/store/vehicle';
import { vehicleInspectionService } from '@/services/vehicleInspection';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

const useDamageControl = ()=> {
    const vId = useAppSelector(getSelectedVehicleId);
    const [damages, setDamages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [visible, setIsVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loadingImages, setLoadingImages] = useState<boolean[]>([]);
    const [filters, setFilters] = useState({CurrentPage: 1, PageSize: 10});

    useFocusEffect(
        useCallback(()=> {
            setDamages([]);
            setHasMore(true);
            setFilters({...filters, CurrentPage: 1});
        }, [])
    );

    useEffect(()=> {
        fetchData();
    }, [filters]);

    const fetchData = ()=> {
        setLoading(true);
        vehicleInspectionService.getDamageImages({...filters, VehicleIds: [vId]}).then(res=> {
            const hasDamages = res.Items?.length;
            if(hasDamages) {
                setLoadingImages(Array(damages.length+hasDamages).fill(true));
                setDamages([...damages, ...res.Items]);
            } else {
                setHasMore(false);
            }
            setLoading(false);
        });
    };

    const handleNavigation = ()=> {
        navigate('RegisterNewDamage');
    };

    const handleImageLoad = (index: number, error?: boolean) => {
      const newLoadingImages = [...loadingImages];
      newLoadingImages[index] = error? undefined: false;
      setLoadingImages(newLoadingImages);
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>)=> {
        if(hasMore && !loading) {
            const contentOffsetX = event.nativeEvent.contentOffset.x;
            const contentWidth = event.nativeEvent.contentSize.width;
            const layoutWidth = event.nativeEvent.layoutMeasurement.width;

            if(contentOffsetX + layoutWidth >= contentWidth - 20) {
                setFilters({...filters, CurrentPage: filters.CurrentPage+1});
            }
        }
    };

    return { damages, selectedIndex, setSelectedIndex, handleNavigation, loadingImages, setLoadingImages, handleImageLoad, visible, setIsVisible, handleScroll };
};

export default useDamageControl;