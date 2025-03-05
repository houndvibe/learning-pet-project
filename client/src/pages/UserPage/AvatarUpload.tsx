// AvatarUpload.tsx
import React from "react";
import { Upload, Avatar } from "antd";
import { UploadProps } from "antd/es/upload";
import { UserOutlined } from "@ant-design/icons";
import "./styles.scss";

interface AvatarUploadProps {
  avatar: string | undefined;
  setAvatar: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ avatar, setAvatar }) => {
  const handleUpload: UploadProps["beforeUpload"] = (file) => {
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result as string);
    reader.readAsDataURL(file);
    return false;
  };

  return (
    <div className="avatar-upload">
      <Upload showUploadList={false} beforeUpload={handleUpload}>
        <Avatar
          size={100}
          icon={!avatar && <UserOutlined />}
          src={avatar || undefined}
          className="avatar"
        />
      </Upload>
    </div>
  );
};

export default AvatarUpload;
