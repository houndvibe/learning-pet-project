import { Button } from "antd";

import { useLazyGetUsersQuery } from "~app/store/apiSlice";

export const TestButton = () => {
  const [trigger] = useLazyGetUsersQuery({});
  const handleClick = () => {
    trigger({});
  };
  return <Button onClick={handleClick}>'testtest</Button>;
};
