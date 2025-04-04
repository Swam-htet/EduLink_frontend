interface EdulinkOrTenantRouteProps {
  edulinkLandingPage: React.ReactNode;
  tenantLandingPage: React.ReactNode;
}

export const EdulinkOrTenantRoute: React.FC<EdulinkOrTenantRouteProps> = ({
  edulinkLandingPage,
  tenantLandingPage
}) => {
  const domain = window.location.hostname;
  console.log(domain);
  if (!domain.includes('.')) {
    return edulinkLandingPage;
  }

  return tenantLandingPage;
};
