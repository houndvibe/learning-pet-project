import { useParams } from "react-router-dom";

export const UserPage = () => {
  const { userId } = useParams();

  console.log(userId);
  return (
    <>
      <h1>UserPage</h1>
    </>
  );
};
