export interface UploadedImage {
  id: string;
  file?: File;
  preview: string;
  isDefault?: boolean;
}

export interface UploadedVideo {
  file?: File;
  preview: string;
  isDefault?: boolean;
}

export interface MediaData {
  images: {
    mainImage?: File;
    sideImage?: File;
    sideImage2?: File;
    lastImage?: File;
  };
  video?: File;
  removedDefaultImageIds?: string[];
}

export interface DefaultImages {
  mainImage?: string;
  sideImage?: string;
  sideImage2?: string;
  lastImage?: string;
}

export interface MediaUploadProps {
  onMediaChange: (mediaData: MediaData) => void;
  defaultImages?: DefaultImages;
  defaultVideo?: string;
}