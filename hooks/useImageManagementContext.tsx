/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

// hooks
import { useSearchContext } from "@/hooks/useSearchContext";
import { useStatusContext } from "@/hooks/useStatusContext";

// fetchAPIs
import {
  getFolders,
  addFolder,
  updateFolder,
  deleteFolder
} from "@/fetchAPIs/cms/folder";
import {
  getImages,
  addImages,
  updateImage,
  deleteImage
} from "@/fetchAPIs/cms/image";

// types
import { FolderDocument } from "@/schemas/cms/folder";
import { ImageDocument } from "@/schemas/cms/image";
import {
  PaginationResponseDataType,
  ResponseDataType
} from "@/types/cms/api";

type FolderContextValueType = {
  folders: {
    set: (folders: FolderDocument[]) => void;
    val: FolderDocument[];
  };
  active: {
    set: (id: string) => void;
    val: FolderDocument;
  };
  load: () => void;
  add: (folder: FolderDocument) => void;
  update: (
    folderId: string,
    folder: FolderDocument
  ) => void;
  del: (id: string) => void;
};

type ImageContextValueType = {
  images: {
    set: (images: ImageDocument[]) => void;
    val: ImageDocument[];
  };
  active: {
    set: (id: string) => void;
    val: ImageDocument;
  };
  selected: {
    set: (
      selectedImages: ImageDocument[]
    ) => void;
    val: ImageDocument[];
  };
  paginate: {
    count: number;
    offset: {
      set: (offset: number) => void;
      val: number;
    };
    reset: {
      set: (reset: boolean) => void;
      val: boolean;
    };
  };
  orderByDesc: {
    set: (orderByDesc: boolean) => void;
    val: boolean;
  };
  load: () => void;
  add: (images: Partial<ImageDocument>[]) => void;
  update: (
    imageId: string,
    image: ImageDocument
  ) => void;
  del: (id: string) => void;
};

type ImageManagementContextValueType = {
  folder: FolderContextValueType;
  image: ImageContextValueType;
};

// context
const ImageManagementContext = createContext<
  ImageManagementContextValueType | undefined
>(undefined);

// context provider
export function ImageManagementContextProvider({
  children
}: {
  children: ReactNode;
}) {
  // hooks
  const { keyword } = useSearchContext();

  const { addStatus } = useStatusContext();

  // states: folder
  const [folders, setFolders] = useState<
    FolderDocument[]
  >([]);
  const [activeFolderId, setActiveFolderId] =
    useState<string>("");

  // states: image
  const [images, setImages] = useState<
    ImageDocument[]
  >([]);
  const [activeImageId, setActiveImageId] =
    useState<string>("");
  const [selectedImages, setSelectedImages] =
    useState<ImageDocument[]>([]);

  // states: pagination
  const [count, setCount] = useState<number>(NaN);
  const [offset, setOffset] =
    useState<number>(NaN);
  const [reset, setReset] =
    useState<boolean>(false);

  // states: sort & search
  const [orderByDesc, setOrderByDesc] =
    useState<boolean>(true);

  // API handlers: folder
  const handleGetFolders = (): void => {
    getFolders()
      .then((responseData: ResponseDataType) => {
        setFolders(
          responseData.data as FolderDocument[]
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleAddFolder = (
    folder: FolderDocument
  ): void => {
    addFolder(folder)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);

        handleGetFolders();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleUpdateFolder = (
    folderId: string,
    folder: FolderDocument
  ): void => {
    updateFolder(folderId, folder)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);

        handleGetFolders();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleDeleteFolder = (
    folderId: string
  ): void => {
    deleteFolder(folderId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);

        handleGetFolders();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  // API handlers: image
  const handleGetImages = (): void => {
    getImages({
      folderId: activeFolderId,
      offset: offset,
      limit: 30,
      sortBy: "createdAt",
      orderBy: orderByDesc ? "desc" : "asc",
      filterBy: "",
      keyword: keyword,
      fromDate: "",
      toDate: ""
    })
      .then(
        (
          responseData: PaginationResponseDataType
        ) => {
          setCount(responseData.count);
          setImages(
            responseData.data as ImageDocument[]
          );
        }
      )
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleAddImage = (
    images: Partial<ImageDocument>[]
  ): void => {
    addImages(images)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);

        handleGetFolders();
        handleGetImages();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleUpdateImage = (
    imageId: string,
    image: ImageDocument
  ): void => {
    updateImage(imageId, image)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);

        handleGetImages();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleDeleteImage = (
    imageId: string
  ): void => {
    deleteImage(imageId)
      .then((responseData: ResponseDataType) => {
        addStatus(responseData.status);

        handleGetFolders();
        handleGetImages();
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  const handleSelection = (
    selectedImages: ImageDocument[]
  ): void => {
    setSelectedImages(selectedImages);
  };

  // event handlers
  // * on load
  useEffect(() => {
    handleGetFolders();
    handleGetImages();
  }, []);

  // * on folder change
  useEffect(() => {
    setReset(true);
    setActiveImageId("");
    handleGetImages();
  }, [activeFolderId]);

  // * on offset change
  useEffect(() => {
    handleGetImages();
    setActiveImageId("");
  }, [offset, orderByDesc]);

  // * on search
  useEffect(() => {
    handleGetImages();
  }, [keyword]);

  // context value: folder
  const folderContextValue: FolderContextValueType =
    {
      folders: { set: setFolders, val: folders },
      active: {
        set: setActiveFolderId,
        val: activeFolderId
          ? (folders.find(
              ({ _id }) => _id === activeFolderId
            ) as FolderDocument)
          : ({} as FolderDocument)
      },
      load: handleGetFolders,
      add: handleAddFolder,
      update: handleUpdateFolder,
      del: handleDeleteFolder
    };

  // context value: image
  const imageContextValue: ImageContextValueType =
    {
      images: { set: setImages, val: images },
      active: {
        set: setActiveImageId,
        val: activeImageId
          ? (images.find(
              ({ _id }) => _id === activeImageId
            ) as ImageDocument)
          : ({} as ImageDocument)
      },
      selected: {
        set: handleSelection,
        val: selectedImages
      },
      paginate: {
        count: count,
        offset: {
          set: setOffset,
          val: offset
        },
        reset: {
          set: setReset,
          val: reset
        }
      },
      orderByDesc: {
        set: setOrderByDesc,
        val: orderByDesc
      },
      load: handleGetImages,
      add: handleAddImage,
      update: handleUpdateImage,
      del: handleDeleteImage
    };

  // context value
  const imageManagementContextValue: ImageManagementContextValueType =
    {
      folder: folderContextValue,
      image: imageContextValue
    };

  return (
    <ImageManagementContext.Provider
      value={imageManagementContextValue}
    >
      {children}
    </ImageManagementContext.Provider>
  );
}

// hook
export const useImageManagementContext =
  (): ImageManagementContextValueType => {
    const context = useContext(
      ImageManagementContext
    );

    if (!context) {
      throw new Error(
        "useImageManageMentContext must be used within a ImageManagementContextProvider"
      );
    }

    return context;
  };
