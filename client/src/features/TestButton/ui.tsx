import { Button } from "antd";
import { useLazyGetUsersQuery } from "~shared/api/apiSlice";

export const TestButton = () => {
  const [trigger] = useLazyGetUsersQuery({});
  const handleClick = () => {
    trigger({});
  };
  return <Button onClick={handleClick}>'testtest</Button>;
};
