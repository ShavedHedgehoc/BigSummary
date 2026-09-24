import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/shared/ui';
import { FormCloseButton } from './form-close-button';

interface FormLayoutProps {
  title: string;
  description: string;
  onClose?: () => void;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function FormLayout({ title, description, onClose, children, footer }: FormLayoutProps) {
  return (
    <div className="container mx-auto flex items-center justify-center flex-col p-4 md:p-8 flex-1 ">
      <Card className="w-full px-3 sm:max-w-md shadow-none md:shadow-sm border-0 md:border ring-0 md:ring-1 relative">
        <div className="absolute right-3 top-3">
          {onClose && <FormCloseButton handleClose={onClose} />}
        </div>
        <div className="flex flex-col gap-4">
          <CardHeader>
            <CardTitle>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{title}</h3>
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
          <CardFooter className="mt-2">{footer}</CardFooter>
        </div>
      </Card>
    </div>
  );
}
