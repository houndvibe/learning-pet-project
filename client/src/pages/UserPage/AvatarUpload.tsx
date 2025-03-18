import { Upload, Avatar, message } from "antd";
import { UploadProps } from "antd/es/upload";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import "./styles.scss";
import { RcFile } from "antd/lib/upload";

interface AvatarUploadProps {
  avatar: string | null;
  setAvatar: React.Dispatch<React.SetStateAction<string | null>>;
}

const checkFileType = (file: RcFile) => {
  const isImage = file.type.startsWith("image/");
  if (!isImage) {
    message.error("Вы можете загрузить только изображение!");
    return false;
  }
};

const checkFileSize = (file: RcFile) => {
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Изображение должно быть меньше 2MB!");
    return false;
  }
};

const readFile = (file: RcFile): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        resolve(reader.result as string);
      }
    };
  });
};

const AvatarUpload: React.FC<AvatarUploadProps> = ({ avatar, setAvatar }) => {
  const handleChange: UploadProps["beforeUpload"] = async (file) => {
    checkFileType(file);
    checkFileSize(file);
    const result = await readFile(file);
    setAvatar(result);
    return false;
  };

  return (
    <div className="avatar-upload">
      <Upload
        showUploadList={false}
        beforeUpload={handleChange}
        className="avatar-uploader"
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          {avatar ? (
            <Avatar size={200} src={avatar} className="avatar" />
          ) : (
            <Avatar size={200} icon={<UserOutlined />} className="avatar" />
          )}
          <div className="avatar-upload__overlay">
            <PlusOutlined className="avatar-upload__icon" />
            Изменить
          </div>
        </div>
      </Upload>
    </div>
  );
};

export default AvatarUpload;
