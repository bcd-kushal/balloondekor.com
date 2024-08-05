//components
import ImageManagement from "@/components/cms/image-management/ImageManagement";

import { ImageManagementContextProvider } from "@/hooks/useImageManagementContext";

const page: React.FC = () => {
  return (
    <ImageManagementContextProvider>
      <ImageManagement />
    </ImageManagementContextProvider>
  );
};

export default page;
