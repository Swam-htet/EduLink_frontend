import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { NavigateFunction } from 'react-router-dom';

interface BackButtonProps {
  navigate: NavigateFunction;
}

const BackButton = ({ navigate }: BackButtonProps) => {
  return (
    <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
      <ChevronLeft className="h-4 w-4" />
    </Button>
  );
};

export default BackButton;
