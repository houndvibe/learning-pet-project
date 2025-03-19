import { Avatar, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~features/auth/model/selector";
import { createFilePath } from "~shared/lib/file/creeateFilePath";
import { UserOutlined } from "@ant-design/icons";

export const UserThumb = ({ isExpanded }: { isExpanded: boolean }) => {
  const navigate = useNavigate();

  const { userData } = useAuth();
  const { avatar, id } = userData;

  const avatarUrl = avatar ? createFilePath(avatar) : null;

  return (
    <Flex
      className="sidebar__thumb"
      gap={10}
      align="center"
      onClick={() => navigate(`/settings/users/${id}`)}
    >
      <Avatar
        className="thub_img"
        src={avatarUrl}
        size={40}
        icon={<UserOutlined />}
      />
      <div className="thub_text">{isExpanded && userData.username}</div>
    </Flex>
  );
};
