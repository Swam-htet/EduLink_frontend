import LandingService from '@/modules/Tenant/Landing/services/landing.service';
import { setTenantId, setTitle } from '@/store/tenant.slice';
import { useQuery } from '@tanstack/react-query';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const tenantId = hostname.includes('.') ? hostname.split('.')[0] : null;

  console.log(tenantId);

  const {
    data: heroLandingData,
    isLoading: isHeroLandingDataLoading,
    isSuccess: isHeroLandingDataSuccess
  } = useQuery({
    queryKey: ['hero-landing-data', tenantId],
    queryFn: () => LandingService.getHeroLandingData(),
    enabled: !!tenantId // only fetch if tenantId exists
  });

  useEffect(() => {
    dispatch(setTenantId(tenantId));
  }, [dispatch, tenantId]);

  // is loading
  if (isHeroLandingDataLoading && tenantId) {
    return <div>Loading...</div>;
  }

  if (heroLandingData && isHeroLandingDataSuccess) {
    dispatch(setTenantId(tenantId));
    dispatch(setTitle(heroLandingData.data.title));
  }

  if (!heroLandingData && tenantId) {
    return <div>Invalid tenant</div>;
  }

  return <React.Fragment>{children}</React.Fragment>;
};
