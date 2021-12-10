import { IDeploymentType } from "../../types/imgixAPITypes";
import { AzureIcon } from "./AzureIcon";
import { GCSIcon } from "./GCSIcon";
import { S3Icon } from "./S3Icon";
import { WebFolderIcon } from "./WebFolderIcon";
import { WebProxyIcon } from "./WebProxyIcon";

export const SourceTypeIcon = ({
  type,
  className,
}: {
  type: IDeploymentType;
  className: string;
}) => {
  switch (type) {
    case "azure":
      return <AzureIcon className={className} />;
    case "gcs":
      return <GCSIcon className={className} />;
    case "s3":
      return <S3Icon className={className} />;
    case "webfolder":
      return <WebFolderIcon className={className} />;
    case "webproxy":
      return <WebProxyIcon className={className} />;
    default:
      return null;
  }
};
