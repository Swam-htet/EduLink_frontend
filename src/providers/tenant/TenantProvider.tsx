import { setTenantId } from '@/store/tenant.slice';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const tenantId = window.location.hostname.split('.')[0];

  useEffect(() => {
    dispatch(setTenantId(tenantId));
  }, [dispatch, tenantId]);

  return <React.Fragment>{children}</React.Fragment>;
};
